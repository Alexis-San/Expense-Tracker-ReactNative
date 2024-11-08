import { 
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddCardModal from "../screens/AddCardModal";
import NotFoundScreen from "../screens/NotFoundScreen";
import {
  AddStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/HomeScreen";
import OverviewScreen from "../screens/OverviewScreen";
import AddScreen from "../screens/AddScreen";
import AddExpense from "../screens/AddExpense";
import AddIncome from "../screens/AddIncome";
import MyCardsScreen from "../screens/MyCardsScreen";
import StartScreen from "../screens/StartScreen";
import AddCategoryModal from "../screens/AddCategoryModal";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"; // Importa la pantalla de registro

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem("cashBalanceAdded");
      if (value === null) {
        setIsLoggedIn(false);
        await AsyncStorage.setItem("cashBalanceAdded", "true");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Root" : "LoginScreen"}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* Añadimos la pantalla de registro */}
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Registrarse",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{
            title: "Add Card",
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
          name="AddCardModal"
          component={AddCardModal}
        />
        <Stack.Screen
          options={{
            title: "Add Category",
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
          name="AddCategoryModal"
          component={AddCategoryModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const AddStack = createNativeStackNavigator<AddStackParamList>();

function AddTransNavigator() {
  return (
    <AddStack.Navigator initialRouteName="Add">
      <AddStack.Screen
        name="Add"
        component={AddScreen}
        options={{
          title: "Add Transaction",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <AddStack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          title: "Add Expense",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <AddStack.Screen
        name="AddIncome"
        component={AddIncome}
        options={{
          title: "Add Income",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </AddStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#8033f7",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="home-filled"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="insert-chart"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddStack"
        component={AddTransNavigator}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="pluscircle"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyCards"
        component={MyCardsScreen}
        options={({ navigation }: RootTabScreenProps<"MyCards">) => ({
          tabBarLabel: () => null,
          headerShown: true,
          title: "My Cards",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ios-wallet"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddCardModal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                backgroundColor: "rgba(229,231, 235,0.3)",
                padding: 5,
                borderRadius: 10,
              })}
            >
              <AntDesign
                name="plus"
                size={22}
              />
            </Pressable>
          ),
          headerRightContainerStyle: {
            marginRight: 15,
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
