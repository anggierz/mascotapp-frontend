import { Stack } from "expo-router";
import { Theme } from "@/constants/theme";

export default function PetsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Theme.colors.background },
        headerTintColor: Theme.colors.primary,
        headerTitleStyle: { color: Theme.colors.primary },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Mis Mascotas" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalle de Mascota" }} />
      <Stack.Screen name="addPet" options={{ title: "Añadir Mascota" }} />
      <Stack.Screen name="editPet" options={{ title: "Editar Mascota" }} />
    </Stack>
  );
}
