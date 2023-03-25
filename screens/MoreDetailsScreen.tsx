import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import Button from "../components/UI/Button";
import Settings from "../components/Settings";
import { GlobalStyles } from "../constants/styless";
import TotalEgld from "../components/TotalEgld";
import { getAvailableEgld, getStakedEgld } from "../util/infos";
import { UserContext } from "../store/UserContext";

function MoreDetailsScreen() {
  const { availableBalance } = useContext(UserContext);
  const { stakedBalance } = useContext(UserContext);
  const { setAvailableBalance } = useContext(UserContext);
  const { setStakedBalance } = useContext(UserContext);

  const [activeButton, setActiveButton] = useState("Available");

  const handleButtonPress = (buttonText: string) => {
    setActiveButton(buttonText);
  };

  type ButtonFunctions = {
    [key: string]: () => Promise<any>;
  };

  const buttonFunctions: ButtonFunctions = {
    Available: getAvailableEgld,
    Staked: getStakedEgld,
  };

  const isButtonActive = (
    buttonText: string,
    setFunc: Dispatch<React.SetStateAction<string>>
  ) => {
    if (activeButton === buttonText) {
      useEffect(() => {
        buttonFunctions[buttonText]()
          .then((response) => {
            setFunc((response / 10 ** 18).toFixed(2));
          })
          .catch((error) => console.error(error));
      }, [setFunc, activeButton]);
      return true;
    }
  };

  function isValueActive() {
    return true;
  }

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
                isButtonActive("Available", setAvailableBalance) &&
                  styles.activeButton,
              ]}
            />
            <Button
              children={"Staked"}
              onPress={() => handleButtonPress("Staked")}
              style={[
                styles.horizontalButton,
                isButtonActive("Staked", setStakedBalance) &&
                  styles.activeButton,
              ]}
            />
            <Button
              children={"Rewards"}
              onPress={() => handleButtonPress("Rewards")}
              style={[
                styles.horizontalButton,
                isButtonActive("Rewards", setAvailableBalance) &&
                  styles.activeButton,
              ]}
            />
          </View>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>
            {activeButton === "Available" ? availableBalance : stakedBalance}{" "}
            EGLD
          </Text>
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
