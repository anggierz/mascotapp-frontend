import { Text, TouchableOpacity } from "react-native";

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      className="bg-blue-500 p-3 rounded-xl mb-3"
      onPress={onPress}
    >
      <Text className="text-white text-center font-bold">{title}</Text>
    </TouchableOpacity>
  );
}