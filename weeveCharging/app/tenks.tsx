import React from "react";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";

const Tenks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>Tenks for Trusting your device with us.</Text>
      <Pressable onPress={() => BackHandler.exitApp()} style={styles.button}>
        <Text style={styles.text}>Close</Text>
      </Pressable>
    </View>
  );
};
export default Tenks;
const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: "#FF0000",
    padding: 12,
    borderRadius: 10, width: 100, 
  },
  text: {
    color: "white", textAlign: 'center',
    fontWeight: "bold",
  },
  status: {
    marginTop: 6,
    fontWeight: "500",
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
