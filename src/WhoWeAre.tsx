import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useMemo } from 'react';
import './styles/who-we-are.scss';

import whoweareGreen from './assets/whoweare-green.jpg';
import whoweareKeyboard from './assets/whoweare-keyboard.jpg';
import whoweareOffice from './assets/whoweare-office.jpg';

const words = ['Dreamers', 'Builders', 'Creators', 'Makers'];

const imageSources = [whoweareGreen, whoweareKeyboard, whoweareOffice];

const imagePositions: React.CSSProperties[] = [
  { top: '5%', right: '4%', width: '30vw', maxWidth: '450px' },
  { bottom: '8%', left: '3%', width: '28vw', maxWidth: '400px' },
  { top: '40%', right: '12%', width: '32vw', maxWidth: '480px' },
];

const SCROLL_START = 0.02;
const SCROLL_END = 0.98;
const REVEAL_RATIO = 0.6;

function RevealImage({
  src,
  scrollYProgress,
  segStart,
  segEnd,
  style,
}: {
  src: string;
  scrollYProgress: MotionValue<number>;
  segStart: number;
  segEnd: number;
  style: React.CSSProperties;
}) {
  const revealEnd = segStart + (segEnd - segStart) * REVEAL_RATIO;

  const clipPath = useTransform(scrollYProgress, (latest) => {
    if (latest <= segStart) return 'inset(0 0 100% 0)';

    if (latest <= revealEnd) {
      const progress = (latest - segStart) / (revealEnd - segStart);
      return `inset(0 0 ${100 - progress * 100}% 0)`;
    }

    if (latest <= segEnd) {
      const progress = (latest - revealEnd) / (segEnd - revealEnd);
      return `inset(0 0 ${progress * 100}% 0)`;
    }

    return 'inset(0 0 100% 0)';
  });

  return (
    <motion.img
      src={src}
      className="who-we-are__image"
      style={{ ...style, clipPath }}
    />
  );
}

function ScrollWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const scrollingCount = total - 1;

  const segmentStart = index === 0 ? 0 : (index - 1) / scrollingCount;
  const segmentEnd = index === 0 ? 0 : index / scrollingCount;

  const nextSegmentStart = index === 0 ? 0 : segmentEnd;
  const nextSegmentEnd =
    index >= total - 1
      ? 1
      : index === 0
        ? 1 / scrollingCount
        : (index + 1) / scrollingCount;

  const y = useTransform(scrollYProgress, (latest) => {
    if (index === 0) return 0;
    if (latest <= segmentStart) return window.innerHeight;
    if (latest >= segmentEnd) return 0;
    const ratio = (latest - segmentStart) / (segmentEnd - segmentStart);
    return window.innerHeight * (1 - ratio);
  });

  const clipPath = useTransform(scrollYProgress, (latest) => {
    if (index >= total - 1) return 'inset(0 0 0 0)';

    const height = ref.current?.offsetHeight ?? 0;
    if (height === 0) return 'inset(0 0 0 0)';

    let nextY = window.innerHeight;
    if (latest > nextSegmentStart && latest < nextSegmentEnd) {
      const nextRatio =
        (latest - nextSegmentStart) / (nextSegmentEnd - nextSegmentStart);
      nextY = window.innerHeight * (1 - nextRatio);
    } else if (latest >= nextSegmentEnd) {
      nextY = 0;
    }

    if (nextY >= height) return 'inset(0 0 0 0)';
    if (nextY <= 0) return 'inset(0 0 100% 0)';
    const maskPercent = ((height - nextY) / height) * 100;
    return `inset(0 0 ${maskPercent}% 0)`;
  });

  return (
    <motion.span ref={ref} className="who-we-are__word" style={{ y, clipPath }}>
      {word}
    </motion.span>
  );
}

function WhoWeAre() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const shuffledImages = useMemo(() => {
    const indices = imageSources.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const segmentSize = (SCROLL_END - SCROLL_START) / imageSources.length;
    return indices.map((imgIdx, slotIdx) => ({
      src: imageSources[imgIdx],
      style: imagePositions[slotIdx],
      segStart: SCROLL_START + slotIdx * segmentSize,
      segEnd: SCROLL_START + (slotIdx + 1) * segmentSize,
    }));
  }, []);

  return (
    <div className="who-we-are-wrapper" ref={wrapperRef}>
      <section className="container who-we-are">
        <h2>Who We Are</h2>
        {shuffledImages.map((img, i) => (
          <RevealImage
            key={i}
            src={img.src}
            scrollYProgress={scrollYProgress}
            segStart={img.segStart}
            segEnd={img.segEnd}
            style={img.style}
          />
        ))}
        <div className="who-we-are__words">
          {words.map((word, index) => (
            <ScrollWord
              key={index}
              word={word}
              index={index}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WhoWeAre;
