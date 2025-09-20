import { View, Text, StyleSheet } from "react-native";

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recordatorios de medicación 💊</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F0F4FF" },
  text: { fontSize: 20, color: "#3A0CA3", fontWeight: "bold" },
});
