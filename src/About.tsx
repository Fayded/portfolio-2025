import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

function useScrollInView(
  ref: React.RefObject<HTMLElement | null>,
  { enterAt = 0.15, reverseAt = 0.8 } = {}
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const [isInView, setIsInView] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setIsInView(progress > enterAt && progress < reverseAt);
  });

  return isInView;
}
import './styles/about.scss';

import handshakeData from './assets/handshake.json';

import designInspiration1 from './assets/design-inspiration-1.png';
import designInspiration2 from './assets/design-inspiration-2.png';
import designInspiration3 from './assets/design-inspiration-3.png';
import designInspiration5 from './assets/design-inspiration-5.png';


interface ProcessSection {
  number: string;
  subtitle: string;
  title: string;
  description: string;
}

const sections: ProcessSection[] = [
  {
    number: 'ONE / UNO / UN',
    subtitle: 'MEET AND BRIEF',
    title: 'MEET AND\nBRIEF',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, purus sed luctus gravida, arcu elit sodales turpis, eu auctor augue libero sed purus. Fusce dapibus.',
  },
  {
    number: 'TWO / DEUS / DEUX',
    subtitle: 'DESIGN INSPIRATION',
    title: 'DESIGN\nINSPIRATION',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, purus sed luctus gravida, arcu elit sodales turpis, eu auctor augue libero sed purus. Fusce dapibus.',
  },
  {
    number: 'THREE / TRES / TOIS',
    subtitle: 'DESIGN(S)',
    title: 'DESIGN(S)',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, purus sed luctus gravida, arcu elit sodales turpis, eu auctor augue libero sed purus. Fusce dapibus.',
  },
  {
    number: 'FOUR / CUATRO / QUATRE',
    subtitle: 'DEVELOPMENT',
    title: 'DEVELOPMENT',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, purus sed luctus gravida, arcu elit sodales turpis, eu auctor augue libero sed purus. Fusce dapibus.',
  },
  {
    number: 'FIVE / CINCO / CINQ',
    subtitle: 'DELIVER',
    title: 'DELIVER',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, purus sed luctus gravida, arcu elit sodales turpis, eu auctor augue libero sed purus. Fusce dapibus.',
  },
];

const inspirationCards = [
  { src: designInspiration1, alt: 'Inspiration 1' },
  { src: designInspiration3, alt: 'Inspiration 3' },
  { src: designInspiration2, alt: 'Inspiration 2' },
  { src: designInspiration5, alt: 'Inspiration 5' },
];

const designColors = [
  { hex: '#1C1C2E', color: '#1C1C2E' },
  { hex: '#D82D7E', color: '#D82D7E' },
  { hex: '#CC9DE1', color: '#CC9DE1' },
  { hex: '#3052B2', color: '#3052B2' },
  { hex: '#E8D5F5', color: '#E8D5F5' },
];

const terminalLines = [
  { time: '7:08:58 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx' },
  { time: '8:03:07 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx (x2)' },
  { time: '4:18:48 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx (x3)' },
  { time: '8:19:25 PM', type: 'info', action: 'hot update', file: '/src/styles/contact.scss' },
  { time: '8:19:35 PM', type: 'info', action: 'hot update', file: '/src/styles/work.scss' },
  { time: '8:19:47 PM', type: 'info', action: 'hot update', file: '/src/styles/work.scss (x2)' },
  { time: '8:19:57 PM', type: 'info', action: 'hot update', file: '/src/styles/work.scss (x3)' },
  { time: '8:20:38 PM', type: 'info', action: 'hot update', file: '/src/styles/who-we-are.scss' },
  { time: '8:22:05 PM', type: 'info', action: 'hot update', file: '/src/styles/who-we-are.scss' },
  { time: '8:21:17 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx' },
  { time: '7:08:58 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx' },
  { time: '8:03:07 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx (x2)' },
  { time: '4:18:48 PM', type: 'info', action: 'hot update', file: '/src/Work.tsx (x3)' },
  { time: '8:19:25 PM', type: 'info', action: 'hot update', file: '/src/styles/contact.scss' },
  { time: '8:19:35 PM', type: 'info', action: 'hot update', file: '/src/styles/work.scss' },
];

