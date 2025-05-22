import { Link, Stack } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../components/ScreenLayout";
import { useEffect, useState } from "react";
import { getGameDetails } from "../lib/metacritic";
import { Score } from "../components/Score";
export default function Detail() {
  const { gameslug } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    setGameInfo(getGameDetails(gameslug));
  }, [gameslug]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => {},
          headerTitle: "The legend of zelda",
          headerRight: () => {},
        }}
      />
      <View>
        {gameInfo === null ? (
          <ActivityIndicator color={"#fff"} size="large" />
        ) : (
          <ScrollView>
            <View className="justify-center items-center text-center">
              <Image className="mb-5 rounded" source={{ uri: gameInfo.img }} style={{ width: 214, height: 294 }} />
              <Score score={gameInfo.score} maxScore={100} />
              <Text className="text-white text-center font-bold mb-8 text-2xl">{gameInfo.title}</Text>
              <Text className="text-white/70 text-center font-bold mb-8 text-base">{gameInfo.description}</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
