import { View, Text, StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { mockRegister } from "@/src/features/auth/services";

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = () => {
    const result = mockRegister({
      name: "Usuario Demo",
      email: "demo@email.com",
      password: "123456",
    });
    if (result.success) {
      router.push("/(auth)/success" as any);
    }
  };

  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="paw" size={40} color={Theme.colors.primary} style={styles.icon} />
          <Text style={styles.title}>Registro</Text>
        </View>

        <Input placeholder="Nombre" style={styles.input} />
        <Input placeholder="Email" style={styles.input} />
        <Input placeholder="Contraseña" secureTextEntry style={styles.input} />
        <Input
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
        />

        <Button
          title="Crear cuenta"
          onPress={handleRegister}
          style={styles.buttonPrimary}
        />

        <Text
          style={styles.link}
          onPress={() => router.push("/(auth)/login" as any)}
        >
          ¿Ya tienes una cuenta? Inicia sesión
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: Theme.colors.primary,
  },
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
