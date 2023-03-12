import { Image, StyleSheet, View } from "react-native";

import Button from "../components/UI/Button";

function LoginScreen() {
  function login() {}
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
      <Image
        source={require("../assets/wizards_logo.png")}
        style={[styles.image]}
      />
      </View>
      <View style={styles.buttonContainer}>
        <Button children={"Login"} onPress={login} style={styles.button} />
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
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      image: {
        resizeMode: 'contain',
        width: '80%',
        height: '50%',
      },
      buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50,
      },
      button: {
        padding: 10,
        minWidth: "40%",
      },
});

export default LoginScreen;
