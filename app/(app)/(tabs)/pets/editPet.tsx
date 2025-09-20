import { View, Text, StyleSheet } from "react-native";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getPetById, updatePet } from "@/src/features/pets/services";

export default function EditPetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pet = id ? getPetById(id) : null;

  const handleUpdate = () => {
    if (pet) {
      updatePet(pet.id, { name: pet.name + " (editado)" });
      router.back();
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Mascota no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar {pet.name}</Text>

      <Input placeholder="Nombre" style={styles.input} defaultValue={pet.name} />
      <Input placeholder="Peso" style={styles.input} defaultValue={String(pet.weight)} />
      <Input placeholder="Fecha nacimiento" style={styles.input} defaultValue={pet.birthdate} />

      <Button title="Guardar cambios" onPress={handleUpdate} style={styles.buttonPrimary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F0F4FF" },
  error: { fontSize: 18, color: "red", textAlign: "center", marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", color: "#3A0CA3", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4895EF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonPrimary: { backgroundColor: "#3A0CA3", marginTop: 10 },
});
