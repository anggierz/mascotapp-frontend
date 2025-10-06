import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Theme } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPetById, deletePet, getDietsForPet, deleteDietFromPet, Diet } from "@/src/features/pets/services";

import { useState } from "react";

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pet = id ? getPetById(id) : null;
  const [diets, setDiets] = useState<Diet[]>(id ? getDietsForPet(id) : []);


  const handleDeleteDiet = (dietId: string) => {
    if (!id) return;
    deleteDietFromPet(id, dietId);
    setDiets(getDietsForPet(id));
  };

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
      <View style={styles.headerCol}>
        <View style={styles.iconCircle}>
          <Ionicons
            name={pet.type === "dog" ? "paw" : "logo-octocat"}
            size={40}
            color={Theme.colors.card}
          />
        </View>
        <Text style={styles.title}>{pet.name}</Text>
      </View>
      <Text style={styles.label}>Tipo: {pet.type}</Text>
      <Text style={styles.label}>Nacimiento: {pet.birthdate}</Text>
      <Text style={styles.label}>Peso: {pet.weight} kg</Text>

      
      <Text style={[styles.label, { marginTop: 24, fontWeight: "bold" }]}>Dietas</Text>
      {diets.length === 0 ? (
        <Text style={{ color: Theme.colors.text, marginBottom: 8 }}>No hay dietas registradas.</Text>
      ) : (
        diets.map((diet) => (
          <View key={diet.id} style={styles.dietItem}>
            <Text style={styles.dietText}>🍽️ {diet.foodName} | {diet.kgPerDay} kg/día | {diet.price}€</Text>
            <TouchableOpacity onPress={() => handleDeleteDiet(diet.id)} style={styles.dietDeleteBtn}>
              <Text style={styles.dietDeleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <TouchableOpacity
        style={styles.addDietBtn}
        onPress={() => router.push({ pathname: "/(app)/(tabs)/pets/addDiet", params: { id } })}
      >
        <Text style={styles.addDietBtnText}>+ Añadir dieta</Text>
      </TouchableOpacity>

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
  headerCol: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
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
  dietItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Theme.colors.card,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  dietText: { color: Theme.colors.text, fontSize: 16 },
  dietDeleteBtn: {
    backgroundColor: Theme.colors.error,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  dietDeleteText: { color: Theme.colors.card, fontWeight: "bold" },
  addDietBtn: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  addDietBtnText: {
    color: Theme.colors.card,
    fontWeight: "bold",
    fontSize: 16,
  },
});
