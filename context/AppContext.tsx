import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Category, Transaction } from "../typings";

const expenseCat = [
  {
    id: "1",
    name: "Food",
    image: require("../assets/images/categories/food.png"),
  },
  {
    id: "2",
    name: "Transportation",
    image: require("../assets/images/categories/transportation.jpg"),
  },
  {
    id: "3",
    name: "Shopping",
    image: require("../assets/images/categories/shopping.png"),
  },
  {
    id: "4",
    name: "Groceries",
    image: require("../assets/images/categories/groceries.png"),
  },
  {
    id: "5",
    name: "Rent",
    image: require("../assets/images/categories/rent.png"),
  },
  {
    id: "6",
    name: "Entertainment",
    image: require("../assets/images/categories/entertainment.png"),
  },
  {
    id: "7",
    name: "Clothing",
    image: require("../assets/images/categories/clothing.png"),
  },
] as Category[];

const incomeCat = [
  {
    id: "1",
    name: "Salary",
    image: require("../assets/images/categories/salary.png"),
  },
  {
    id: "2",
    name: "Investment",
    image: require("../assets/images/categories/investment.png"),
  },
  {
    id: "3",
    name: "Rent Income",
    image: require("../assets/images/categories/rent.png"),
  },
] as Category[];

const cashCard = {
  id: "1",
  name: "Cash",
  balance: 0,
} as Card;

const AppContext = createContext({
  incomeCategories: incomeCat,
  expenseCategories: expenseCat,
  cards: [] as Card[],
  transactions: [] as Transaction[],
  balance: 0,
  setIncomeCategories: (incomeCategories: Category[]) => {},
  setExpenseCategories: (expenseCategories: Category[]) => {},
  setCards: (cards: Card[]) => {},
  setTransactions: (transactions: Transaction[]) => {},
  setBalance: (balance: number) => {},
  addTransaction: (transaction: Transaction) => {},
  addCard: (card: Card) => {},
  addCategory: async (category: Category, type: "Income" | "Expense") => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([cashCard]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [incomeCategories, setIncomeCategories] =
    useState<Category[]>(incomeCat);
  const [expenseCategories, setExpenseCategories] =
    useState<Category[]>(expenseCat);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    // AsyncStorage.clear();
    AsyncStorage.getItem("cards").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("cards", JSON.stringify([cashCard]));
        AsyncStorage.setItem("transactions", JSON.stringify([]));
        AsyncStorage.setItem("incomeCategories", JSON.stringify(incomeCat));
        AsyncStorage.setItem("expenseCategories", JSON.stringify(expenseCat));
      } else {
        AsyncStorage.getItem("transactions").then((value) => {
          if (value !== null) {
            setTransactions(JSON.parse(value));
          }
        });
        AsyncStorage.getItem("incomeCategories").then((value) => {
          if (value !== null) {
            setIncomeCategories(JSON.parse(value));
          }
        });
        AsyncStorage.getItem("expenseCategories").then((value) => {
          if (value !== null) {
            setExpenseCategories(JSON.parse(value));
          }
        });
        AsyncStorage.getItem("cards").then((value) => {
          if (value !== null) {
            setCards(JSON.parse(value));
          }
        });
      }
      setIsLoading(false);
    });
  }, []);

  const addTransaction = async (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    await AsyncStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, transaction])
    );
  };

  const addCard = async (card: Card) => {
    const cardExistIndex = cards.findIndex((c) => c.id === card.id);
    if (cardExistIndex !== -1) {
      setCards((prev) => {
        return prev.map((c) => (c.id === card.id ? card : c));
      });
      await AsyncStorage.setItem(
        "cards",
        JSON.stringify(cards.map((c) => (c.id === card.id ? card : c)))
      );
      return;
    }

    setCards((prev) => [...prev, card]);
    await AsyncStorage.setItem("cards", JSON.stringify([...cards, card]));
  };

  const addCategory = async (
    category: Category,
    type: "Income" | "Expense"
  ) => {
    if (type === "Income") {
      setIncomeCategories((prev) => [...prev, category]);
      await AsyncStorage.setItem(
        "incomeCategories",
        JSON.stringify([...incomeCategories, category])
      );
    } else {
      setExpenseCategories((prev) => [...prev, category]);
      await AsyncStorage.setItem(
        "expenseCategories",
        JSON.stringify([...expenseCategories, category])
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        cards,
        setCards,
        transactions,
        setTransactions,
        balance,
        setBalance,
        incomeCategories,
        setIncomeCategories,
        expenseCategories,
        setExpenseCategories,
        addTransaction,
        addCard,
        addCategory,
      }}
    >
      {isLoading ? null : children}
    </AppContext.Provider>
  );
};

export default AppContext;
