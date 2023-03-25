import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from "react-native";
import React, { useEffect, useContext } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../constants/types";
import Settings from "../components/Settings";
import Button from "../components/UI/Button";
import TotalEgld from "../components/TotalEgld";
import { getUserName, getTotalEgld } from "../util/infos";
import { UserContext } from "../store/UserContext";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MoreDetailsScreen"
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

function DashboardScreen({ navigation }: Props) {
  const { username } = useContext(UserContext);
  const { totalBalance } = useContext(UserContext);
  const { setUsername } = useContext(UserContext);
  const { setTotalBalance } = useContext(UserContext);

  useEffect(() => {
    getTotalEgld()
      .then((response) => {
        setTotalBalance(response);
      })
      .catch((error) => console.error(error));
  }, [getTotalEgld]);

  useEffect(() => {
    getUserName()
      .then((response) => {
        setUsername(response);
      })
      .catch((error) => console.error(error));
  }, [setUsername]);

  function moreDetailsHandle() {
    navigation.navigate("MoreDetailsScreen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Settings name={username} />
      <View style={styles.buttonAndTextContainer}>
        <View style={styles.textContainer}>
          <TotalEgld title="Total EGLD" sum={totalBalance} />
        </View>
        <Button
          children={"Show More Details"}
          onPress={moreDetailsHandle}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonAndTextContainer: {
    alignItems: "center",
  },
  textContainer: {
    marginTop: "35%",
    alignItems: "center",
  },
  button: {
    marginTop: 40,
  },
});

export default DashboardScreen;
