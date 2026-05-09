import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthCard from '../components/AuthCard'
import NeonButton from '../components/NeonButton'

export default function Register() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      await signup(form)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-10 text-white sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_20%),radial-gradient(circle_at_bottom_left,_rgba(244,114,182,0.16),_transparent_18%)]" />
      <div className="relative z-10 w-full max-w-xl">
        <AuthCard
          title="Create your companion"
          subtitle="Build your emotional AI presence with a secure voice-first login. Your friend will remember you instantly."
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Your name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-300/70 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-300/70 focus:ring-2 focus:ring-purple-400/20"
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
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-300/70 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>

            {error ? (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <NeonButton className="w-full justify-center" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </NeonButton>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-sky-300 hover:text-sky-200">
              Sign in
            </Link>
          </p>
        </AuthCard>
      </div>
    </main>
  )
}
