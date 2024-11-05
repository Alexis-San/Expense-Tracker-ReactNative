import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";

const StartScreen = ({ navigation }: RootStackScreenProps<"StartScreen">) => {
  return (
    <View className=" min-h-full bg-white">
      <View className=" my-auto ">
        <View className="max-w-[85%] items-center justify-between bg-income/10 mx-auto rounded-full ">
          <Image
            style={{
              width: 320,
              height: 320,
            }}
            source={require("../assets/images/wallet.png")}
          />
        </View>
        <View className="mx-auto  w-4/5 mt-5 ">
          <Text className="text-3xl font-semibold text-gray-800 text-center">
            Save your money with Money Tracker
          </Text>
          <Text className="text-gray-400 mt-3 text-base text-center font-medium">
            Effortlessly track and manage your expenses with our user-friendly
            app. Start taking control of your finances today!
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("AddCardModal", {
            cardId: "1",
          });
        }}
        className="mb-12 align-middle w-36 shadow mx-auto bg-income py-3 rounded-lg "
      >
        <Text className="text-center text-white font-semibold text-base">
          Let's Start
        </Text>
      </Pressable>
    </View>
  );
};

export default StartScreen;
