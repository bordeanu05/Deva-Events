import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE, firebase } from "../FirebaseConfig";

export default function OfficialEventCardDetailsScreen(){
  const navigation = useNavigation();
  const route = useRoute();

  const [loggedInUser, setLoggedInUser] = useState('');
  const [organizer, setOrganizer] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [uid, setUid] = useState('');

  const checkIfLoggedIn = async () => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
        if (user) {
            const userDoc = FIREBASE_FIRESTORE
                .collection("users")
                .doc(user.uid)
                .get();
            userDoc.then((doc) => {
                if (doc.exists) {
                    setOrganizer(doc.data().organizer);
                    setFirstname(doc.data().firstname);
                    setLastname(doc.data().lastname);
                    setUid(doc.data().userId);
                }
            });
            setLoggedInUser(true);
        } else {
            setLoggedInUser(false);
        }
    });
}

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const handleInterested = async () => {
    if (!loggedInUser) {
        alert("Trebuie sa te loghezi ca sa poti participa!");
        return;
    }

    if (loggedInUser.organizer === true) {
        alert("Nu poti participa la un eveniment ca organizator!");
        return;
    }

    try {
        const userRef = FIREBASE_FIRESTORE.collection("users").doc(uid);
        await userRef.update({
            favoriteOfficialEvents: firebase.firestore.FieldValue.arrayUnion(route.params.uniqueId),
        });
        const eventRef = FIREBASE_FIRESTORE.collection("official_events").doc(route.params.uniqueId);
        const fullName = `${lastname} ${firstname}`;
        await eventRef.update({
            attendees: firebase.firestore.FieldValue.arrayUnion(fullName),
        });

        alert("Te-ai inscris cu succes!");
    } catch (error) {
        alert(error.message);
        console.log("mata");
    }
};



  const renderItem = ({item}) => (
    <Text style={styles.attendeeName}>{item}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
                <View>
                    <View style={styles.header} className>
                        <Text style={styles.title}>Eveniment oficial</Text>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.category}>{route.params.date}</Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.description}>{route.params.description}</Text>
                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>{route.params.location}</Text>
                        </View>
                    </View>

                    <View style={styles.attendeesContainer}>
                        <Text style={styles.attendeesTitle}>Participanti</Text>
                        {route.params.attendees.length === 0 ? (
                            <Text style={styles.attendeeName}>Nu exista participanti</Text>
                        ) : (
                            <FlatList
                                data={route.params.attendees}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                style={{flexGrow: 1, width: "90%", alignSelf: "center" }}
                            />
                        )}
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.aboutButton]} onPress={()=>{handleInterested()}}>
                        <Text style={styles.buttonText}>Particip</Text>
                    </TouchableOpacity>
                </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header: {
        padding: 20,
        backgroundColor: "#228B22",
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#EDC71C',
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
    },
    category: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
    },
    divider: {
        color: '#EDC71C',
        fontSize: 16,
        marginHorizontal: 5,
    },
    content: {
        padding: 20,
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
        lineHeight: 28,
        color: '#4A4A4A',
    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 30,
        width: "100%",
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    aboutButton: {
        backgroundColor: "#228B22",
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    attendeesContainer: {
        padding: 20,
        backgroundColor: "#228B22",
    },
    attendeesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#EDC71C',
        marginBottom: 10,
    },
    attendeeName: {
        fontSize: 18,
        lineHeight: 28,
        color: '#fff',
    },
});