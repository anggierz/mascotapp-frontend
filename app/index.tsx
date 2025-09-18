import { View, Text, StyleSheet } from "react-native";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { Ionicons } from '@react-native-vector-icons/ionicons'

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={40} color="#5E60CE" style={styles.icon} />
        <Text style={styles.title}>Mascotapp</Text>
      </View>


      <Input placeholder="Email" style={styles.input} />
      <Input placeholder="Contraseña" secureTextEntry style={styles.input} />


      <Button title="Login" onPress={() => {}} style={styles.buttonPrimary} />
      <Button title="Registro" onPress={() => {}} style={styles.buttonSecondary} />
      
      <Text style={styles.forgotPassword} onPress={() => {}}>
        Has olvidado tu contraseña?
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
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5E60CE", // morado intenso
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#4895EF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: "#3A0CA3",
  },
  buttonSecondary: {
    backgroundColor: "#4361EE", 
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: "center",
    color: "#5E60CE", 
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
