import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useVoiceInteraction } from '../hooks/useVoiceInteraction'
import AiOrb from '../components/AiOrb'
import AnimatedWaves from '../components/AnimatedWaves'
import GlassPanel from '../components/GlassPanel'
import NeonButton from '../components/NeonButton'
import { pageFade } from '../animations/motionPresets'

const statusMessage = {
  idle: 'Ready to listen whenever you are.',
  listening: 'Listening... Speak naturally in Hindi or English.',
  thinking: 'Thinking through your words.',
  speaking: 'Speaking back with warmth.',
}

export default function Home() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const { status, error, startVoiceSession, isActive } = useVoiceInteraction()

  const handleMicClick = () => {
    if (!token) {
      navigate('/login')
      return
    }
    startVoiceSession()
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.22),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.8),rgba(5,7,12,0.9))]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-slate-400/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300/90 backdrop-blur-xl">
              AI Companion
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            {token ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-slate-100 font-medium">Hi, {user?.name || user?.email || 'friend'}</span>
                  <button
                    onClick={() => logout()}
                    className="rounded-full border border-slate-500/40 px-4 py-2 text-slate-300 transition hover:border-red-300/50 hover:text-red-200"
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="rounded-full border border-slate-500/40 px-4 py-2 text-slate-300 transition hover:border-sky-300/50 hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-full border border-slate-500/40 px-4 py-2 text-slate-300 transition hover:border-purple-300/60 hover:text-white"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </header>

        <motion.section
          className="relative flex min-h-[72vh] flex-col items-center justify-center gap-8 rounded-[2rem] border border-white/10 bg-slate-950/40 px-6 py-12 shadow-[0_40px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
          variants={pageFade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] opacity-70">
            <div className="pointer-events-none absolute left-20 top-10 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="pointer-events-none absolute right-16 top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80">Emotional voice companion</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your AI Friend is Always Here
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Talk naturally in Hindi or English. The companion listens, thinks, and responds with warmth — no chat bubbles needed.
            </p>
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <div className="relative flex items-center justify-center">
              <AiOrb active={isActive} />
              <div className="absolute inset-x-0 top-[15%] mx-auto h-24 w-24 rounded-full bg-white/5 blur-2xl" />
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleMicClick}
                className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-slate-900/95 to-slate-950/95 text-white shadow-[0_0_90px_rgba(124,58,237,0.38)] transition-transform duration-300 hover:scale-105 focus:outline-none"
              >
                <span className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl" />
                <span className="absolute inset-0 rounded-full border border-white/10" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-sky-400 p-1 shadow-[0_20px_80px_rgba(59,130,246,0.32)]">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-slate-950/95 shadow-[inset_0_0_20px_rgba(0,0,0,0.28)]">
                    {status === 'speaking' ? (
                      <AnimatedWaves />
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-10 w-10 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]">
                        <path d="M12 3C8.69 3 6 5.69 6 9v5c0 3.31 2.69 6 6 6s6-2.69 6-6V9c0-3.31-2.69-6-6-6zm2.5 11.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5V9c0-1.38 1.12-2.5 2.5-2.5S14.5 7.62 14.5 9v5.5z" fill="currentColor" />
                      </svg>
                    )}
                  </span>
                </span>
              </button>

              <div className="flex flex-col items-center gap-2 text-center text-sm text-slate-300">
                <span className="text-slate-100 text-lg font-semibold">{statusMessage[status]}</span>
                {error ? <span className="rounded-full bg-red-500/10 px-4 py-2 text-red-200">{error}</span> : null}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 px-4 py-2 bg-white/5">Ambient listening ring</span>
            <span className="rounded-full border border-white/10 px-4 py-2 bg-white/5">Emotional response flow</span>
            <span className="rounded-full border border-white/10 px-4 py-2 bg-white/5">Voice first experience</span>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
