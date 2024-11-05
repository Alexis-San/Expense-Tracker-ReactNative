import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { RootTabScreenProps } from "../types";
import AcccountCard from "../components/AcccountCard";
import Transactions from "../components/Transactions";
import { useContext, useMemo } from "react";
import AppContext from "../context/AppContext";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function HomeScreen({
  navigation,
  route,
}: RootTabScreenProps<"Home">) {
  const { transactions, cards } = useContext(AppContext);
  const totalInitialBalance = useMemo(() => {
    return cards.reduce((acc, curr) => acc + curr.balance, 0);
  }, [cards]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  type HomeScreenProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: 20,
          minHeight: "100%",
        }}
      >
        <AcccountCard
          intitialBalance={totalInitialBalance}
          expense={totalExpense}
          income={totalIncome}
        />
        <View className="flex-col mt-6 w-[90%] ">
          <View className="flex-row items-center justify-between my-2 ">
            <Text className="text-gray-800 text-xl font-semibold ">
              Transactions
            </Text>
            <Text className="text-gray-400 ">See All</Text>
          </View>
          <Transactions
            transactions={[...transactions].sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}