import { View, Text, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "../typings";
import AppContext from "../context/AppContext";
import TransactionComponent from "./Transaction";

export const transactions = [
  {
    id: "1",
    title: "Transfer to John Doe",
    amount: 1000.0,
    date: new Date().toDateString(),
    categoryId: "1",
    type: "expense",
    cardId: "1",
  },
  {
    id: "2",
    title: "Bata store",
    amount: 1000.0,
    date: new Date().toDateString(),
    categoryId: "1",
    type: "income",
    cardId: "1",
  },
  {
    id: "3",
    title: "Uber",
    amount: 150,
    date: new Date().toDateString(),
    categoryId: "2",
    type: "expense",
    cardId: "1",
  },
  {
    id: "4",
    title: "Uber",
    amount: 150,
    date: new Date().toDateString(),
    categoryId: "3",
    type: "expense",
    cardId: "1",
  },
] as Transaction[];

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <>
      {transactions
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .map((item, i) => (
          <TransactionComponent key={item.id} transaction={item} />
        ))}
    </>
  );
};

export default Transactions;
