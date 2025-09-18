import { TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      className={`border p-3 rounded mb-3 ${props.className || ""}`}
      placeholderTextColor="#888"
    />
  );
}
