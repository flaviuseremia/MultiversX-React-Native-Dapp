import { Image, StyleSheet, View, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants/types";
import { useContext } from "react";
import { Alert } from "react-native";

import Button from "../components/UI/Button";
import { UserContext } from "../store/UserContext";
import { GlobalStyles } from "../constants/styless";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

function LoginScreen({ navigation }: Props) {
  function handleLogin() {
    if (address.startsWith("erd")) {
      navigation.navigate("DashboardTabs");
    } else {
      Alert.alert("Invalid address", "The address is not correct.");
    }
  }

  const { address } = useContext(UserContext);
  const { setAddress } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/wizards_logo.png")}
          style={[styles.image]}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          value={address}
          placeholder="Enter address"
          placeholderTextColor="white"
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
    flex: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: "80%",
    height: "50%",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary700,
    color: "white",
    paddingHorizontal: 10,
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
