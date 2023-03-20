import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";

import Button from "../components/UI/Button";
import Settings from "../components/Settings";
import { GlobalStyles } from "../constants/styless";
import TotalEgld from "../components/TotalEgld";

function pressHandle() {}

function MoreDetailsScreen() {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonPress = (buttonText: string) => {
    setActiveButton(buttonText);
  };

  const isButtonActive = (buttonText: string) => {
    return activeButton === buttonText;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Settings name="flavius11" />
      <View>
        <View style={styles.textContainer}>
          <TotalEgld title="Total EGLD" sum="100.00" />
          <View style={styles.horizontalButtonsContainer}>
            <Button
              children={"Available"}
              onPress={() => handleButtonPress("Available")}
              style={[
                styles.horizontalButton,
                isButtonActive("Available") && styles.activeButton,
              ]}
            />
            <Button
              children={"Staked"}
              onPress={() => handleButtonPress("Staked")}
              style={[
                styles.horizontalButton,
                isButtonActive("Staked") && styles.activeButton,
              ]}
            />
            <Button
              children={"Rewards"}
              onPress={() => handleButtonPress("Rewards")}
              style={[
                styles.horizontalButton,
                isButtonActive("Rewards") && styles.activeButton,
              ]}
            />
          </View>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>X EGLD </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  
  horizontalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  horizontalButton: {
    marginTop: 20,
    width: "33%",
    padding: 1,
  },
  activeButton: {
    backgroundColor: GlobalStyles.colors.primary100,
  },
  displayContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: "35%",
    borderRadius: 8,
  },
  displayText: {
    fontSize: 28,
    color: "white",
  },
  button: {
    marginTop: 40,
    alignItems: "center",
  },
});

export default MoreDetailsScreen;