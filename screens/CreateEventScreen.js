import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";

import { useNavigation } from '@react-navigation/core';
import { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../FirebaseConfig";

import CommunityEventCard from '../components/CommunityEventCard';
import { KeyboardAvoidingView } from 'react-native';

export default function CreateEventScreen() {
    const navigation = useNavigation();

    const [userData, setUserData] = useState('');

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const categories = [
        {key: "1", value: "Sport"},
        {key: "2", value: "Cultural"},
        {key: "3", value: "Educatie"},
        {key: "4", value: "Social"},
        {key: "5", value: "Sanatate"},
        {key: "6", value: "Religie"},
        {key: "7", value: "Voluntariat"},
    ];

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
        });
    }, []);

    const handleCreateEvent = async () => {
        const eventDoc = await FIREBASE_FIRESTORE.collection("events")
        .add({
            name: name,
            category: category,
            date: date,
            location: location,
            time: time,
            description: description,
            organizer: FIREBASE_AUTH.currentUser.uid,
            attendees: [],
        })
        .catch(error => {
            alert(error.message);
        });

        eventDoc.update({uniqueId: eventDoc.id});
        navigation.pop(1);
    }
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <View>
                <Text style={styles.title}>Introduceti datele evenimentului</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder="Numele evenimentului"
                />
                <View style={styles.selectListContainer}>
                    <SelectList
                        boxStyles={{ backgroundColor: "white" }}
                        dropdownStyles={{ backgroundColor: "white", borderColor: "#2490ef" }}
                        setSelected={setCategory}
                        save="value"
                        data={categories}
                        placeholder={"Alege categoria"}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setDate(text)}
                    value={date}
                    placeholder="Data evenimentului"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setLocation(text)}
                    value={location}
                    placeholder="Locatia evenimentului"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setTime(text)}
                    value={time}
                    placeholder="Ora evenimentului"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    multiline={true}
                    placeholder="Descrierea evenimentului"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                    <Text style={styles.buttonText}>Adauga eveniment</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 30,
        marginBottom: 15,
        color: "#333",
        textShadowColor: "#ccc",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    selectListContainer: {
        marginTop: 5,
        marginBottom: 15,
    },
    dropDownContainer: {
        width: "80%",
        paddingVertical: 15,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
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
          marginBottom: 10,
      },
      buttonText:{
          color: "white",
          fontWeight: "700",
          fontSize: 20,
          textShadowColor: 'rgba(0, 0, 0, 0.45)',
          textShadowOffset: {width: 1, height: 1},
          textShadowRadius: 5,
      },
  });