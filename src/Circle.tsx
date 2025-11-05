import { useTransform, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';

interface CircleProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

function Circle({ targetRef }: CircleProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const circleX = useTransform(scrollYProgress, [0, 1], ['100vw', '0vw']);
  const circleY = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);
  const circleScale = useTransform(scrollYProgress, [0, 1], [1, 10]);
  const circleOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 0.4, 0]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        width: '1000px',
        height: '1000px',
        borderRadius: '50%',
        background: '#E1FF69',
        x: circleX,
        y: circleY,
        scale: circleScale,
        opacity: circleOpacity,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
}
export default Circle;
