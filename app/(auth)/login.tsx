import { View, Text, StyleSheet } from "react-native";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // TODO: conectar a backend y validar credenciales
    router.replace("/(app)/(tabs)/calendar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={40} color="#5E60CE" style={styles.icon} />
        <Text style={styles.title}>Inicia sesión</Text>
      </View>

      <Input placeholder="Email" style={styles.input} />
      <Input placeholder="Contraseña" secureTextEntry style={styles.input} />

      <Button title="Entrar" onPress={handleLogin} style={styles.buttonPrimary} />

      <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F0F4FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  icon: { marginRight: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: "#5E60CE" },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#4895EF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonPrimary: { backgroundColor: "#3A0CA3", marginTop: 10 },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#4361EE",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
