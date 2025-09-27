import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { Theme } from "@/constants/theme";

export function Input(props: TextInputProps & { style?: any }) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
  placeholderTextColor={Theme.colors.text}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  borderColor: Theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
});
