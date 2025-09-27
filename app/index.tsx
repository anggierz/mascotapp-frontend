import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/src/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Theme } from "@/constants/theme";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
  <Ionicons name="paw" size={50} color={Theme.colors.primary} style={styles.icon} />
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
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: Theme.colors.background },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  icon: { marginRight: 10 },
  title: { fontSize: 40, fontWeight: "bold", color: Theme.colors.primary },
  subtitle: { fontSize: 16, color: Theme.colors.text, marginBottom: 40, textAlign: "center" },
  buttonPrimary: { backgroundColor: Theme.colors.primary, width: "80%", marginBottom: 15 },
  buttonSecondary: { backgroundColor: Theme.colors.secondary, width: "80%" },
});
