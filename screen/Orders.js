import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addDrink, removeDrink, shopInit, update } from "../redux/storesSlice";
export default function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();
  // var [data, setData] = useState(route.params.shop);
  const data = useSelector((state) => state.stores.shop);
  const calculateTotal = () => {
    let total = 0;
    data.orders.forEach((item) => {
      total += item.price * item.sl;
    });
    return total;
  };

  // const update = () => {
  //   dispatch(update(data));
  // };
  const payNow = () => {
    const newShop = { ...data, orders: [] };
    dispatch(update(newShop));
    dispatch(shopInit(newShop));
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "90%",
          height: 100,
          borderRadius: 8,
          backgroundColor: "#00BDD6",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ marginTop: 30, marginLeft: 20 }}>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 16,
              fontWeight: 400,
              color: "white",
            }}
          >
            CAFE DELIVERY
          </Text>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 16,
              fontWeight: 400,
              color: "white",
              marginTop: 10,
            }}
          >
            Order #18
          </Text>
        </View>
        <View style={{ marginLeft: 140, justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 20,
              fontWeight: 400,
              color: "white",
              marginTop: 10,
            }}
          >
            $5
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          height: 100,
          borderRadius: 8,
          backgroundColor: "#8353E2",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginTop: 10,
        }}
      >
        <View style={{ marginTop: 30, marginLeft: 20 }}>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 16,
              fontWeight: 400,
              color: "white",
            }}
          >
            CAFE
          </Text>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 16,
              fontWeight: 400,
              color: "white",
              marginTop: 10,
            }}
          >
            Order #18
          </Text>
        </View>
        <View style={{ marginLeft: 140, justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 20,
              fontWeight: 400,
              color: "white",
              marginTop: 10,
            }}
          >
            ${calculateTotal()}
          </Text>
        </View>
      </View>
      <View style={{ width: "90%", height: "40%", marginTop: 20 }}>
        <FlatList
          data={data.orders}
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
                <Text style={{ color: "red" }}>{item.sl}</Text>
                <Pressable onPress={() => dispatch(addDrink(item))}>
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
          marginTop: 30,
        }}
        onPress={() => {
          dispatch(update(data));
        }}
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
          Update
        </Text>
      </Pressable>
      <Pressable
        style={{
          width: "90%",
          height: 44,
          borderRadius: 8,
          backgroundColor: "#EFB034",
          justifyContent: "center",
          marginTop: 30,
        }}
        onPress={payNow}
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
          Paynow
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
