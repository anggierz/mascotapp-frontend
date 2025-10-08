import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, loginUser } from './api';
import { RegisterPayload, LoginPayload } from './types';

export async function register(payload: RegisterPayload) {
  const data = await registerUser(payload);
  if (data.token) {
    await AsyncStorage.setItem('authToken', data.token);
  }
  return data;
}

export async function login(payload: LoginPayload) {
  console.log(payload);
  const data = await loginUser(payload);
  if (data.token) {
    await AsyncStorage.setItem('authToken', data.token);
  }
  return data;
}

export async function logout() {
  await AsyncStorage.removeItem('authToken');
}

export async function getStoredToken() {
  return AsyncStorage.getItem('authToken');
}
