import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

interface Props {
  title: string;
  onPress: () => void;
  style?: any;
}

export function Button({ title, onPress, style }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
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
  color: Theme.colors.textBlack,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
