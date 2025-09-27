import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useRouter } from "expo-router";
import { addPet } from "@/src/features/pets/services";
import { Theme } from "@/constants/theme";

export default function AddPetScreen() {
  const router = useRouter();

  const [type, setType] = useState<"dog" | "cat">("dog");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [weight, setWeight] = useState("");

  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const handleCreatePet = () => {
    if (!name.trim()) return;

    addPet({
      name: name.trim(),
      type,
      birthdate: toISODate(birthdate),
      weight: Number(weight) || 0,
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Text style={styles.title}>Añadir Mascota</Text> */}

        {/* Tipo */}
        <Text style={styles.label}>Tipo</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setTypeModalVisible(true)}
        >
          <Text style={styles.selectorText}>
            {type === "dog" ? "Perro" : "Gato"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#3A0CA3" />
        </Pressable>

        {/* Nombre */}
        <Text style={styles.label}>Nombre</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Ej: Luna"
          style={styles.input}
        />

        {/* Fecha de nacimiento */}
        <Text style={styles.label}>Fecha de nacimiento</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setDateModalVisible(true)}
        >
          <Text style={styles.selectorText}>
            {birthdate.toLocaleDateString("es-ES")}
          </Text>
          <Ionicons name="calendar" size={18} color="#3A0CA3" />
        </Pressable>

        {/* Peso */}
        <Text style={styles.label}>Peso (kg)</Text>
        <Input
          value={weight}
          onChangeText={setWeight}
          placeholder="Ej: 5"
          keyboardType="numeric"
          style={styles.input}
        />

        <Button
          title="Guardar Mascota"
          onPress={handleCreatePet}
          style={styles.buttonPrimary}
        />
      </ScrollView>

      {/* ===== Modal Tipo ===== */}
      <Modal
        transparent
        visible={typeModalVisible}
        animationType="fade"
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Tipo de mascota</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setType("dog");
                setTypeModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Perro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setType("cat");
                setTypeModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Gato</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setTypeModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ===== Modal Fecha (solo iOS) ===== */}
      <Modal
        transparent
        visible={dateModalVisible}
        animationType="slide"
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecciona fecha</Text>

            <DateTimePicker
              value={birthdate}
              mode="date"
              display="spinner"
              onChange={(_: DateTimePickerEvent, d?: Date) => {
                if (d) setBirthdate(d);
              }}
              style={styles.iosPicker}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBtnSecondary}
                onPress={() => setDateModalVisible(false)}
              >
                <Text style={styles.modalBtnSecondaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnPrimary}
                onPress={() => setDateModalVisible(false)}
              >
                <Text style={styles.modalBtnPrimaryText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}


function toISODate(d: Date) {
  return d.toISOString().split("T")[0];
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Theme.colors.background },
  content: { padding: 24, paddingBottom: 32 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
    fontSize: 16,
    color: Theme.colors.text,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  selectorText: { fontSize: 16, color: Theme.colors.text },
  buttonPrimary: { backgroundColor: Theme.colors.primary, marginTop: 20 },

  
  modalOverlay: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: Theme.colors.card,
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  modalOptionText: { fontSize: 16, color: Theme.colors.text },
  modalCancel: { marginTop: 8, alignSelf: "center" },
  modalCancelText: { color: Theme.colors.secondary, fontSize: 16, fontWeight: "600" },

  iosPicker: { backgroundColor: Theme.colors.background },
  modalActions: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalBtnSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Theme.colors.secondary,
  },
  modalBtnSecondaryText: { color: Theme.colors.primary, fontWeight: "700" },
  modalBtnPrimary: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Theme.colors.primary,
  },
  modalBtnPrimaryText: { color: Theme.colors.card, fontWeight: "700" },
});
