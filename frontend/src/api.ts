import type { Service } from './types/Service';

const BASE_URL =
  'https://service-operations-dashboard.onrender.com/api/services';

function authHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function getServices() {
  const res = await fetch(BASE_URL, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function addService(service: Service) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(service),
  });
  return res.json();
}

export async function updateService(
  id: number,
  data: Partial<Service>,
): Promise<Service> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function finalizeService(id: number): Promise<Service> {
  const res = await fetch(`${BASE_URL}/finalize/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  return res.json();
}

export async function deleteService(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  return res.json();
}
