import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      LoginScreen: "login", // Added LoginScreen
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "Home",
            },
          },
          Overview: {
            screens: {
              OverviewScreen: "overview",
            },
          },
          AddStack: {
            screens: {
              AddScreen: "add",
              AddExpenseScreen: "add/expense",
            },
          },
          MyCards: {
            screens: {
              MyCardsScreen: "my-cards",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
      
    },
  },
};

export default linking;