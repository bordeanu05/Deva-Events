import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../FirebaseConfig";

import OfficialEventCard from '../components/OfficialEventCard';

// const url = "http://192.168.1.129:8000/events";

const OfficialEventsFeed = () => {
  const navigation = useNavigation();
  const [eventsData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      const querySnapshot = await FIREBASE_FIRESTORE.collection("official_events")
        .get();
      
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      setData(events);
      setLoading(false);
    }
    getEvents();
  }, [refreshing]);

  const renderItem = ({ item }) => (
    <OfficialEventCard
        date={item.date}
        description={item.description}
        image_link={item.image_link}
        attendees={item.attendees}
        uniqueId={item.uniqueId}
    />
  );

  return (
    <View style={{ height: "100%" }}>
      <SafeAreaView style={{ flex: 1 }}>

        <Text style={styles.title}>Evenimente oficiale</Text>
        {eventsData.length === 0 && (
          <Text style={{ textAlign: "center" }}>Nu exista niciun eveniment oficial</Text>
        )}
        {eventsData.length > 0 && (
          <FlatList
            data={eventsData}
            renderItem={renderItem}
            style={{ flexGrow: 1, margin: 10, marginBottom: 80, width: "80%", alignSelf: "center" }}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  scrollViewContent: {
    minHeight: "100%",
    padding: 10,
    marginBottom: 100,
  },
});

export default OfficialEventsFeed;