export type ReminderType = "vet" | "deworming" | "medication";

export interface Reminder {
  id: string;
  name: string;
  type: ReminderType;
  isRecurrent: boolean;
  date?: string; // ISO string
  frequency?: number;
  every?: "dia" | "semana" | "mes";
  startTime?: string; // ISO string
}

// TODO: Sustituir mocks por datos persistentes con backend
let reminders: Reminder[] = [
  {
    id: "1",
    name: "Cita veterinario",
    type: "vet",
    isRecurrent: false,
    date: "2025-10-01T10:00:00",
  },
  {
    id: "2",
    name: "Desparasitación",
    type: "deworming",
    isRecurrent: true,
    frequency: 1,
    every: "dia",
    startTime: "2025-09-30T09:00:00",
  },
];

export function getReminders(): Reminder[] {
  return reminders;
}

export function addReminder(reminder: Omit<Reminder, "id">): Reminder {
  const newReminder: Reminder = { ...reminder, id: String(Date.now()) };
  reminders.push(newReminder);
  return newReminder;
}

export function updateReminder(id: string, updates: Partial<Reminder>): Reminder | null {
  const index = reminders.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reminders[index] = { ...reminders[index], ...updates };
  return reminders[index];
}

export function deleteReminder(id: string): boolean {
  const before = reminders.length;
  reminders = reminders.filter((r) => r.id !== id);
  return reminders.length < before;
}
