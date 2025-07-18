import Rive from "rive-react-native";
import { StyleSheet, Text, View } from "react-native";

function RiveDemo() {
  return <Rive url="warawara2.riv" artboardName="iPhone 16 - 1" stateMachineName="test" style={{ width: 400, height: 400 }} />;
}

export default function App() {
  return (
    <View style={styles.container}>
      <RiveDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
