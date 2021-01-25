import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

export default function Playvideo(props) {
  return (
    <View style={styles.Container}>
      <WebView
        style={styles.WebViewStyle}
        source={{ uri: "https://www.youtube.com/embed/KQkdKxw6WTY" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  WebViewStyle: {
    margin: 0,
  },
});
