import { useState, useMemo } from "react";

// TODO: Sustituir mocks por datos reales de backend
const events = [
  { id: 1, title: "Cita veterinario", date: "2025-09-21", time: "10:00", desc: "Vacunas anuales" },
  { id: 2, title: "Desparasitación", date: "2025-09-21", time: "18:00", desc: "Pastilla mensual" },
  { id: 3, title: "Baño", date: "2025-09-24", time: "12:00", desc: "Baño mensual" },
];

export function useCalendarEvents() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const markedDates = useMemo(() => {
    return events.reduce((acc: any, event) => {
      acc[event.date] = {
        marked: true,
        dotColor: "#3A0CA3",
        selected: event.date === selectedDate,
        selectedColor: event.date === selectedDate ? "#4895EF" : undefined,
      };
      return acc;
    }, { [selectedDate]: { selected: true, selectedColor: "#4895EF" } });
  }, [selectedDate]);

  const eventsForDate = useMemo(() => events.filter((event) => event.date === selectedDate), [selectedDate]);

  return {
    selectedDate,
    setSelectedDate,
    markedDates,
    eventsForDate,
  };
}
