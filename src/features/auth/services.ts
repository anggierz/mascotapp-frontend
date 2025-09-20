export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export function mockRegister(payload: RegisterPayload) {
  console.log("Registrando usuario (mock):", payload);
  // TODO: implementar registro real
  return { success: true, userId: "mock-user-123" };
}
