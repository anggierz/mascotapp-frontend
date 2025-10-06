import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { Platform } from 'react-native';

export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
}

export async function scheduleReminderNotification({
  title,
  body,
  date,
}: {
  title: string;
  body: string;
  date: Date;
}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: Platform.OS === 'android'
      ? {
          type: SchedulableTriggerInputTypes.DATE,
          date: date.getTime(),
          channelId: 'reminders',
        }
      : {
          type: SchedulableTriggerInputTypes.DATE,
          date,
        },
  });
}

export function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('reminders', {
      name: 'Recordatorios',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }
}
