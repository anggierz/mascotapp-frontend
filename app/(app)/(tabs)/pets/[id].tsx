import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPetById, deletePet } from "@/src/features/pets/services";

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pet = id ? getPetById(id) : null;

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Mascota no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    deletePet(pet.id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pet.name}</Text>
      <Text style={styles.label}>Tipo: {pet.type}</Text>
      <Text style={styles.label}>Nacimiento: {pet.birthdate}</Text>
      <Text style={styles.label}>Peso: {pet.weight} kg</Text>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() =>
          router.push({ pathname: "/(app)/(tabs)/pets/editPet", params: { id: pet.id } })
        }
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F0F4FF" },
  error: { fontSize: 18, color: "red", textAlign: "center", marginTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#3A0CA3", marginBottom: 20 },
  label: { fontSize: 18, color: "#333", marginBottom: 10 },
  buttonPrimary: {
    backgroundColor: "#3A0CA3",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDanger: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
