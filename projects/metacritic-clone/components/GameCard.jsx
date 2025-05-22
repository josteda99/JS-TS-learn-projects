import { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated, Pressable } from "react-native";
import { Score } from "./Score";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export function GameCard({ game }) {
  return (
    <Link href={`/${game.slug}`} asChild>
      <StyledPressable className="active:opacity-70 border-black active:border-white/50 mb-2 bg-slate-500/10 p-4 rounded-xl ">
        <View className="flex-row gap-4 ">
          <Image source={{ uri: game.image }} style={styles.image}></Image>
          <View className="flex-shrink">
            <Text style={styles.title}>{game.title}</Text>
            <Score score={game.score} maxScore={100}></Score>
            <Text className="mt-2 flex-shrink" style={styles.description}>
              {game.description.slice(0, 100)}...
            </Text>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, delay: index * 500, useNativeDrive: true }).start();
  }, [opacity, index]);
  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game}></GameCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});
