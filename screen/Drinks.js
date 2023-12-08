import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addDrink, removeDrink, update } from "../redux/storesSlice";
import { v4 } from "uuid";
export default function Welcome({ navigation }) {
  var route = useRoute();
  // var [data, setData] = useState(route.params.shop);
  const data = useSelector((state) => state.stores.shop);
  const dispatch = useDispatch();

  const addDrinkToOrders = (drink) => {
    const newOrder = {
      id: v4(),
      name: drink.name,
      price: drink.price,
      image: drink.image,
      sl: 1,
    };
    dispatch(addDrink(newOrder));
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={{ width: "90%", height: "80%" }}>
        <FlatList
          data={data.drinks}
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                height: 60,
                backgroundColor: "white",
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 60, height: "100%", alignSelf: "center" }}
              ></Image>
              <View style={{ height: "100%", width: "40%", marginLeft: 15 }}>
                <Text style={{ width: "100%" }}>{item.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 22,
                  }}
                >
                  <Image
                    source={require("./image/IconMoney.PNG")}
                    style={{ width: 15, height: 15, alignSelf: "center" }}
                  ></Image>
                  <Text>${item.price}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => dispatch(removeDrink(item))}>
                  <Image
                    source={require("./image/IconTru.PNG")}
                    style={{ height: 25, width: 25 }}
                  ></Image>
                </Pressable>

                <Pressable onPress={() => addDrinkToOrders(item)}>
                  <Image
                    source={require("./image/IconCong.PNG")}
                    style={{ height: 25, width: 25, marginLeft: 40 }}
                  ></Image>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>

      <Pressable
        style={{
          width: "90%",
          height: 44,
          borderRadius: 8,
          backgroundColor: "#EFB034",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Your orders", { shop: data })}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "inter",
            fontSize: 16,
            fontWeight: 400,
            color: "white",
          }}
        >
          GO TO CART
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    flexDirection: "column",
  },
});
