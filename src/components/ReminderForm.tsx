import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { Theme } from "@/constants/theme";
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
          <Ionicons name="heart-half-outline" size={20} color={type === "vet" ? Theme.colors.card : Theme.colors.primary} />
          <Text style={[styles.typeBtnText, type === "vet" && styles.typeBtnTextActive]}>Veterinario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === "deworming" && styles.typeBtnActive]} onPress={() => setType("deworming")}> 
          <Ionicons name="bug" size={20} color={type === "deworming" ? Theme.colors.card : Theme.colors.primary} />
          <Text style={[styles.typeBtnText, type === "deworming" && styles.typeBtnTextActive]}>Desparasitación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === "medication" && styles.typeBtnActive]} onPress={() => setType("medication")}> 
          <Ionicons name="medkit" size={20} color={type === "medication" ? Theme.colors.card : Theme.colors.primary} />
          <Text style={[styles.typeBtnText, type === "medication" && styles.typeBtnTextActive]}>Medicación</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowSwitch}>
        <Text style={styles.label}>¿Es recurrente?</Text>
          <TouchableOpacity style={[styles.switch, isRecurrent && styles.switchActive]} onPress={() => setIsRecurrent(!isRecurrent)}>
            <Text style={[isRecurrent ? styles.switchActiveText : styles.switchText]}>{isRecurrent ? "Sí" : "No"}</Text>
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
  container: { flex: 1, backgroundColor: Theme.colors.background, padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", color: Theme.colors.primary, marginBottom: 18 },
  label: { fontSize: 15, color: Theme.colors.text, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  dateDisplay: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateDisplayText: {
    fontSize: 16,
    color: Theme.colors.text,
  },
  typeRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  typeBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Theme.colors.card,
  },
  typeBtnActive: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  typeBtnText: { marginLeft: 4, color: Theme.colors.primary, fontWeight: "600" },
  typeBtnTextActive: { color: Theme.colors.card },
  rowSwitch: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  switch: {
      backgroundColor: Theme.colors.card,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
      borderWidth: 1,
      borderColor: Theme.colors.border,
  },
    switchActive: { backgroundColor: Theme.colors.primary },
  switchText: { color: Theme.colors.primary, fontWeight: "bold" },
    switchActiveText: {
      color: Theme.colors.card,
      fontWeight: "bold",
    },
  freqRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  freqOpt: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  freqOptText: { color: Theme.colors.primary, fontWeight: "600" },
  freqOptTextActive: { color: Theme.colors.card, backgroundColor: Theme.colors.primary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  actionsRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 18 },
  cancelBtn: { backgroundColor: Theme.colors.secondary, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 10 },
  cancelText: { color: Theme.colors.primary, fontWeight: "bold" },
  saveBtn: { backgroundColor: Theme.colors.primary, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 10 },
  saveText: { color: Theme.colors.card, fontWeight: "bold" },
});
