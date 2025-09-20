import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CalendarScreen() {
  const events = [
    { id: 1, title: "Cita veterinario", date: "2025-09-21", time: "10:00", desc: "Vacunas anuales" },
    { id: 2, title: "Desparasitación", date: "2025-09-21", time: "18:00", desc: "Pastilla mensual" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Calendario de Eventos</Text>

      <View style={styles.calendarMock}>
        <Text style={styles.calendarText}>[ TODO: Calendario ]</Text>
      </View>

      <Text style={styles.subtitle}>Eventos de hoy</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventDesc}>{event.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4FF" },
  scrollContent: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#3A0CA3", marginBottom: 20 },
  calendarMock: {
    height: 250,
    backgroundColor: "#FFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#4895EF",
  },
  calendarText: { color: "#999" },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#4361EE" },
  eventCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: { fontSize: 16, fontWeight: "bold", color: "#3A0CA3" },
  eventTime: { fontSize: 14, color: "#4895EF", marginTop: 4 },
  eventDesc: { fontSize: 14, color: "#555", marginTop: 2 },
});
