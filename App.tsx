import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "./constants/styless";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import StakeScreen from "./screens/StakeScreen";
import UnstakeScreen from "./screens/UnstakeScreen";
import NFTStakeScreen from "./screens/NFTStakeScreen";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GlobalStyles.colors.primary800,
  },
};

function DashboardTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GlobalStyles.colors.secondary200,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.gray600 },
      }}
    >
      <BottomTabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Stake"
        component={StakeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Unstake"
        component={UnstakeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="money-off" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="NFTStake"
        component={NFTStakeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="gamepad" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DashboardTabs" component={DashboardTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
