import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ip } from "../Connection";
import Playvideo from "./Playvideo";
import { colors } from "./Color";

const DetailScreeninfo = (props) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ip + "/phim/findone/" + "'" + props.id + "'")
      .then((response) => response.json())
      .then((json) => setData(json))

      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.details}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalview}>
          <Playvideo />
        </View>
      </Modal>

      <ImageBackground
        source={{
          uri: Data.linkposter,
        }}
        style={styles.imagebg}
        resizeMode="cover"
        blurRadius={1}
      >
        <Image
          source={{
            uri: Data.linkposter,
          }}
          style={styles.imageposter}
        />
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 8,
              textAlign: "center",
            }}
          >
            {Data.tenphim}
          </Text>
        </View>

        <Text style={styles.textinfo}>
          Released : {Data.diemdanhgia}/10
          <FontAwesomeIcon icon={faStar} color="yellow" />
        </Text>

        <Text style={styles.textinfo}>Region: {Data.quocgia}</Text>
        <Text style={styles.textinfo}>Released : {Data.thoigianramat}</Text>

        <Button
          style={styles.playbutton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Watch Movie
          </Text>
        </Button>
      </ImageBackground>
    </View>
  );
};

export default DetailScreeninfo;

const styles = StyleSheet.create({
  details: {
    flex: 1,
    backgroundColor: colors.DARK_COLOR,
  },

  imagebg: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  imageposter: {
    marginTop: "10%",
    width: "60%",
    height: "50%",
  },

  playbutton: {
    marginTop: 30,
    backgroundColor: "red",
    width: "80%",
  },

  textinfo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },

  modalview: {
    padding: 2,
    width: "100%",
    height: "100%",
    backgroundColor: colors.DARK_COLOR,
  },
});
