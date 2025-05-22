import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { HomeIcon } from "../../components/Icons";
import { Screen } from "../../components/ScreenLayout";

export default function About() {
  return (
    <Screen>
      <ScrollView>
        <Link asChild href="/" className="text-blue-400  mt-4">
          <Pressable>{({ pressed }) => <HomeIcon style={{ opacity: pressed ? 0.5 : 1 }} />}</Pressable>
        </Link>
        <Text className="text-white font-bold mb-8 text-2xl">About</Text>
        <Text className="text-white text-white/90 mb-4">Lorem ipsum </Text>
      </ScrollView>
    </Screen>
  );
}
