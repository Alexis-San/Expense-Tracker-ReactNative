import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import OverviewScreen from '../screens/OverviewScreen';
import AddScreen from '../screens/AddScreen';
import AddExpense from '../screens/AddExpense';
import AddIncome from '../screens/AddIncome';
import MyCardsScreen from '../screens/MyCardsScreen';
import StartScreen from '../screens/StartScreen';
import AddCardModal from '../screens/AddCardModal';
import AddCategoryModal from '../screens/AddCategoryModal';
import NotFoundScreen from '../screens/NotFoundScreen';
import LinkingConfiguration from './LinkingConfiguration';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
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
      options={{ headerShown: false }}
    />
    <Stack.Group screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="AddCardModal"
        component={AddCardModal}
        options={{ title: "Add Card", headerTitleAlign: "center", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="AddCategoryModal"
        component={AddCategoryModal}
        options={{ title: "Add Category", headerTitleAlign: "center", headerShadowVisible: false }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <BottomTab.Navigator initialRouteName="Home" screenOptions={{ tabBarActiveTintColor: "#8033f7" }}>
    <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ color }) => <MaterialIcons name="home-filled" color={color} size={25} style={{ marginBottom: -3 }} />,
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    />
    <BottomTab.Screen
      name="Overview"
      component={OverviewScreen}
      options={{
        tabBarLabel: () => null,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarIcon: ({ color }) => <MaterialIcons name="insert-chart" color={color} size={25} style={{ marginBottom: -3 }} />,
      }}
    />
    <BottomTab.Screen
      name="AddStack"
      component={AddTransNavigator}
      options={{
        tabBarLabel: () => null,
        headerTitleAlign: "center",
        headerShown: false,
        headerShadowVisible: false,
        tabBarIcon: ({ color }) => <AntDesign name="pluscircle" color={color} size={25} style={{ marginBottom: -3 }} />,
      }}
    />
    <BottomTab.Screen
      name="MyCards"
      component={MyCardsScreen}
      options={({ navigation }) => ({
        tabBarLabel: () => null,
        headerTitleAlign: "center",
        headerShown: true,
        headerShadowVisible: false,
        title: "My Cards",
        tabBarIcon: ({ color }) => <Ionicons name="ios-wallet" color={color} size={25} style={{ marginBottom: -3 }} />,
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
            <AntDesign name="plus" size={22} />
          </Pressable>
        ),
        headerRightContainerStyle: { marginRight: 15 },
      })}
    />
  </BottomTab.Navigator>
);

const AddTransNavigator = () => (
  <Stack.Navigator initialRouteName="Add">
    <Stack.Screen
      name="Add"
      component={AddScreen}
      options={{ title: "Add Transaction", headerTitleAlign: "center", headerShadowVisible: false }}
    />
    <Stack.Screen
      name="AddExpense"
      component={AddExpense}
      options={{ title: "Add Expense", headerTitleAlign: "center", headerShadowVisible: false }}
    />
    <Stack.Screen
      name="AddIncome"
      component={AddIncome}
      options={{ title: "Add Income", headerTitleAlign: "center", headerShadowVisible: false }}
    />
  </Stack.Navigator>
);

export default function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {userToken ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}