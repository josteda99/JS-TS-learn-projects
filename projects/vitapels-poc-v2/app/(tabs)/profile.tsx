
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';


export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable>
          <Text>Hello</Text>
        </Pressable>
      </View>
      <View style={styles.avatarContainer}>
        <Text>Avatar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    height: 50
  },
  avatarContainer: {
    backgroundColor: "#ddd",
    height: 1000
  }
});
