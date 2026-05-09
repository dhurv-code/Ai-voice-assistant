import { motion } from 'framer-motion'
import { pageFade } from '../animations/motionPresets'

export default function AuthCard({ title, subtitle, children }) {
  return (
    <motion.div
      className="glass-panel max-w-xl rounded-[2rem] border-white/10 p-8 shadow-[0_30px_100px_rgba(2,7,23,0.45)]"
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="mb-8 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80">Aurora companion</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  )
}
