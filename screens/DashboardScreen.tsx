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
  const { address } = useContext(UserContext);
  const { setUsername } = useContext(UserContext);
  const { setTotalBalance } = useContext(UserContext);
  const { setStakedBalance } = useContext(UserContext);
  const { setAvailableBalance } = useContext(UserContext);
  const { setRewardsBalance } = useContext(UserContext);

  useEffect(() => {
    getTotalEgld(address)
      .then((response) => {
        setTotalBalance(response.total);
        console.log(`Total Egld: ${totalBalance}`);
        // Add the calls here and update the context, after delete the calls from the other places and take the infos from context
        setAvailableBalance(response.available);
        setStakedBalance(response.stake);
        setRewardsBalance(response.rewards);
      })
      .catch((error) => console.error(error));
  }, [getTotalEgld]);

  useEffect(() => {
    getUserName(address)
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
