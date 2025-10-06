import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
// ...existing code...
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { getPets, Pet } from "@/src/features/pets/services";
import { Theme } from "@/constants/theme";

export default function PetsScreen() {
  const router = useRouter();
  const pets: Pet[] = getPets();

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.petCard}
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/pets/[id]",
                params: { id: item.id },
              })
            }
          >
            <Ionicons
              name={item.type === "dog" ? "paw" : "logo-octocat"}
              size={32}
              color={Theme.colors.primary}
              style={styles.icon}
            />
            <Text style={styles.petName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(app)/(tabs)/pets/addPet")}
      >
        <Ionicons name="add" size={28} color={Theme.colors.card} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  list: { padding: 16 },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  icon: { marginRight: 12 },
  petName: { fontSize: 18, fontWeight: "600", color: Theme.colors.text },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: Theme.colors.primary,
    borderRadius: 50,
    padding: 16,
    elevation: 5,
  },
});
