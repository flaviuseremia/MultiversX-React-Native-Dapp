import { Image, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants/types";

import Button from "../components/UI/Button";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

function LoginScreen({ navigation }: Props) {
  function handleLogin() {
    navigation.navigate("DashboardTabs");
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/wizards_logo.png")}
          style={[styles.image]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          children={"Login"}
          onPress={handleLogin}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: "80%",
    height: "50%",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
  button: {
    padding: 10,
    minWidth: "40%",
  },
});

export default LoginScreen;
