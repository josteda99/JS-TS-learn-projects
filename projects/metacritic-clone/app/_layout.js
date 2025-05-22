import { View } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { CircleInfoIcon } from "../components/Icons";

export default function Layout() {
  return (
    <View className="flex-1 ">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerTitle: "",
          headerRight: () => (
            <Link asChild href="/about">
              <CircleInfoIcon />
            </Link>
          ),
        }}
      />
    </View>
  );
}
