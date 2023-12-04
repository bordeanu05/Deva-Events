import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";

const OfficialEventCard = ({date, description, image_link}) => {
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
});

export default OfficialEventCard;