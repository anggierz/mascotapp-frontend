import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";


interface Props {
  title: string;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
}

export function Button({ title, onPress, style, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && { opacity: 0.5 }]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  text: {
    color: Theme.colors.textBlack || Theme.colors.text,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
