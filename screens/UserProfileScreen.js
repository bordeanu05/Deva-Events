import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from '@react-navigation/core';
import { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../FirebaseConfig";

import { AuthContext } from '../screens/ProfileScreen';
import CommunityAuxEventCard from '../components/CommunityAuxEventCard';

export default function UserProfileScreen(){
  const navigation = useNavigation();

  const { handleLogout } = useContext(AuthContext);

  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [userData, setUserData] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Set the user data
  useEffect(() => {
    const userDoc = FIREBASE_FIRESTORE
      .collection("users")
      .doc(FIREBASE_AUTH.currentUser.uid)
      .get();
    userDoc.then((doc) => {
      if (doc.exists) {
        setUserData(doc.data());
      }
    }
  )}, []);

  useEffect(() => {
    const getFavoriteEvents = async () => {
      try {
        // Assuming 'loggedInUser.uid' contains the current user's UID
        const userDoc = await FIREBASE_FIRESTORE.collection("users").doc(FIREBASE_AUTH.currentUser.uid).get();
        const userFavoriteEventIds = userDoc.data().favoriteEvents; // Replace 'favoriteEvents' with the correct field name
  
        if (userFavoriteEventIds && userFavoriteEventIds.length > 0) {
          // Fetch events whose IDs are in the user's favorite events
          const eventsPromises = userFavoriteEventIds.map(eventId =>
            FIREBASE_FIRESTORE.collection("events").doc(eventId).get()
          );
  
          const eventsDocs = await Promise.all(eventsPromises);
          const favoriteEvents = eventsDocs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setFavoriteEvents(favoriteEvents);
        } else {
          // Handle the case where there are no favorite events
          setFavoriteEvents([]);
        }
      } catch (error) {
        console.error("Error fetching favorite events: ", error);
        // Handle the error appropriately
      }
    };
  
    getFavoriteEvents();
  }, [refreshing]); // Add loggedInUser to the dependency array
  

  const renderItem = ({item}) => (
    <CommunityAuxEventCard
      name={item.name}
      category={item.category}
      date={item.date}
      location={item.location}
      time={item.time}
      description={item.description}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Salut, <Text style={styles.nameText}>{userData.firstname} {userData.lastname}</Text></Text>
        <TouchableOpacity
          onPress={() => handleLogout()}
        >
          <Ionicons name="exit-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Evenimentele la care participi</Text>
      </View>

      {favoriteEvents.length === 0 ? (
        <Text style={styles.smallTitle}>Nu participi la niciun eveniment</Text>
      ) : (
        <FlatList
          data={favoriteEvents}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={{ flexGrow: 1, margin: 10, marginBottom: 170, width: "80%", alignSelf: "center" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: "#228B22",
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#EDC71C",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 90,
  },
  button:{
      backgroundColor: "#228B22",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
  },
  buttonText:{
      color: "white",
      fontWeight: "700",
      fontSize: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.45)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
    color: "#333",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  smallTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
    color: "#333",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
