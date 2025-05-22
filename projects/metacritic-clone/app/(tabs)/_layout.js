import { Tabs } from "expo-router";
import { View } from "react-native";
import { CircleInfoIcon, HomeIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
      }}>
      <Tabs.Screen name="index" options={{ title: "home", tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}></Tabs.Screen>
      <Tabs.Screen name="about" options={{ title: "about", tabBarIcon: ({ color }) => <CircleInfoIcon color={color} /> }}></Tabs.Screen>
    </Tabs>
  );
}
