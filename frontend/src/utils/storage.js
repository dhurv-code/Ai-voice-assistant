export const AUTH_TOKEN_KEY = 'aiFriendAuthToken'
export const AUTH_USER_KEY = 'aiFriendProfile'

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function getAuth() {
  const token = getToken()
  const rawUser = localStorage.getItem(AUTH_USER_KEY)
  const user = rawUser ? JSON.parse(rawUser) : null
  return token ? { token, user } : null
}

export function saveAuth(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user || {}))
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
}
