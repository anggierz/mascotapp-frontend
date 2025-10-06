import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { Theme } from "@/constants/theme";

interface DietFormProps {
  onSubmit: (data: { foodName: string; kgPerDay: number; price: number }) => void;
}

export function DietForm({ onSubmit }: DietFormProps) {
  const [foodName, setFoodName] = useState("");
  const [kgPerDay, setKgPerDay] = useState("");
  const [price, setPrice] = useState("");

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nombre del alimento</Text>
      <Input value={foodName} onChangeText={setFoodName} placeholder="Ej: Pienso premium" />
      <Text style={styles.label}>Kg por día</Text>
      <Input value={kgPerDay} onChangeText={setKgPerDay} placeholder="Ej: 0.3" keyboardType="numeric" />
      <Text style={styles.label}>Precio</Text>
      <Input value={price} onChangeText={setPrice} placeholder="Ej: 20" keyboardType="numeric" />
      <Button
        title="Añadir dieta"
        onPress={() => {
          if (!foodName.trim() || !kgPerDay || !price) return;
          onSubmit({ foodName: foodName.trim(), kgPerDay: Number(kgPerDay), price: Number(price) });
          setFoodName("");
          setKgPerDay("");
          setPrice("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 24, marginBottom: 24 },
  label: { fontSize: 16, color: Theme.colors.text, marginBottom: 6, marginTop: 12 },
});
