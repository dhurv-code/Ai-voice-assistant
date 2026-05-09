import { motion } from 'framer-motion'
import { buttonPulse } from '../animations/motionPresets'

export default function NeonButton({ children, className = '', ...props }) {
  return (
    <motion.button
      type="submit"
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-sky-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-[0_24px_80px_rgba(59,130,246,0.22)] transition-all duration-300 ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap="active"
      variants={buttonPulse}
      {...props}
    >
      {children}
    </motion.button>
  )
}
