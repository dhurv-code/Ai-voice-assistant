import api from './api'

export async function login(credentials) {

  const response = await api.post(
    '/login',
    credentials
  )

  localStorage.setItem(
    "token",
    response.data.access_token
  )

  return response.data
}

export async function signup(details) {

  const response = await api.post(
    '/signup',
    details
  )

  return response.data
}