// API helpers for authentication

import { RegisterPayload, LoginPayload, AuthResponse } from './types';
import { API_URL } from '@env';

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  console.log('loginUser: API_URL =', API_URL);
  console.log('loginUser: payload =', payload);
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('loginUser: response status =', res.status);
    if (!res.ok) {
      const text = await res.text();
      console.log('loginUser: error response =', text);
      throw new Error('Login failed');
    }
    const data = await res.json();
    console.log('loginUser: success response =', data);
    return data;
  } catch (err) {
    console.log('loginUser: fetch error =', err);
    throw err;
  }
}
