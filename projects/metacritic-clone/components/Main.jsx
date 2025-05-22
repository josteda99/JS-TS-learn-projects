import { View, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => setGames(games));
  }, []);

  return (
    <View className="bg-black" style={{ paddingBottom: insets.bottom }}>
      {games.lenght === 0 ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList data={games} keyExtractor={(game) => game.slug} renderItem={({ item, index }) => <AnimatedGameCard game={item} index={index} />} />
      )}
    </View>
  );
}
