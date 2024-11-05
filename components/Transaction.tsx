import { View, Text, Image } from "react-native";
import React from "react";
import { Transaction } from "../typings";
import AppContext from "../context/AppContext";

const TransactionComponent = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { incomeCategories, expenseCategories } = React.useContext(AppContext);
  const imageSource =
    transaction.type === "expense"
      ? expenseCategories.find((item) => item.id === transaction.categoryId)
      : incomeCategories.find((item) => item.id === transaction.categoryId);

  return (
    <View key={transaction.id} className="flex-row items-center my-3  ">
      {/* Image */}
      <View className="items-center justify-center bg-gray-200/30 p-2 rounded-xl ">
        {imageSource && (
          <Image
            style={{
              width: 35,
              height: 35,
              resizeMode: "cover",
              borderRadius: 4,
            }}
            source={imageSource.image ?? { uri: imageSource.src }}
          />
        )}
      </View>
      {/* Title and time */}
      <View className="flex-1 items-start space-y-0.5 px-3 ">
        <Text className="font-semibold text-gray-800">{transaction.title}</Text>
        <Text className="text-sm text-gray-500 ">{transaction.date}</Text>
      </View>
      {/* Amount */}
      <Text
        className={`${
          transaction.type === "expense" ? "text-red-500" : "text-green-500"
        } font-medium `}
      >
        {transaction.type === "expense" ? "-" : "+"}
        ₲
        {transaction.amount}
      </Text>
    </View>
  );
};

export default TransactionComponent;
