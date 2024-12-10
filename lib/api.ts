import { getToken } from './auth'

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = getToken()
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  }
  const response = await fetch(url, { ...options, headers })
  if (response.status === 401) {
    // Token inválido o expirado, redirigir al login
    window.location.href = '/pages/login'
  }
  return response
}

export async function offerService(serviceTitle: string, serviceDescription: string) {
  return authenticatedFetch('/api/user/offer-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceTitle, serviceDescription })
  });
}

export async function searchServices(term: string) {
  return authenticatedFetch(`/api/user/search-services?term=${encodeURIComponent(term)}`);
}

export async function requestService(serviceId: number) {
  return authenticatedFetch('/api/user/request-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceId })
  });
}

export async function rateService(serviceId: number, rating: number) {
  return authenticatedFetch('/api/user/rate-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceId, rating })
  });
}

export async function scheduleService(serviceId: number, date: Date, duration: number) {
  return authenticatedFetch('/api/user/schedule-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceId, date, duration })
  });
}

