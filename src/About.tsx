import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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

import handsImg from './assets/hands.png';
import porscheBehind from './assets/porsche-behind.jpg';
import mercedesG from './assets/mercedes-g.jpg';
import carmaxOldCars from './assets/carmax-old-cars.jpg';
import pointsGuyBoat from './assets/points-guy-boat.jpg';
import porscheRim from './assets/porsche-rim.jpg';

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
  { src: porscheBehind, alt: 'Inspiration 1' },
  { src: mercedesG, alt: 'Inspiration 2' },
  { src: carmaxOldCars, alt: 'Inspiration 3' },
  { src: pointsGuyBoat, alt: 'Inspiration 4' },
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

function MeetAndBrief() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollInView(ref);

  return (
    <div className="about__meet-brief" ref={ref}>
      <motion.div
        className="about__hands-image"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: isInView ? 0.2 : 0 }}
      >
        <img src={handsImg} alt="Two hands reaching toward each other" />
      </motion.div>
    </div>
  );
}

function InspirationCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollInView(ref, { enterAt: 0.1 });
  const [flipped, setFlipped] = useState<boolean[]>(new Array(inspirationCards.length).fill(false));

  const spread = 10;
  const last = inspirationCards.length - 1;

  useEffect(() => {
    if (!isInView) {
      setFlipped(new Array(inspirationCards.length).fill(false));
      return;
    }

    const timeouts: number[] = [];
    inspirationCards.forEach((_, index) => {
      const delay = (last - index) * 0.6;
      const flipTime = (delay + 0.3) * 1000;
      const id = window.setTimeout(() => {
        setFlipped(prev => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, flipTime);
      timeouts.push(id);
    });

    return () => timeouts.forEach(id => clearTimeout(id));
  }, [isInView, last]);

  return (
    <div className="about__inspiration" ref={ref}>
      <div className="about__cards-container">
        {inspirationCards.map((card, index) => {
          const startX = (index / last) * spread;
          const endX = startX + (79 - spread);
          const delay = (last - index) * 0.6;
          const zIndex = flipped[index] ? last - index : index;
          return (
            <motion.div
              key={index}
              className="about__card"
              style={{ zIndex }}
              initial={{ x: `${startX}vw` }}
              animate={
                isInView
                  ? { x: `${endX}vw` }
                  : { x: `${startX}vw` }
              }
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
                delay: isInView ? delay : 0,
              }}
            >
              <img src={card.src} alt={card.alt} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ColorSwatches() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollInView(ref);

  return (
    <div className="about__colors" ref={ref}>
      <div className="about__colors-container">
        {designColors.map((swatch, index) => (
          <div key={index} className="about__swatch-wrapper">
            <motion.div
              className="about__swatch"
              style={{ backgroundColor: swatch.color }}
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: isInView ? index * 0.2 : 0,
              }}
            />
            <motion.span
              className="about__swatch-hex"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: isInView ? index * 0.2 + 0.6 : 0 }}
            >
              {swatch.hex}
            </motion.span>
          </div>
        ))}
      </div>
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
    <div className="container">
      <div className="grid">
        <div className="col-24">
          <h2 className="about__main-title">PROCESS</h2>
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
          <InspirationCards />
        </div>
      </div>

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
  );
}

export default About;