function SectionHeader({ section }: { section: ProcessSection }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollInView(ref);

  return (
    <motion.div
      ref={ref}
      className="about__section-header"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="about__section-header-left">
        <span className="about__section-number">{section.number}</span>
        <h3 className="about__section-title">{section.title}</h3>
      </div>
      <div className="about__section-header-right">
        <p className="about__section-description">{section.description}</p>
      </div>
    </motion.div>
  );
}

interface HandshakeShape {
  type: number;
  data: number[];
  color: number[];
  score?: number;
}

const handshakeShapes = (handshakeData as HandshakeShape[]).filter((s) => s.type === 4);
const handshakeBg = (handshakeData as HandshakeShape[]).find((s) => s.type === 0)!;
const canvasW = handshakeBg.data[2];
const canvasH = handshakeBg.data[3];

function MeetAndBrief() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [visibleCount, setVisibleCount] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const drawStart = 0.3;
    const drawEnd = 0.5;
    if (progress < drawStart) {
      setVisibleCount(0);
    } else if (progress >= drawEnd) {
      setVisibleCount(handshakeShapes.length);
    } else {
      const t = (progress - drawStart) / (drawEnd - drawStart);
      const eased = t * t * t;
      setVisibleCount(Math.round(eased * handshakeShapes.length));
    }
  });

  return (
    <div className="about__meet-brief" ref={ref}>
      <svg
        className="about__handshake-svg"
        viewBox={`0 80 ${canvasW} ${canvasH - 160}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          width={canvasW}
          height={canvasH}
          fill="#4B71D8"
        />
        {handshakeShapes.slice(0, visibleCount).map((shape, i) => {
          const [tx, ty, sx, sy, rot] = shape.data;
          const [r, g, b, a] = shape.color;
          return (
            <g key={i} transform={`translate(${tx} ${ty}) rotate(${rot}) scale(${sx} ${sy})`}>
              <ellipse cx="0" cy="0" rx="1" ry="1" fill={`rgb(${r},${g},${b})`} fillOpacity={a / 255} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function InspirationCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const spread = 10;

  return (
    <div className="about__inspiration-section" ref={ref}>
      <div className="about__cards-container">
        {inspirationCards.map((card, index) => (
          <InspirationCard
            key={index}
            card={card}
            index={index}
            total={inspirationCards.length}
            spread={spread}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function InspirationCard({
  card,
  index,
  total,
  spread,
  scrollProgress,
}: {
  card: { src: string; alt: string };
  index: number;
  total: number;
  spread: number;
  scrollProgress: MotionValue<number>;
}) {
  const last = total - 1;
  const startX = (index / last) * spread;
  const endX = startX + (79 - spread);

  const animStart = 0.1 + (last - index) * 0.1;
  const animEnd = animStart + 0.2;

  const x = useTransform(
    scrollProgress,
    [animStart, animEnd],
    [`${startX}vw`, `${endX}vw`]
  );

  const flipPoint = animStart + (animEnd - animStart) * 0.5;
  const [flipped, setFlipped] = useState(false);
  useMotionValueEvent(scrollProgress, 'change', (progress) => {
    setFlipped(progress >= flipPoint);
  });

  const zIndex = flipped ? last - index : index;

  return (
    <motion.div
      className="about__card"
      style={{ x, zIndex }}
    >
      <img src={card.src} alt={card.alt} />
    </motion.div>
  );
}

function ColorSwatches() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="about__colors" ref={ref}>
      <div className="about__colors-container">
        {designColors.map((swatch, index) => (
          <ColorSwatch
            key={index}
            swatch={swatch}
            index={index}
            total={designColors.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({
  swatch,
  index,
  total,
  scrollProgress,
}: {
  swatch: { hex: string; color: string };
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
}) {
  const animStart = 0.1 + index * (0.3 / total);
  const animEnd = animStart + 0.2;
  const height = useTransform(scrollProgress, [animStart, animEnd], ['0%', '100%']);
  const opacity = useTransform(scrollProgress, [animEnd - 0.05, animEnd], [0, 1]);

  return (
    <div className="about__swatch-wrapper">
      <motion.div
        className="about__swatch"
        style={{ backgroundColor: swatch.color, height }}
      />
      <motion.span
        className="about__swatch-hex"
        style={{ opacity }}
      >
        {swatch.hex}
      </motion.span>
    </div>
  );
}

function TerminalPane({
  lines,
  isInView,
  startDelay = 0,
}: {
  lines: (typeof terminalLines)[number][];
  isInView: boolean;
  startDelay?: number;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState<number>(0);

  const formatLine = useCallback((line: (typeof terminalLines)[0]) => {
    return `KEVFAY > ${line.time} [vite] (client) ${line.action} ${line.file}`;
  }, []);

  useEffect(() => {
    if (!isInView) {
      setVisibleLines(0);
      setCurrentChar(0);
      return;
    }

    const totalLines = lines.length;
    let lineIndex = 0;
    let charIndex = 0;

    const startTyping = () => {
      const intervalId = window.setInterval(() => {
        if (lineIndex >= totalLines) {
          lineIndex = 0;
          charIndex = 0;
          setVisibleLines(0);
          setCurrentChar(0);
        }

        const currentLine = formatLine(lines[lineIndex]);

        if (charIndex < currentLine.length) {
          charIndex++;
          setCurrentChar(charIndex);
        } else {
          lineIndex++;
          charIndex = 0;
          setVisibleLines(lineIndex);
          setCurrentChar(0);
        }
      }, 12);

      return intervalId;
    };

    const delayId = window.setTimeout(() => {
      const intervalId = startTyping();
      cleanupRef.current = () => {
        clearInterval(intervalId);
      };
    }, startDelay);

    const cleanupRef = { current: () => {} };

    return () => {
      clearTimeout(delayId);
      cleanupRef.current();
    };
  }, [isInView, formatLine, lines, startDelay]);

  const currentFullLine =
    visibleLines < lines.length ? formatLine(lines[visibleLines]) : '';

  return (
    <div className="about__terminal-pane">
      {lines.slice(0, visibleLines).map((line, index) => (
        <div key={index} className="about__terminal-line">
          <span className="about__terminal-user">KEVFAY &gt;</span>{' '}
          <span className="about__terminal-time">{line.time}</span>{' '}
          <span className="about__terminal-vite">[vite]</span>{' '}
          <span className="about__terminal-client">(client)</span>{' '}
          <span className="about__terminal-action">{line.action}</span>{' '}
          <span className="about__terminal-file">{line.file}</span>
        </div>
      ))}
      {visibleLines < lines.length && (
        <div className="about__terminal-line about__terminal-line--typing">
          <span>{currentFullLine.slice(0, currentChar)}</span>
          <span className="about__terminal-cursor">|</span>
        </div>
      )}
    </div>
  );
}

function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollInView(ref);

  const leftLines = terminalLines.slice(0, 8);
  const rightLines = terminalLines.slice(7);

  return (
    <div className="about__terminal-wrapper" ref={ref}>
      <motion.div
        className="about__terminal"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="about__terminal-body">
          <TerminalPane lines={leftLines} isInView={isInView} />
        </div>
      </motion.div>
      <motion.div
        className="about__terminal"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      >
        <div className="about__terminal-body">
          <TerminalPane
            lines={rightLines}
            isInView={isInView}
            startDelay={400}
          />
        </div>
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="col-24">
            <h2 className="heading">
              <span>P</span><span>R</span><span>O</span><span>C</span><span>E</span><span>S</span><span>S</span>
            </h2>
          </div>
        </div>
        <div className="grid about__section">
          <div className="col-24">
            <SectionHeader section={sections[0]} />
            <MeetAndBrief />
          </div>
        </div>

        <div className="grid about__section">
          <div className="col-24">
            <SectionHeader section={sections[1]} />
          </div>
        </div>
      </div>

      <InspirationCards />

      <div className="container">
        <div className="grid about__section">
          <div className="col-24">
            <SectionHeader section={sections[2]} />
            <ColorSwatches />
          </div>
        </div>

        <div className="grid about__section">
          <div className="col-24">
            <SectionHeader section={sections[3]} />
            <TerminalWindow />
          </div>
        </div>

        <div className="grid about__section">
          <div className="col-24">
            <SectionHeader section={sections[4]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
