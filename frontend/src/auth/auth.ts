const AUTH_URL = 'http://localhost:5000/auth';

export async function login(email: string, password: string) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Falha no login');
  }

  const data = await res.json();

  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.user.role);

  return data;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}
