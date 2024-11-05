import { SafeAreaView, ScrollView, View, Text } from "react-native";
import React, { useContext } from "react";
import AcccountCard from "../components/AcccountCard";
import AppContext from "../context/AppContext";

const MyCardsScreen = () => {
  const { cards, transactions } = useContext(AppContext);
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
        {cards.map((card) => {
          return (
            <AcccountCard
              intitialBalance={card.balance}
              name={card.name}
              key={card.id}
              expense={transactions
                .filter((transaction) => {
                  return (
                    transaction.type === "expense" &&
                    transaction.cardId === card.id
                  );
                })
                .reduce((acc, curr) => acc + curr.amount, 0)}
              income={transactions
                .filter((transaction) => {
                  return (
                    transaction.type === "income" &&
                    transaction.cardId === card.id
                  );
                })
                .reduce((acc, curr) => acc + curr.amount, 0)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCardsScreen;
