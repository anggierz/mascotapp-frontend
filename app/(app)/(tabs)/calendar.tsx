import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CalendarPicker } from "@/src/components/CalendarPicker";
import { useCalendarEvents } from "@/src/hooks/useCalendarEvents";
import { Theme } from "@/constants/theme";

export default function CalendarScreen() {
  const {
    selectedDate,
    setSelectedDate,
    markedDates,
    eventsForDate,
  } = useCalendarEvents();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Calendario de Eventos</Text>
      <CalendarPicker
        selectedDate={selectedDate}
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
      <Text style={styles.subtitle}>
        {eventsForDate.length > 0
          ? `Eventos para el ${selectedDate}`
          : `No hay eventos para el ${selectedDate}`}
      </Text>
      {eventsForDate.map((event: { id: number; title: string; time: string; desc: string }) => (
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
  container: { flex: 1, backgroundColor: Theme.colors.background },
  scrollContent: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: Theme.colors.primary, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: Theme.colors.text },
  eventCard: {
    backgroundColor: Theme.colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Theme.colors.border,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: { fontSize: 16, fontWeight: "bold", color: Theme.colors.primary },
  eventTime: { fontSize: 14, color: Theme.colors.accent, marginTop: 4 },
  eventDesc: { fontSize: 14, color: Theme.colors.text, marginTop: 2 },
});
