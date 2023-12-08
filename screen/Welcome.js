import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          width: "90%",
          fontFamily: "inter",
          fontSize: 35,
          fontWeight: 700,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        Welcome to Cafe world
      </Text>
      <Image
        source={require("./image/shop1.PNG")}
        style={{ width: "70%", height: 80, borderRadius: 10, marginTop: 50 }}
      ></Image>
      <Image
        source={require("./image/shop2.PNG")}
        style={{ width: "70%", height: 80, borderRadius: 10, marginTop: 35 }}
      ></Image>
      <Image
        source={require("./image/shop3.PNG")}
        style={{ width: "70%", height: 80, borderRadius: 10, marginTop: 35 }}
      ></Image>
      <Pressable
        style={{
          width: "90%",
          height: 60,
          backgroundColor: "#00BDD6",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
        onPress={() => navigation.navigate("Shops Near Me")}
      >
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 24,
            fontWeight: 400,
            textAlign: "center",
            color: "white",
          }}
        >
          GET STARTED
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
  },
});
