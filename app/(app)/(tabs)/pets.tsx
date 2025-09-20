import { View, Text, StyleSheet } from "react-native";

export default function PetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gestión de mascotas 🐾</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F0F4FF" },
  text: { fontSize: 20, color: "#3A0CA3", fontWeight: "bold" },
});
