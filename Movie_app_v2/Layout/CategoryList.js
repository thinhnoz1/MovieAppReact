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
import { IconButton, Colors, Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ip } from "../Connection";
import { colors } from "./Color";

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

const CategoryListScreen = (props) => {
  console.log(props);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(ip + "/phim/findbycategory/" + "'" + props.id + "'")
      .then((response) => response.json())
      .then((json) => setData(json))

      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const navigation = useNavigation();
  const renderItem = ({ item }) => <Item item={item} navigation={navigation} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{Data.tentheloai}</Text>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.maphim}
      />
    </SafeAreaView>
  );
};

export default CategoryListScreen;

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
});
