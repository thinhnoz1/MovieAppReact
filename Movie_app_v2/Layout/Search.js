import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { IconButton, Colors, Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { colors } from "./Color";
import { SearchBar } from "react-native-elements";

var arrayData = [];
var filterList = [];
const Item = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Details", { itemId: item })}
  >
    <View style={styles.item}>
      {/* cộ t thứ 2 */}
      <View style={{ flex: 1, flexDirection: "row", paddingBottom: 5 }}>
        <View style={{ flex: 0.3, backgroundColor: "white", marginRight: 20 }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.linkposter,
            }}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            backgroundColor: colors.DARK_COLOR,
            padding: 2,
            paddingLeft: 5,
          }}
        >
          <View style={{ flex: 0.1, backgroundColor: colors.DARK_COLOR }}>
            <Text style={styles.title}>{item.tenphim}</Text>
          </View>
          <View
            style={{
              flex: 0.1,
              backgroundColor: colors.DARK_COLOR,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 17, color: "yellow" }}>
              Vote: {item.diemdanhgia}/10{" "}
            </Text>
            <FontAwesomeIcon icon={faStar} color="yellow" />
          </View>
          <View style={{ flex: 0.8, backgroundColor: colors.DARK_COLOR }}>
            <Text style={styles.subTitle}>{item.motaphim}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const SearchScreen = (props) => {
  const [search, setSearch] = useState("");
  arrayData = props.data;
  // console.log(filterList);

  if (filterList.length == 0) {
    filterList = props.data;
    // console.log("/// NULL CASE ///");
    // console.log(filterList);
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = filterList.filter(function (item) {
        const itemData = item.tenphim
          ? item.tenphim.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      filterList = newData;
      // console.log(filterList);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      filterList = arrayData;
      setSearch(text);
    }
  };

  const navigation = useNavigation();
  const renderItem = ({ item }) => <Item item={item} navigation={navigation} />;

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        round
        darkTheme
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        placeholder="Type Here..."
        value={search}
      />
      <FlatList
        data={filterList}
        renderItem={renderItem}
        keyExtractor={(item) => item.maphim}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.DARK_COLOR,
  },
  item: {
    flex: 1,
    backgroundColor: colors.DARK_COLOR,
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  title: {
    color: "orange",
    fontSize: 21,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "#fff",
  },
  tinyLogo: {
    height: 150,
    width: 110,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
});
