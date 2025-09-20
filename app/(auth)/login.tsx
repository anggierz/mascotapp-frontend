import { View, Text } from "react-native";
import { useState } from "react";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">🐾 Mascotapp</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />

      <Button title="Inicia sesión" onPress={() => console.log("Login")} />
      <Button title="Registro" onPress={() => console.log("Register")} />
      <Button title="Olvidaste tu contraseña?" onPress={() => console.log("")} />
    </View>
  );
}
