import type { Service, CreateServiceDTO } from './types/Service';
const API_BASE = import.meta.env.VITE_API_URL;

const BASE_URL = `${API_BASE}/api/services`;

function authHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function getServices(): Promise<Service[]> {
  const res = await fetch(BASE_URL, {
    headers: authHeaders(),
  });

  return res.json();
}

export async function addService(service: CreateServiceDTO): Promise<Service> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(service),
  });

  return res.json();
}

export async function updateService(
  _id: string,
  data: Partial<Service>,
): Promise<Service> {
  const res = await fetch(`${BASE_URL}/${_id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function finalizeService(_id: string): Promise<Service> {
  const res = await fetch(`${BASE_URL}/finalize/${_id}`, {
    method: 'PUT',
    headers: authHeaders(),
  });

  return res.json();
}

export async function deleteService(_id: string): Promise<Service> {
  const res = await fetch(`${BASE_URL}/delete/${_id}`, {
    method: 'PUT',
    headers: authHeaders(),
  });

  return res.json();
}
