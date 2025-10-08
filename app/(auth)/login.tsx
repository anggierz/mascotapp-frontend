import { View, Text, StyleSheet, Alert } from "react-native";
import { Theme } from "@/constants/theme";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { login } from "@/src/features/auth/services";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login({ email, password });
      router.replace("/(app)/(tabs)/calendar");
    } catch (e: any) {
      Alert.alert("Error", e.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={40} color={Theme.colors.primary} style={styles.icon} />
        <Text style={styles.title}>Inicia sesión</Text>
      </View>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        style={styles.buttonPrimary}
        disabled={loading}
      />

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
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  icon: { marginRight: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: Theme.colors.primary },
  input: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonPrimary: { backgroundColor: Theme.colors.primary, marginTop: 10 },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: Theme.colors.secondary,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
