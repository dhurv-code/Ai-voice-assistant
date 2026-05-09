import { motion } from 'framer-motion'

export default function AnimatedWaves() {
  const barVariants = {
    animate: (custom) => ({
      height: ['40%', '100%', '40%'],
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-blue-400 shadow-[0_0_20px_rgba(124,58,237,0.6)]"
          style={{ height: '60px' }}
          custom={i}
          variants={barVariants}
          animate="animate"
        />
      ))}
    </div>
  )
}
