import React from "react";
import { StyleSheet, View, RefreshControl } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../FirebaseConfig";

import CommunityEventCard from '../components/CommunityEventCard';

const CommunityEventsFeed = () => {
  const navigation = useNavigation();
  const [eventsData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([eventsData]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Toate");

  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    {key: "1", value: "Sport"},
    {key: "2", value: "Cultural"},
    {key: "3", value: "Educatie"},
    {key: "4", value: "Social"},
    {key: "5", value: "Sanatate"},
    {key: "6", value: "Religie"},
    {key: "7", value: "Voluntariat"},
    {key: "8", value: "Toate"},
];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <CommunityEventCard
      name={item.name}
      category={item.category}
      date={item.date}
      location={item.location}
      time={item.time}
      description={item.description}
      attendees={item.attendees}
      uniqueId={item.uniqueId}
    />
  );

  useEffect(() => {
    const getEvents = async () => {
      const querySnapshot = await FIREBASE_FIRESTORE.collection("events")
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

  useEffect(() => {
    if (category === "Toate") {
      setFilteredData(eventsData);
    } else {
      const filtered = eventsData.filter(item => item.category === category);
      setFilteredData(filtered);
    }
  }
  , [category, eventsData]);

  return (
    <View style={{ height: "100%" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Evenimente comunitare</Text>

        {eventsData.length === 0 ?
        (
          <Text style={styles.title}>Nu exista evenimente inca</Text>
        ) : (
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <SelectList
                boxStyles={{ marginTop: 10, backgroundColor: "white", borderColor: "#2490ef", width: "65%", alignSelf: "center" }}
                dropdownStyles={{ backgroundColor: "white", borderColor: "#2490ef", alignSelf: "center"}}
                setSelected={setCategory}
                onValueChange={(val) => setCategory(val)}
                save="value"
                data={categories}
                placeholder={"Alege categoria dorita:"}
              />
            </View>

            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              style={{ flexGrow: 1, margin: 10, marginBottom: 80, width: "80%", alignSelf: "center" }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          </View>
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

export default CommunityEventsFeed;