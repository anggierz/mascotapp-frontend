import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/src/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={50} color="#5E60CE" style={styles.icon} />
        <Text style={styles.title}>Mascotapp</Text>
      </View>

      <Text style={styles.subtitle}>
        Gestiona fácilmente a tus mascotas 🐶🐱
      </Text>

      
      <Button
        title="Iniciar sesión"
        onPress={() => router.push("/(auth)/login" as any)}
        style={styles.buttonPrimary}
      />
      <Button
        title="Registrarse"
        onPress={() => router.push("/(auth)/register" as any)}
        style={styles.buttonSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#F0F4FF" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  icon: { marginRight: 10 },
  title: { fontSize: 40, fontWeight: "bold", color: "#5E60CE" },
  subtitle: { fontSize: 16, color: "#333", marginBottom: 40, textAlign: "center" },
  buttonPrimary: { backgroundColor: "#3A0CA3", width: "80%", marginBottom: 15 },
  buttonSecondary: { backgroundColor: "#4361EE", width: "80%" },
});
