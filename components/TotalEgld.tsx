import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styless";

type TotalEgldProps = {
    title: string;
    sum: string;
};

function TotalEgld({title, sum}: TotalEgldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>
        <Text style={styles.xText}>{sum}</Text> EGLD
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    marginVertical: 10,
    color: GlobalStyles.colors.secondary200,
  },
  xText: {
    color: GlobalStyles.colors.primary700,
  },
});

export default TotalEgld;
