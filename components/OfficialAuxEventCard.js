import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OfficialAuxEventCard = ({date, description, attendees, uniqueId}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{description}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.category}>{date}</Text>
        </View>
      </View>
    </View>
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

export default OfficialAuxEventCard;