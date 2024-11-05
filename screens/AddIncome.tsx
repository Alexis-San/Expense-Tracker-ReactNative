import { View, Text } from "react-native";
import React from "react";
import AddTransactionForm from "../components/AddTransactionForm";

const AddIncome = () => {
  return (
    <View
      style={{
        alignItems: "center",
        // flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
        minHeight: "100%",
        width: "100%",
      }}
    >
      <AddTransactionForm type="Income" />
    </View>
  );
};

export default AddIncome;
