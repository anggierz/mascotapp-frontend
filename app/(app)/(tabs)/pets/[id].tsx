import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "@/constants/theme";
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
  container: { flex: 1, padding: 24, backgroundColor: Theme.colors.background },
  error: { fontSize: 18, color: Theme.colors.error, textAlign: "center", marginTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: Theme.colors.primary, marginBottom: 20, textAlign: "center", letterSpacing: 0.5 },
  label: { fontSize: 18, color: Theme.colors.text, marginBottom: 10 },
  buttonPrimary: {
    backgroundColor: Theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDanger: {
    backgroundColor: Theme.colors.error,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: Theme.colors.card, textAlign: "center", fontWeight: "bold" },
});
