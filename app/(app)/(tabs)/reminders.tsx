
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Platform } from "react-native";
import { Theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useReminders } from "@/src/hooks/useReminders";
import { Reminder } from "@/src/features/reminders/services";
import { ReminderForm } from "@/src/components/ReminderForm";

export default function RemindersScreen() {
  const { reminders, addReminder, updateReminder, deleteReminder } = useReminders();
  const [modalVisible, setModalVisible] = useState(false);
  const [editReminder, setEditReminder] = useState<Reminder | null>(null);

  const handleAdd = (data: Omit<Reminder, "id">) => {
    addReminder(data);
    setModalVisible(false);
  };

  const handleEdit = (data: Omit<Reminder, "id">) => {
    if (editReminder) {
      updateReminder(editReminder.id, data);
      setEditReminder(null);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
  <Text style={styles.title}>Recordatorios Activos</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setEditReminder(item);
              setModalVisible(true);
            }}
          >
            <Ionicons
              name={item.isRecurrent ? "notifications" : "calendar"}
              size={28}
              color={Theme.colors.primary}
              style={styles.icon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.type}>{item.type === "vet" ? "Visita veterinario" : item.type === "deworming" ? "Desparasitación" : "Medicación"}</Text>
              <Text style={styles.detail}>{item.isRecurrent ? `Recurrente cada ${item.frequency} ${item.every}(s)` : `Fecha: ${item.date?.replace('T', ' ')}`}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteReminder(item.id)}>
              <Ionicons name="trash" size={22} color={Theme.colors.error} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => { setEditReminder(null); setModalVisible(true); }}>
        <Ionicons name="add" size={28} color={Theme.colors.card} />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
          {Platform.OS === 'ios' && (
            <View style={{ paddingTop: 48, paddingHorizontal: 24, backgroundColor: Theme.colors.background, borderBottomWidth: 1, borderBottomColor: Theme.colors.border }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => { setEditReminder(null); setModalVisible(false); }}
              >
                <Ionicons name="arrow-back" size={24} color={Theme.colors.primary} style={{ marginRight: 8 }} />
                <Text style={{ color: Theme.colors.primary, fontSize: 16, fontWeight: 'bold' }}>Volver</Text>
              </TouchableOpacity>
            </View>
          )}
          <ReminderForm
            initial={editReminder}
            onSubmit={editReminder ? handleEdit : handleAdd}
            onCancel={() => { setEditReminder(null); setModalVisible(false); }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  title: { fontSize: 24, fontWeight: "bold", color: Theme.colors.primary, margin: 16, textAlign: "center", letterSpacing: 0.5 },
  list: { padding: 8 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  icon: { marginRight: 12 },
  name: { fontSize: 18, fontWeight: "600", color: Theme.colors.text },
  type: { fontSize: 14, color: Theme.colors.primary },
  detail: { fontSize: 13, color: Theme.colors.text },
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
