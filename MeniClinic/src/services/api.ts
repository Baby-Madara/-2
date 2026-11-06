import type { ClinicSettings, Patient, Transaction } from '../types';

export interface BootstrapResponse {
  provider: 'cloudflare-d1' | 'node-backend' | string;
  settings: ClinicSettings | null;
  patients: Patient[];
  transactions: Transaction[];
}

// In production on medestra.me or local dev, point directly to the Cloudflare Pages D1 backend.
// When served directly on shifaa-clinic-crm.pages.dev, use relative '/api'.
const API_BASE =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'shifaa-clinic-crm.pages.dev' ||
    window.location.hostname.endsWith('.shifaa-clinic-crm.pages.dev'))
    ? '/api'
    : 'https://shifaa-clinic-crm.pages.dev/api';

async function safeFetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function apiFetchBootstrap(): Promise<BootstrapResponse | null> {
  return safeFetchJson<BootstrapResponse>(`${API_BASE}/bootstrap`, {
    method: 'GET',
  });
}

export async function apiSaveSettings(
  settings: ClinicSettings
): Promise<{ ok: boolean; settings: ClinicSettings | null } | null> {
  return safeFetchJson(`${API_BASE}/settings`, {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export async function apiCreatePatient(
  patient: Patient
): Promise<{ ok: boolean; patient: Patient | null } | null> {
  return safeFetchJson(`${API_BASE}/patients`, {
    method: 'POST',
    body: JSON.stringify(patient),
  });
}

export async function apiUpdatePatient(
  patientId: string,
  updates: Partial<Patient>
): Promise<{ ok: boolean; patient: Patient | null } | null> {
  return safeFetchJson(`${API_BASE}/patients/${encodeURIComponent(patientId)}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function apiCreateTransaction(
  transaction: Transaction
): Promise<{ ok: boolean; transaction: Transaction | null } | null> {
  return safeFetchJson(`${API_BASE}/transactions`, {
    method: 'POST',
    body: JSON.stringify(transaction),
  });
}

export async function apiUpdateTransaction(
  txId: string,
  updates: Partial<Transaction>
): Promise<{ ok: boolean; transaction: Transaction | null } | null> {
  return safeFetchJson(`${API_BASE}/transactions/${encodeURIComponent(txId)}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function apiSeedDatabase(payload: {
  settings?: ClinicSettings;
  patients: Patient[];
  transactions: Transaction[];
}): Promise<{ ok: boolean } | null> {
  return safeFetchJson(`${API_BASE}/seed`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
