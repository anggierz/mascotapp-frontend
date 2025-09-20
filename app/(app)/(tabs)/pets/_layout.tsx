import { Stack } from "expo-router";

export default function PetsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Mis Mascotas" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalle de Mascota" }} />
      <Stack.Screen name="addPet" options={{ title: "Añadir Mascota" }} />
      <Stack.Screen name="editPet" options={{ title: "Editar Mascota" }} />
    </Stack>
  );
}
