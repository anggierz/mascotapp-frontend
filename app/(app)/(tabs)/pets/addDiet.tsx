import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { Theme } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDietToPet } from "@/src/features/pets/services";


export default function AddDietScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [kgPerDay, setKgPerDay] = useState("");
  const [price, setPrice] = useState("");


  const handleAdd = () => {
    if (!id || !foodName.trim() || !kgPerDay || !price) return;
    addDietToPet(id, { foodName: foodName.trim(), kgPerDay: Number(kgPerDay), price: Number(price) });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del alimento</Text>
      <Input value={foodName} onChangeText={setFoodName} placeholder="Ej: Pienso premium" />
      <Text style={styles.label}>Kg por día</Text>
      <Input value={kgPerDay} onChangeText={setKgPerDay} placeholder="Ej: 0.3" keyboardType="numeric" />
      <Text style={styles.label}>Precio</Text>
      <Input value={price} onChangeText={setPrice} placeholder="Ej: 20" keyboardType="numeric" />
      <Button title="Añadir dieta" onPress={handleAdd} style={{ backgroundColor: Theme.colors.primary, marginTop: 16 }} />
      <Button title="Cancelar" onPress={() => router.back()} style={{ backgroundColor: Theme.colors.secondary }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Theme.colors.background },
  label: { fontSize: 16, color: Theme.colors.text, marginBottom: 6, marginTop: 12 },
});
