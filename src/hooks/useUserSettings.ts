import { mockUser } from "@/src/features/auth/mockUser";

export function useUserSettings() {
  const user = mockUser;

  const signOut = () => {
    // TODO: Implementar logica real
    alert("Sesión cerrada");
  };

  return {
    user,
    signOut,
  };
}
