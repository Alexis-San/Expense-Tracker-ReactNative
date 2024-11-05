import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppContext from "../context/AppContext";

const AcccountCard = ({
  name,
  expense,
  income,
  intitialBalance,
}: {
  expense: number;
  income: number;
  name?: string;
  intitialBalance: number;
}) => {
  // const { cards } = useContext(AppContext);
  // const intitialBalance = id
  //   ? cards.find((card) => card.id === id)?.balance || 0
  //   : 0;

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#4e7ee7", "#b767c4", "#fa805f"]}
      className="flex flex-col py-6 px-7 mb-5 text-white  space-y-5 rounded-3xl w-[90%] h-[210px] justify-between shadow-md "
    >
      <View className="flex flex-row items-start text-white justify-between  ">
        <View className="flex flex-col items-start space-y-2 ">
          <View className="flex-row items-center space-x-1 ">
            <Text className="text-gray-100 font-medium flex-row ">
              {name ? name + " " : ""}Total Balance
            </Text>
            <Entypo name="chevron-small-down" size={20} color="white" />
          </View>
          <Text className="text-white text-2xl font-bold">
            {intitialBalance + income - expense}
          </Text>
        </View>
        <Entypo name="dots-three-horizontal" size={20} color="white" />
      </View>
      <View className="flex-row items-center justify-between ">
        <View className="items-start space-y-1">
          <View className="flex-row space-x-1 items-center ">
            <View className="p-1.5 bg-gray-50/20 rounded-full ">
              <AntDesign size={15} name="arrowdown" color="white" />
            </View>
            <Text className="text-white text-lg ">Income</Text>
          </View>
          <Text className="text-gray-50 text-lg">{income}</Text>
        </View>
        <View className="items-end space-y-1">
          <View className="flex-row space-x-1 items-center ">
            <View className="p-1.5 bg-gray-50/20 rounded-full ">
              <AntDesign size={15} name="arrowup" color="white" />
            </View>
            <Text className="text-white text-lg ">Expenses</Text>
          </View>
          <Text className="text-gray-50 text-lg ">{expense}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AcccountCard;
