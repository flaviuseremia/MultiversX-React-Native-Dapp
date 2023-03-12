import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
