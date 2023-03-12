import { StyleSheet, View, Text, Pressable, ViewStyle, StyleProp } from "react-native";
import { GlobalStyles } from "../../constants/styless";

interface ButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

function Button({ children, onPress, style }: ButtonProps) {
    return (
      <View style={style}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {children}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
      padding: 8,
      backgroundColor: GlobalStyles.colors.primary700,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    pressed: {
      opacity: 0.75,
      backgroundColor: GlobalStyles.colors.primary100,
      borderRadius: 4,
    },
  });

export default Button;