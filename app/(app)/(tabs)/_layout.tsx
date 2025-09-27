import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Theme.colors.primary,
          tabBarInactiveTintColor: Theme.colors.secondary,
          tabBarStyle: [styles.tabBar, { backgroundColor: Theme.colors.black }],
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendario",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="pets"
          options={{
            title: "Mascotas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="paw" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="reminders"
          options={{
            title: "Recordatorios",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medkit" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Usuario",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  tabBar: {
    backgroundColor: Theme.colors.black,
    borderTopWidth: 0,
    elevation: 4,
    height: 60,
    paddingBottom: 5,
    borderTopColor: Theme.colors.border,
  },
  tabBarLabel: {
    fontSize: 12,
    color: Theme.colors.primary,
  },
});
