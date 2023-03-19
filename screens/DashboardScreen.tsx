import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import MoreDetailsScreen from "./MoreDetailsScreen";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../constants/types";
import Settings from "../components/Settings";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styless";
import React from "react";
import TotalEgld from "../components/TotalEgld";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MoreDetailsScreen"
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

function DashboardScreen({ navigation }: Props) {
  function moreDetailsHandle() {
    navigation.navigate('MoreDetailsScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Settings name="flavius11" />
      <View style={styles.buttonAndTextContainer}>
        <View style={styles.textContainer}>
          <TotalEgld title="Total EGLD" sum="100.00"/>
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
