import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthCard from '../components/AuthCard'
import NeonButton from '../components/NeonButton'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(form)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-10 text-white sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_20%)]" />
      <div className="relative z-10 w-full max-w-xl">
        <AuthCard
          title="Welcome back"
          subtitle="Sign in to continue the voice-first companion experience. Speak naturally and feel heard."
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-300/70 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-300/70 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            {error ? (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <NeonButton className="w-full justify-center" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </NeonButton>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New around here?{' '}
            <Link to="/register" className="font-semibold text-sky-300 hover:text-sky-200">
              Create an account
            </Link>
          </p>
        </AuthCard>
      </div>
    </main>
  )
}
