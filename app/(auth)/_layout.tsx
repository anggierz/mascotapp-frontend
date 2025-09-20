import { Stack } from "expo-router";
import { KeyboardAwareScreen } from "@/src/components/KeyboardAwareScreen";

export default function AuthLayout() {
  return (
    <KeyboardAwareScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="success" />
      </Stack>
    </KeyboardAwareScreen>
  );
}
