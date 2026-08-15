// DocBot Dashboard API Client — Single source of truth for backend calls

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://docbot-quag.onrender.com').replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function fetchDashboardSummary() {
  return request('/admin/dashboard/summary');
}

export async function fetchConversations() {
  return request('/admin/conversations');
}

export async function fetchConversationMessages(patientId) {
  return request(`/admin/conversations/${encodeURIComponent(patientId)}/messages`);
}

export async function fetchCalendarMonth(monthStr) {
  return request(`/admin/calendar?month=${encodeURIComponent(monthStr)}`);
}

export async function fetchAppointments(statusFilter = '') {
  const query = statusFilter ? `?status_filter=${encodeURIComponent(statusFilter)}` : '';
  return request(`/admin/appointments${query}`);
}

export async function cancelAppointment(id, notifyPatient = true) {
  return request(`/admin/appointments/${encodeURIComponent(id)}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ notify_patient: notifyPatient }),
  });
}

export async function createPatient(name, phoneNumber) {
  return request('/admin/patients', {
    method: 'POST',
    body: JSON.stringify({ name, phone_number: phoneNumber }),
  });
}

export async function createAppointment(patientId, serviceType, startTimeIso) {
  return request('/admin/appointments', {
    method: 'POST',
    body: JSON.stringify({
      patient_id: patientId,
      service_type: serviceType,
      start_time: startTimeIso,
    }),
  });
}

export async function createCustomer(phoneNumber, name = null) {
  return request('/admin/customers', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phoneNumber, name }),
  });
}

export async function sendPatientMessage(patientId, body) {
  return request(`/admin/conversations/${encodeURIComponent(patientId)}/messages`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
}



