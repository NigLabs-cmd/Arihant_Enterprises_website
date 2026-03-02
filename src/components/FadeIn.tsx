'use client';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export default function FadeIn({ children, delay = 0, direction = 'up', className }: FadeInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === 'up' ? 32 : 0,
        x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
