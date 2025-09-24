
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserSettings } from "@/src/hooks/useUserSettings";

export default function SettingsScreen() {
  const { user, signOut } = useUserSettings();

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Ionicons name="person-circle" size={100} color="#3A0CA3" />
      </View>
      <Text style={styles.name}>{user.name} {user.lastname}</Text>
      <TextInput
        style={styles.email}
        value={user.email}
        editable={false}
        selectTextOnFocus={false}
        placeholder="Email"
      />
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F4FF",
    padding: 24,
  },
  avatarWrapper: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A0CA3",
    marginBottom: 12,
    textAlign: "center",
  },
  email: {
    width: 260,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#888",
    marginBottom: 32,
    textAlign: "center",
  },
  signOutBtn: {
    backgroundColor: "#E63946",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
