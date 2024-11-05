import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddCardModal:
    | {
        cardId: string;
      }
    | undefined;
  AddCategoryModal: {
    type: "Expense" | "Income";
  };
  NotFound: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  OverviewScreen: undefined;
  AddScreen: undefined;
  AddExpense: undefined;
  AddIncome: undefined;
  MyCardsScreen: undefined;
};

export type AddStackParamList = {
  Add: undefined;
  AddExpense: undefined;
  AddIncome: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Overview: undefined;
  AddStack: undefined;
  MyCards: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type AddTabScreenProps<Screen extends keyof AddStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AddStackParamList, Screen>,
    NativeStackScreenProps<AddStackParamList>
  >;
  