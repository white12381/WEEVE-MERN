import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
} from "react-native";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;
const [errorMessage, setErrorMessage] = useState('Default Error');
  const startRotation = () => {
    const animation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        delay: 0,
      })
    );
    if (isLoading) {
      animation.start();
    } else {
      animation.stop();
    }
  };
  startRotation();
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const [text, setText] = useState("");
  const handlePress = async () => {
    setIsLoading(true);
    if (text) {
      try {
        const response = await fetch(
          `https://d918-129-205-113-183.ngrok-free.app/getBattery/${text}`
        );

        const data = await response.json();
        if (response.ok) { 
          await AsyncStorage.setItem('id', data?._id)

        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(false);
  };
  const animatedStyle = {
    transform: [{ rotate }],
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Id"
        value={text}
        onChangeText={(text) => setText(text)}
        style={styles.input}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Pressable onPress={handlePress} style={styles.button}>
        {!isLoading ? (
          <Text style={styles.text}>Register Service</Text>
        ) : (
          <Animated.View style={[animatedStyle, styles.loader]} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
color: 'red',
textAlign: 'center', fontWeight: 500, marginVertical: 6
  },
  loader: {
    width: 20,
    height: 20,
    borderRightWidth: 2,
    borderWidth: 0,
    borderTopWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  input: {
    width: 250,
    marginHorizontal: "auto",
    backgroundColor: "white",
    padding: 10,
    borderColor: "#9ae21c",
    borderWidth: 4,
    borderRadius: 10,
  },
});
