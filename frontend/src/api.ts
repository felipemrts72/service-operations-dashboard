import type { Service } from './types/Service';

const BASE_URL = 'http://localhost:5000/api/services';

export async function getServices(): Promise<Service[]> {
  const res = await fetch(BASE_URL);
  const json = await res.json();
  return json;
}

export async function addService(service: Service): Promise<Service> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  return res.json();
}

export async function updateService(
  id: string,
  data: Partial<Service>,
): Promise<Service> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function finalizeService(id: string): Promise<Service> {
  const res = await fetch(`${BASE_URL}/finalize/${id}`, { method: 'PUT' });
  return res.json();
}

export async function deleteService(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return res.json();
}
