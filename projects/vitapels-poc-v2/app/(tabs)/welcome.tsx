import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {



  return (
    <SafeAreaView style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <View style={styles.welcomeContainer}></View>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.title}>Welcome <Text style={styles.vita}>Vitauser</Text></Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: "black"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  welcomeContainer: {
    padding: 16,
    width: '100%',
    height: 500,
    backgroundColor: '#ddd'
  },
  welcomeTextContainer: {
    padding: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'SpaceMono',
  },
  vita: {
    fontWeight: 'bold',
  }
});
