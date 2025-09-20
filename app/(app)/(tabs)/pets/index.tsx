import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { getPets, Pet } from "@/src/features/pets/services";

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
              name="paw"
              size={32}
              color="#3A0CA3"
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
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4FF" },
  list: { padding: 16 },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  icon: { marginRight: 12 },
  petName: { fontSize: 18, fontWeight: "600", color: "#333" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#3A0CA3",
    borderRadius: 50,
    padding: 16,
    elevation: 5,
  },
});
