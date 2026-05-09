import { motion } from 'framer-motion'

const ringClasses = [
  'absolute inset-0 rounded-full border border-purple-300/10',
  'absolute inset-4 rounded-full border border-blue-300/10',
  'absolute inset-8 rounded-full border border-white/5',
]

export default function AiOrb({ active = false }) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.14),_transparent_45%)] blur-2xl" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_35%)] opacity-80" />
      {ringClasses.map((className, index) => (
        <div
          key={index}
          className={`${className} ${index === 0 ? 'animate-pulse' : index === 1 ? 'animate-[drift-slow_12s_ease-in-out_infinite]' : 'opacity-50'}`}
        />
      ))}
      <motion.div
        className={`relative flex h-28 w-28 items-center justify-center rounded-full bg-slate-950/95 shadow-[0_0_90px_rgba(124,58,237,0.42)] ring-2 ring-white/10 ${active ? 'scale-105' : 'scale-100'}`}
        animate={{ scale: active ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full bg-white/5 blur-sm" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/70 to-blue-400/70 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
          <div className="h-8 w-8 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
        </div>
      </motion.div>
    </div>
  )
}
