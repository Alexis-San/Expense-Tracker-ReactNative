import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
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
              AddIncomeScreen: "add/income",
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
      LoginScreen: "login",
      RegisterScreen: "register",
      ForgotPasswordScreen: "forgot-password",
      StartScreen: "start",
      AddCardModal: "add-card",
      AddCategoryModal: "add-category",
    },
  },
};

export default linking;
