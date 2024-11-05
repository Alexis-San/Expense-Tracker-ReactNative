import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CustomInput } from "../components/AddTransactionForm";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/AppContext";
import { Card } from "../typings";

export default function AddCardModal({ route }: any) {
  const navigation = useNavigation();
  const cardId = route?.params?.cardId;
  const { addCard, cards } = React.useContext(AppContext);
  const oldCard = cards.find((card) => card.id === cardId);

  const [title, setTitle] = React.useState(oldCard?.name || "");
  const [balance, setBalance] = React.useState(
    oldCard?.balance?.toString() || ""
  );
  const submitHandler = async () => {
    const newCard = {
      id: oldCard?.id || (cards.length + 1).toString(),
      name: title,
      balance: parseFloat(balance),
    } as Card;
    await addCard(newCard);
    navigation.navigate("Root");
  };
  return (
    <View
      style={{
        alignItems: "center",
        // flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        flex: 1,
        
      }}
    >
      <View className="w-[87%] flex-1 flex-col justify-between  ">
        <View
          style={{
            paddingBottom: 20,
            flex: 1,
          }}
          // showsVerticalScrollIndicator={false}
        >
          <CustomInput
            title={"Card Name"}
            props={{
              // placeholder: "eg. Dinner with friends",
              value: title,
              onChangeText: (text: string) => setTitle(text),
            }}
          />
          <CustomInput
            title="Initial Balance"
            props={{
              keyboardType: "decimal-pad",
              value: balance,
              onChangeText: (text: string) => setBalance(text),
            }}
          />
        </View>
        <Pressable
          onPress={submitHandler}
          className={`  rounded-xl bg-income w-full py-3   `}
        >
          <Text className="text-xl text-white text-center ">Add Card</Text>
        </Pressable>
      </View>
    </View>
  );
}
