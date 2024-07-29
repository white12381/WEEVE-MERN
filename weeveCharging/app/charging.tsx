import { usePowerState } from "expo-battery";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Charging = () => {
  const { lowPowerMode, batteryLevel, batteryState } = usePowerState();
  console.log(batteryLevel);
  return (
    <View style={styles.container}>
      <Text style={styles.id}>2093209239</Text>
      <Text style={styles.percentage}>{(batteryLevel * 100).toFixed(0)}%</Text>
      <Text style={styles.status}>
        Status:{" "}
        {(batteryState === 2 && "Charging") ||
          (batteryState === 3 && "Battery Full") ||
          (batteryState === 0 && "Unknown") ||
          (batteryState === 1 && "Not Charging")}
      </Text>
      <Pressable onPress={() => router.push("/tenks")} style={styles.button}>
        <Text style={styles.text}>Withdraw Service</Text>
      </Pressable>
    </View>
  );
};
export default Charging;
const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: "#FF0000",
    padding: 12,
    borderRadius: 10,
  },
  text: {
    color: "white",
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
  },
  percentage: {
    color: "white",
    backgroundColor: "#1d74bb",
    padding: 10,
    marginTop: 14,
    borderRadius: 100,
    fontSize: 24,
  },
  id: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f49424",
  },
});
