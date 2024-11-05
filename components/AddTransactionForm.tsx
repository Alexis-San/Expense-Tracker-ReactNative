import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AppContext from "../context/AppContext";
import { Transaction } from "../typings";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Health"];
// const cards = [
//   {
//     id: 1,
//     name: "Cash",
//     balance: 1200,
//   },
//   {
//     id: 2,
//     name: "Paytm",
//     balance: 1200,
//   },
// ];

const AddTransactionForm = ({ type }: { type: "Expense" | "Income" }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const { incomeCategories, expenseCategories, cards, addTransaction } =
    useContext(AppContext);
  const navigation = useNavigation();
  const [date, setDate] = React.useState<Date>(new Date());
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("0");
  const [category, setCategory] = React.useState(
    (type === "Expense" ? expenseCategories : incomeCategories)[0]
  );
  const [card, setCard] = React.useState(cards[0]);

  const dateHandler = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const submitHandler = async () => {
    const transaction = {
      id: Math.random().toString(),
      title,
      amount: parseFloat(amount),
      date: date.toDateString(),
      categoryId: category.id,
      cardId: card.id,
      type: type.toLowerCase(),
    } as Transaction;
    await addTransaction(transaction);
    navigation.goBack();
  };

  return (
    <View className="w-[87%] flex-col justify-between  ">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <CustomInput
          title={`${type} Title`}
          props={{
            placeholder: "eg. Dinner with friends",
            value: title,
            onChangeText: (text: string) => setTitle(text),
          }}
        />
        <CustomInput
          title="Amount"
          props={{
            keyboardType: "decimal-pad",
            value: amount,
            onChangeText: (text: string) => setAmount(text),
          }}
        />
        <View className="w-full space-y-2 mb-5 ">
          <Text className="text-gray-800 text-lg font-semibold ">Date</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-300  rounded-xl  "
          >
            <Text className="text-lg py-3 px-4 text-gray-600">
              {date.toDateString()}
            </Text>
          </Pressable>
        </View>
        <View className="w-full space-y-2 mb-5 ">
          <Text className="text-gray-800 text-lg font-semibold ">Category</Text>
          <View className=" flex-wrap flex-row gap-2 ">
            {(type === "Expense" ? expenseCategories : incomeCategories).map(
              (cat, i) => (
                <Pressable
                  onPress={() => setCategory(cat)}
                  key={i}
                  className={`bg-${
                    cat.id === category.id
                      ? type.toLowerCase()
                      : `${type.toLowerCase()}/10`
                  }
              } py-2 px-3 rounded-md transition-all duration-200 ease-in-out  `}
                >
                  <Text
                    className={`${
                      cat === category ? "text-white" : "text-gray-800"
                    } font-semibold`}
                  >
                    {cat.name}
                  </Text>
                </Pressable>
              )
            )}
            <Pressable
              onPress={() => {
                navigation.navigate("AddCategoryModal", {
                  type,
                });
              }}
              className={`bg-${type.toLowerCase()}/10 py-1 px-2 rounded-md transition-all duration-200 ease-in-out justify-center items-center  `}
            >
              <Entypo color={"rgb(75, 85, 99)"} size={20} name="plus" />
            </Pressable>
          </View>
        </View>
        <View className="w-full space-y-2 mb-5 ">
          <Text className="text-gray-800 text-lg font-semibold ">Card</Text>
          <View className=" flex-wrap flex-row gap-2 ">
            {cards.map((cat, i) => (
              <Pressable
                onPress={() => setCard(cat)}
                key={i}
                className={`bg-${
                  cat.id === card.id
                    ? type.toLowerCase()
                    : `${type.toLowerCase()}/10`
                }
              } py-2 px-3 rounded-md transition-all duration-200 ease-in-out  `}
              >
                <Text
                  className={`${
                    cat.id === card.id ? "text-white" : "text-gray-800"
                  } font-semibold`}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => {
                navigation.navigate("AddCardModal");
              }}
              className={`bg-${type.toLowerCase()}/10 py-1 px-2 rounded-md transition-all duration-200 ease-in-out justify-center items-center  `}
            >
              <Entypo color={"rgb(75, 85, 99)"} size={20} name="plus" />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={submitHandler}
          className={`  rounded-xl bg-${type.toLowerCase()} w-full py-3   `}
        >
          <Text className="text-xl text-white text-center ">Add {type}</Text>
        </Pressable>
      </ScrollView>

      {showDatePicker && (
        <RNDateTimePicker mode="date" value={date} onChange={dateHandler} />
      )}
    </View>
  );
};

export default AddTransactionForm;

export const CustomInput = ({
  props,
  title,
}: {
  props: any;
  title: string;
}) => {
  return (
    <View className="w-full space-y-2 mb-5 ">
      <Text className="text-gray-800 text-lg font-semibold ">{title}</Text>
      <TextInput
        {...props}
        className="border border-gray-300 text-lg py-3 px-4 text-gray-600 rounded-xl  "
      />
    </View>
  );
};
