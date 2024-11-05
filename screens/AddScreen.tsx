import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { AddTabScreenProps, RootTabScreenProps } from "../types";
import Transactions from "../components/Transactions";
import { MaterialIcons } from "@expo/vector-icons";
import AppContext from "../context/AppContext";

export default function AddScreen({ navigation }: AddTabScreenProps<"Add">) {
  const {transactions} = useContext(AppContext);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          // flex: 1,
          backgroundColor: "white",
          paddingTop: 20,
          minHeight: "100%",
        }}
      >
        <View className="items-center space-x-3 w-[90%] flex-row  ">
          <Pressable
            onPress={() => {
              navigation.navigate("AddIncome");
            }}
            className=" bg-income/10  py-4 rounded-2xl space-y-1 flex-1 items-center "
          >
            <MaterialIcons
              size={24}
              name="add-chart"
              color="rgb(126, 49, 249)"
            />
            <View className="flex-row items-center space-x-2 self-center ">
              <Text className="text-gray-800 text-lg font-medium ">
                Add Income
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("AddExpense");
            }}
            className=" bg-expense/10 py-4 rounded-2xl space-y-1 flex-1 items-center "
          >
            <MaterialIcons
              size={24}
              name="add-chart"
              color="rgb(250, 128, 95)"
            />
            <View className="flex-row items-center space-x-2 self-center ">
              <Text className="text-gray-800 text-lg font-medium ">
                Add Expense
              </Text>
            </View>
          </Pressable>
        </View>
        <View className="flex-col mt-6 w-[90%] ">
          <View className="flex-row items-center justify-between my-2 ">
            <Text className="text-gray-800 text-xl font-semibold ">
              Last Added
            </Text>
          </View>
          <Transactions transactions={transactions} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
