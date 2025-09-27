import { View, Text, StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";
import { Button } from "@/src/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
  <Ionicons name="checkmark-circle" size={80} color={Theme.colors.primary} />
      <Text style={styles.title}>¡Registro exitoso!</Text>
      <Text style={styles.subtitle}>Tu cuenta ha sido creada correctamente.</Text>

      <Button
        title="Ir al login"
        onPress={() => router.push("/(auth)/login" as any)}
        style={styles.primaryButton}
      />
      <Button
        title="Volver a inicio"
        onPress={() => router.push("/" as any)}
        style={styles.secondaryButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Theme.colors.background, padding: 24 },
  icon: { color: Theme.colors.primary },
  title: { fontSize: 28, fontWeight: "bold", marginTop: 20, marginBottom: 10, color: Theme.colors.primary, textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 40, color: Theme.colors.text },
  primaryButton: { backgroundColor: Theme.colors.primary, marginBottom: 15, width: "80%" },
  secondaryButton: { backgroundColor: Theme.colors.secondary, width: "80%" }
});
