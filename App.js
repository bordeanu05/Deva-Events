import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import OfficialEventsFeed from "./screens/OfficialEventsFeed";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotScreen from "./screens/ForgotScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CommunityEventsFeed from "./screens/CommunityEventsFeed";
import CreateEventScreen from "./screens/CreateEventScreen";
import EventCardDetailsScreen from "./screens/EventCardDetailsScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tab" options={{headerShown: false}} component={Tabs} />
        <Stack.Screen name="CreateEventScreen" options={{headerShown: false}} component={CreateEventScreen} />
        <Stack.Screen name="EventCardDetailsScreen" options={{headerShown: false}} component={EventCardDetailsScreen} />
        <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
        <Stack.Screen name="Forgot" options={{headerShown: false}} component={ForgotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          ...styles.tabBarStyle,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let iconColor = focused ? "#EDC71C" : "white";

          if (route.name === "CommunityFeed") {
            iconName = focused ? "eye" : "eye-outline";
          } else if (route.name === "OfficialFeed") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "AddBookTab") {
            iconName = "add-circle";
          }

          // Wrap the Ionicons in a View and apply styles for centering
          return (
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} color={iconColor} size={size} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="CommunityFeed" component={CommunityEventsFeed} />
      <Tab.Screen name="OfficialFeed" component={OfficialEventsFeed} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "#228B22",
    height: "8%",
    left: 22,
    right: 22,
    bottom: 15,
    borderRadius: 20,
    paddingTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginBottom: 15,
  },
});
