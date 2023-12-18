import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE, firebase } from "../FirebaseConfig";

const CommunityAuxEventCard = ({name, category, date, location, time, description, attendees, uniqueId, fullname, userId}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}
      onLongPress={() => { Alert.alert("Anuleaza participarea", "Vrei sa anulezi participarea?", [
        {
          text: 'Nu',
        },
        {
          text: 'Da', 
          onPress: async () => {
            // delete from user's favorite events
            const userRef = FIREBASE_FIRESTORE.collection("users").doc(userId);
            await userRef.update({
              favoriteEvents: firebase.firestore.FieldValue.arrayRemove(uniqueId),
            });
            // delete from event's attendees
            const userFullName = fullname;
            const eventRef = FIREBASE_FIRESTORE.collection("events").doc(uniqueId);
            await eventRef.update({
              attendees: firebase.firestore.FieldValue.arrayRemove(userFullName),
            });

            alert("Ai anulat participarea!");
          }
        },
      ], {cancelable: false}) }}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.category}> - </Text>
          <Text style={styles.category}>{date}</Text>
        </View>

        <View style={styles.programLocationContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={19}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.program}>{time}</Text>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={19}
            color="black"
            style={styles.icon}
          />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.location}>
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 19,
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: "#rgb(34,139,34)",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  category: {
    color: "#8F8F8F",
    fontSize: 17,
    marginBottom: 5,
    marginLeft:3,
  },
  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  programLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  program: {
    color: "black",
    fontSize: 17,
    marginLeft: 5,
    marginRight: 20,
  },
  location: {
    color: "black",
    fontSize: 17,
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 19,
    paddingVertical: 10,
    marginTop: 14,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#rgb(34,139,34)",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CommunityAuxEventCard;