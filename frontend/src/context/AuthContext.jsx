import { createContext, useContext, useEffect, useState } from 'react'
import { login as loginApi, signup as signupApi } from '../services/authService'
import { clearAuth, getAuth, saveAuth } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = getAuth()
    if (stored) {
      setToken(stored.token)
      setUser(stored.user)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const data = await loginApi(credentials)
    setToken(data.token)
    setUser(data.user || { email: credentials.email })
    saveAuth(data.token, data.user || { email: credentials.email })
    return data
  }

  const signup = async (details) => {
    const data = await signupApi(details)
    setToken(data.token)
    setUser(data.user || { name: details.name, email: details.email })
    saveAuth(data.token, data.user || { name: details.name, email: details.email })
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    clearAuth()
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
