export const pageFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease: 'easeInOut' } },
}

export const floatIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const buttonPulse = {
  rest: { scale: 1, boxShadow: '0 0 0 rgba(124, 58, 237, 0.35)' },
  hover: { scale: 1.02, boxShadow: '0 0 36px rgba(124, 58, 237, 0.45)' },
  active: { scale: 0.96 },
}
