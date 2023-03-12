import { StyleSheet, View, Text, Pressable, ViewStyle, StyleProp } from "react-native";

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
      backgroundColor: "#0C2D59",
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    pressed: {
      opacity: 0.75,
      backgroundColor: "#c6affc",
      borderRadius: 4,
    },
  });

export default Button;