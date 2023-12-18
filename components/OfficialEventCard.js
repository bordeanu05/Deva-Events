import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OfficialEventCardDetailsScreen from "../screens/OfficialEventCardDetailsScreen";


const OfficialEventCard = ({date, description, image_link, attendees, uniqueId}) => {
  const navigation = useNavigation();

  const handleAboutEvent = () => {
    navigation.navigate("OfficialEventCardDetailsScreen", {
      date: date,
      description: description,
      attendees: attendees,
      uniqueId: uniqueId,
    });
  }

  return (
    <View style={styles.container}>

      <View style={styles.infoContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View>
            <Image source={{uri: image_link}} style={styles.image} />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAboutEvent()}
              >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.buttonText}>Despre</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 19,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "#rgb(34,139,34)",
    borderRadius: 20,
    padding: 10,
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  date: {
    color: "#228B22",
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 20,
  },
  description: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
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

export default OfficialEventCard;