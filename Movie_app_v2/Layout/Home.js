import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton, Colors, Button, Title } from "react-native-paper";
import Search from "./Search";

import Color, { colors } from "./Color";
import { ip } from "../Connection";
import Details from "./Details";

var arrayData = [];

const Item = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate("Details", { itemId: item })}
  >
    <View style={{ marginBottom: 5 }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: item.linkposter,
        }}
      />
    </View>
    <View style={{ backgroundColor: colors.DARK_COLOR, marginBottom: 10 }}>
      <Text style={styles.title}>{item.tenphim}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(ip + "/phim/findall")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        // arrayData = json;
      })

      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  arrayData = Data;
  // console.log("Day la array data");
  // console.log(arrayData);
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <Item style={styles.item} item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={(item) => item.maphim}
          style={{ padding: 15 }}
        />
      </View>
    </SafeAreaView>
  );
};

function SearchScreen({ route, navigation }) {
  const { array } = route.params;
  return <Search data={array} />;
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return <Details id={itemId.maphim} />;
}

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={27}
              color="white"
              onPress={() =>
                navigation.navigate("Search", { array: arrayData })
              }
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="format-list-bulleted"
              size={27}
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#444444" },
          headerTintColor: "white",
        })}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: { backgroundColor: "#444444" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: { backgroundColor: "#444444" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK_COLOR,
  },
  item: {
    width: "30%",
    marginRight: 18.5,
    marginBottom: 18,
    backgroundColor: colors.DARK_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },

  tinyLogo: {
    height: 150,
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 17,
  },
});
