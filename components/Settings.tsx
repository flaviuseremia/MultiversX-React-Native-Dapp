import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styless";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";

function emptyFunction() {}

function Settings({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <IconButton
        icon="person-circle"
        size={36}
        color={GlobalStyles.colors.primary200}
        onPress={emptyFunction}
      />
      <Text style={styles.text}>Hello @{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center'
  },
  text: {
    color: GlobalStyles.colors.secondary200,
    marginLeft: 8,
  },
});

export default Settings;
