import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Reminder, ReminderType } from "@/src/features/reminders/services";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDateTimePickerHandler } from "@/src/hooks/useDateTimePickerHandler";

interface ReminderFormProps {
  initial?: Reminder | null;
  onSubmit: (data: Omit<Reminder, "id">) => void;
  onCancel: () => void;
}

export function ReminderForm({ initial, onSubmit, onCancel }: ReminderFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [type, setType] = useState<ReminderType>(initial?.type || "vet");
  const [isRecurrent, setIsRecurrent] = useState(initial?.isRecurrent || false);
  const [date, setDate] = useState(initial?.date ? new Date(initial.date) : new Date());
  const [frequency, setFrequency] = useState(initial?.frequency || 1);
  const [every, setEvery] = useState<"dia" | "semana" | "mes">(initial?.every || "mes");
  const [startTime, setStartTime] = useState(initial?.startTime ? new Date(initial.startTime) : new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);

  const handleDateChange = useDateTimePickerHandler(setDate, setShowDatePicker);
  const handleStartTimeChange = useDateTimePickerHandler(setStartTime, setShowStartTimePicker);

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (isRecurrent) {
      onSubmit({ name, type, isRecurrent, frequency, every, startTime: startTime.toISOString() });
    } else {
      onSubmit({ name, type, isRecurrent, date: date.toISOString() });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initial ? "Editar recordatorio" : "Añadir recordatorio"}</Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Ej: Vacuna anual" />
      <Text style={styles.label}>Tipo</Text>
      <View style={styles.typeRow}>
        <TouchableOpacity style={[styles.typeBtn, type === "vet" && styles.typeBtnActive]} onPress={() => setType("vet")}> 
          <Ionicons name="heart-half-outline" size={20} color={type === "vet" ? "#fff" : "#3A0CA3"} />
          <Text style={[styles.typeBtnText, type === "vet" && styles.typeBtnTextActive]}>Veterinario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === "deworming" && styles.typeBtnActive]} onPress={() => setType("deworming")}> 
          <Ionicons name="bug" size={20} color={type === "deworming" ? "#fff" : "#3A0CA3"} />
          <Text style={[styles.typeBtnText, type === "deworming" && styles.typeBtnTextActive]}>Desparasitación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === "medication" && styles.typeBtnActive]} onPress={() => setType("medication")}> 
          <Ionicons name="medkit" size={20} color={type === "medication" ? "#fff" : "#3A0CA3"} />
          <Text style={[styles.typeBtnText, type === "medication" && styles.typeBtnTextActive]}>Medicación</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowSwitch}>
        <Text style={styles.label}>¿Es recurrente?</Text>
        <TouchableOpacity style={[styles.switch, isRecurrent && styles.switchActive]} onPress={() => setIsRecurrent(!isRecurrent)}>
          <Text style={styles.switchText}>{isRecurrent ? "Sí" : "No"}</Text>
        </TouchableOpacity>
      </View>
      {!isRecurrent ? (
        <View>
          <Text style={styles.label}>Fecha y hora</Text>
          <TouchableOpacity style={styles.dateDisplay} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateDisplayText}>{date.toLocaleString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Frecuencia</Text>
          <View style={styles.freqRow}>
            <TextInput
              value={String(frequency)}
              onChangeText={(v) => setFrequency(Number(v) || 1)}
              style={[styles.input, { width: 80 }]}
              keyboardType="numeric"
              placeholder="Ej: 1"
            />
            <TouchableOpacity style={styles.freqOpt} onPress={() => setEvery("dia")}> 
              <Text style={[styles.freqOptText, every === "dia" && styles.freqOptTextActive]}>día</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.freqOpt} onPress={() => setEvery("semana")}> 
              <Text style={[styles.freqOptText, every === "semana" && styles.freqOptTextActive]}>semana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.freqOpt} onPress={() => setEvery("mes")}> 
              <Text style={[styles.freqOptText, every === "mes" && styles.freqOptTextActive]}>mes</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Hora de inicio</Text>
          <TouchableOpacity style={styles.dateDisplay} onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.dateDisplayText}>{startTime.toLocaleString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="datetime"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleStartTimeChange}
            />
          )}
        </View>
      )}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}><Text style={styles.saveText}>{initial ? "Guardar" : "Añadir"}</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4FF", padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", color: "#3A0CA3", marginBottom: 18 },
  label: { fontSize: 15, color: "#333", marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4895EF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  dateDisplay: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4895EF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateDisplayText: {
    fontSize: 16,
    color: "#333",
  },
  typeRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  typeBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4895EF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  typeBtnActive: { backgroundColor: "#3A0CA3", borderColor: "#3A0CA3" },
  typeBtnText: { marginLeft: 4, color: "#3A0CA3", fontWeight: "600" },
  typeBtnTextActive: { color: "#fff" },
  rowSwitch: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  switch: {
    backgroundColor: "#e6e6e6",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  switchActive: { backgroundColor: "#3A0CA3" },
  switchText: { color: "#3A0CA3", fontWeight: "bold" },
  freqRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  freqOpt: {
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  freqOptText: { color: "#3A0CA3", fontWeight: "600" },
  freqOptTextActive: { color: "#fff", backgroundColor: "#3A0CA3", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  actionsRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 18 },
  cancelBtn: { backgroundColor: "#e6e6e6", borderRadius: 8, paddingHorizontal: 18, paddingVertical: 10 },
  cancelText: { color: "#3A0CA3", fontWeight: "bold" },
  saveBtn: { backgroundColor: "#3A0CA3", borderRadius: 8, paddingHorizontal: 18, paddingVertical: 10 },
  saveText: { color: "#fff", fontWeight: "bold" },
});
