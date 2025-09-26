import { useState } from "react";
import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
  Reminder,
} from "@/src/features/reminders/services";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(getReminders());

  const handleAdd = (reminder: Omit<Reminder, "id">) => {
    const newReminder = addReminder(reminder);
    setReminders(getReminders());
    return newReminder;
  };

  const handleUpdate = (id: string, updates: Partial<Reminder>) => {
    updateReminder(id, updates);
    setReminders(getReminders());
  };

  const handleDelete = (id: string) => {
    deleteReminder(id);
    setReminders(getReminders());
  };

  return {
    reminders,
    addReminder: handleAdd,
    updateReminder: handleUpdate,
    deleteReminder: handleDelete,
  };
}
