import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton, Colors, Button, Title } from "react-native-paper";
import Search from "./Search";
import { colors } from "./Color";
import { ip } from "../Connection";
import CategoryList from "./CategoryList";
import Details from "./Details";

const Item = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate("CategoryList", { itemId: item })}
  >
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.title}>{item.tentheloai}</Text>
    </View>
  </TouchableOpacity>
);

const CatergoriesScreen = () => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(ip + "/theloai/findall")
      .then((response) => response.json())
      .then((json) => setData(json))

      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
          numColumns={2}
          keyExtractor={(item) => item.matheloai}
          style={{ padding: 15 }}
        />
      </View>
    </SafeAreaView>
  );
};

function SearchScreen({ navigation }) {
  return <Search />;
}

function CategoryListScreen({ route, navigation }) {
  const { itemId } = route.params;
  return <CategoryList id={itemId.matheloai} />;
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return <Details id={itemId.maphim} />;
}

const Stack = createStackNavigator();

export default function Catergories() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catergories"
        component={CatergoriesScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="magnify"
              size={27}
              color="white"
              onPress={() => navigation.navigate("Search")}
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
        name="CategoryList"
        component={CategoryListScreen}
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
    width: "47%",
    marginRight: 18.5,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: "grey",
  },

  tinyLogo: {
    height: 150,
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});
