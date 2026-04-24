import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import './styles/history.scss';

import mercedesEmblem from './assets/mercedes-emblem.jpg';
import mercedesG from './assets/mercedes-g.jpg';
import mercedesWoods from './assets/mercedes-g-woods.jpg';
import mercedesOldCars from './assets/mercedes-old-cars.jpg';
import mercedesGrill from './assets/mercedes-grill.jpg';
import carmaxOldCars from './assets/carmax-old-cars.jpg';
import carmaxParkingLot from './assets/carmax-parking.jpg';
import porscheBehind from './assets/porsche-behind.jpg';
import porscheRim from './assets/porsche-rim.jpg';
import porscheWheel from './assets/porsche-steering-wheel.jpg';

type AnimationStage =
  | 'idle'
  | 'centering'
  | 'expanding'
  | 'contracting'
  | 'returning';

interface BrandImage {
  src: string;
  alt: string;
}

interface Project {
  name: string;
  languages: string[];
  image: BrandImage;
  slideShow: BrandImage[];
}

interface Brand {
  name: string;
  title?: string;
  projects: Project[];
}

const brands: Brand[] = [
  {
    name: 'Morgan Stanley',
    title: 'Sr_User_Interface_Engineer',
    projects: [
      {
        name: 'Project 1',
        languages: ['React', 'TypeScript'],
        image: { src: mercedesG, alt: 'Mercedes Vans' },
        slideShow: [
          { src: mercedesG, alt: 'Mercedes Vans' },
          { src: mercedesWoods, alt: 'Mercedes in the woods' },
          { src: mercedesGrill, alt: 'Mercedes Grill' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['Node.js', 'GraphQL'],
        image: { src: mercedesGrill, alt: 'Mercedes Grill' },
        slideShow: [
          { src: mercedesGrill, alt: 'Mercedes Grill' },
          { src: mercedesEmblem, alt: 'Mercedes Emblem' },
          { src: mercedesOldCars, alt: 'Mercedes Old' },
        ],
      },
      {
        name: 'Project 3',
        languages: ['Python'],
        image: { src: mercedesEmblem, alt: 'Mercedes Emblem' },
        slideShow: [
          { src: mercedesEmblem, alt: 'Mercedes Emblem' },
          { src: mercedesOldCars, alt: 'Mercedes Old' },
        ],
      },
    ],
  },
  {
    name: 'Talitrix',
    title: 'Sr_Software_Developer',
    projects: [
      {
        name: 'Project 1',
        languages: ['React', 'TypeScript'],
        image: { src: porscheBehind, alt: 'Porsche' },
        slideShow: [
          { src: porscheBehind, alt: 'Porsche' },
          { src: porscheRim, alt: 'Porsche' },
          { src: porscheWheel, alt: 'Porsche' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['Node.js'],
        image: { src: porscheRim, alt: 'Porsche' },
        slideShow: [
          { src: porscheRim, alt: 'Porsche' },
          { src: porscheWheel, alt: 'Porsche' },
        ],
      },
    ],
  },
  {
    name: 'Red Ventures',
    title: 'Sr_Software_Engineer',
    projects: [
      {
        name: 'Project 1',
        languages: ['React'],
        image: { src: carmaxOldCars, alt: 'CarMax' },
        slideShow: [
          { src: carmaxOldCars, alt: 'CarMax' },
          { src: carmaxParkingLot, alt: 'CarMax' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['Angular'],
        image: { src: carmaxParkingLot, alt: 'CarMax' },
        slideShow: [
          { src: carmaxParkingLot, alt: 'CarMax' },
          { src: carmaxOldCars, alt: 'CarMax' },
        ],
      },
    ],
  },
  {
    name: 'Porsche Digital',
    title: 'Sr_Software_Engineer',
    projects: [
      {
        name: 'Project 1',
        languages: ['React', 'TypeScript'],
        image: { src: carmaxOldCars, alt: 'CarMax' },
        slideShow: [
          { src: carmaxOldCars, alt: 'CarMax' },
          { src: carmaxParkingLot, alt: 'CarMax' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['Vue.js'],
        image: { src: carmaxParkingLot, alt: 'CarMax' },
        slideShow: [
          { src: carmaxParkingLot, alt: 'CarMax' },
          { src: carmaxOldCars, alt: 'CarMax' },
        ],
      },
    ],
  },
  {
    name: 'Captech Ventures',
    title: 'Manager_Frontend_Development',
    projects: [
      {
        name: 'Project 1',
        languages: ['Java', 'Spring'],
        image: { src: carmaxOldCars, alt: 'CarMax' },
        slideShow: [
          { src: carmaxOldCars, alt: 'CarMax' },
          { src: carmaxParkingLot, alt: 'CarMax' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['React'],
        image: { src: carmaxParkingLot, alt: 'CarMax' },
        slideShow: [
          { src: carmaxParkingLot, alt: 'CarMax' },
          { src: carmaxOldCars, alt: 'CarMax' },
        ],
      },
    ],
  },
  {
    name: 'Sapient Razorfish',
    title: 'Presentation_Layer_Engineer',
    projects: [
      {
        name: 'Project 1',
        languages: ['JavaScript'],
        image: { src: carmaxOldCars, alt: 'CarMax' },
        slideShow: [
          { src: carmaxOldCars, alt: 'CarMax' },
          { src: carmaxParkingLot, alt: 'CarMax' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['HTML', 'CSS'],
        image: { src: carmaxParkingLot, alt: 'CarMax' },
        slideShow: [
          { src: carmaxParkingLot, alt: 'CarMax' },
          { src: carmaxOldCars, alt: 'CarMax' },
        ],
      },
    ],
  },
  {
    name: 'Ogilvy& Mather',
    title: 'UI_Developer',
    projects: [
      {
        name: 'Project 1',
        languages: ['JavaScript', 'jQuery'],
        image: { src: carmaxOldCars, alt: 'CarMax' },
        slideShow: [
          { src: carmaxOldCars, alt: 'CarMax' },
          { src: carmaxParkingLot, alt: 'CarMax' },
        ],
      },
      {
        name: 'Project 2',
        languages: ['HTML', 'CSS'],
        image: { src: carmaxParkingLot, alt: 'CarMax' },
        slideShow: [
          { src: carmaxParkingLot, alt: 'CarMax' },
          { src: carmaxOldCars, alt: 'CarMax' },
        ],
      },
    ],
  },
];

const TIMING = {
  centeringDuration: 600,
  initialMaskDelayAfterClick: 3000,
  loopMaskDelay: 3000,
  maskTransitionDuration: 1200,
  backgroundDelayAfterMaskTransition: -800,
  backgroundTransitionDuration: 1000,
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomLetter = () => ALPHABET[Math.floor(Math.random() * 26)];

// --- Hooks ---

function useScrambleText(name: string) {
  const [isHovered, setIsHovered] = useState(false);
  const [letters, setLetters] = useState<string[]>(() => name.split(''));
  const timers = useRef<{
    intervals: Record<number, NodeJS.Timeout>;
    timeouts: NodeJS.Timeout[];
  }>({
    intervals: {},
    timeouts: [],
  });

  const setChar = useCallback((i: number, ch: string) => {
    setLetters((prev) => {
      const next = [...prev];
      next[i] = ch;
      return next;
    });
  }, []);

  useEffect(() => {
    const { intervals, timeouts } = timers.current;
    Object.values(intervals).forEach(clearInterval);
    timeouts.forEach(clearTimeout);
    timers.current = { intervals: {}, timeouts: [] };

    if (!isHovered) {
      setLetters(name.split(''));
      return;
    }

    const chars = name.split('');
    chars.forEach((ch, i) => {
      if (ch === ' ') return;
      timers.current.intervals[i] = setInterval(
        () => setChar(i, randomLetter()),
        120
      );
      timers.current.timeouts.push(
        setTimeout(
          () => {
            clearInterval(timers.current.intervals[i]);
            setChar(i, ch);
          },
          i * 100 + 300
        )
      );
    });

    return () => {
      Object.values(timers.current.intervals).forEach(clearInterval);
      timers.current.timeouts.forEach(clearTimeout);
    };
  }, [isHovered, name, setChar]);

  return { letters, isHovered, setIsHovered };
}

function useCharWidths(
  text: string,
  containerRef: React.RefObject<HTMLDivElement | null>,
  selector = 'h3'
) {
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    const measure = () => {
      const el = containerRef.current?.querySelector(selector);
      if (!el) return;
      const style = window.getComputedStyle(el);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      setWidths(
        text
          .split('')
          .map((c) =>
            c === ' ' ? 0 : Math.ceil(ctx.measureText(c.toUpperCase()).width)
          )
      );
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text, containerRef, selector]);

  return widths;
}

function useViewport(breakpoint = 1024) {
  const [isLarge, setIsLarge] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= breakpoint
  );
  useEffect(() => {
    const handler = () => setIsLarge(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isLarge;
}

// --- Components ---

function BrandTitle({
  title,
  isHovered,
  charWidths,
}: {
  title: string;
  isHovered: boolean;
  charWidths: number[];
}) {
  const [active, setActive] = useState(false);
  const [scrambledChars, setScrambledChars] = useState<string[]>([]);
  const timers = useRef<{
    intervals: Record<number, NodeJS.Timeout>;
    timeouts: NodeJS.Timeout[];
  }>({ intervals: {}, timeouts: [] });

  useEffect(() => {
    Object.values(timers.current.intervals).forEach(clearInterval);
    timers.current.timeouts.forEach(clearTimeout);
    timers.current = { intervals: {}, timeouts: [] };

    if (!isHovered) {
      setActive(false);
      setScrambledChars([]);
      return;
    }

    const chars = title.split('');
    setScrambledChars(chars.map((c) => (c === ' ' ? ' ' : randomLetter())));
    setActive(true);

    chars.forEach((ch, i) => {
      if (ch === ' ') return;
      timers.current.intervals[i] = setInterval(() => {
        setScrambledChars((prev) => {
          const next = [...prev];
          next[i] = randomLetter();
          return next;
        });
      }, 120);
      timers.current.timeouts.push(
        setTimeout(
          () => {
            clearInterval(timers.current.intervals[i]);
            setScrambledChars((prev) => {
              const next = [...prev];
              next[i] = ch;
              return next;
            });
          },
          i * 80 + 400
        )
      );
    });

    return () => {
      Object.values(timers.current.intervals).forEach(clearInterval);
      timers.current.timeouts.forEach(clearTimeout);
    };
  }, [isHovered, title, active]);

  return (
    <h4 style={active ? undefined : { opacity: 0, visibility: 'hidden' }}>
      {(active ? scrambledChars : title.split('')).map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width:
              ch === ' '
                ? '0.3em'
                : charWidths[i]
                  ? `${charWidths[i]}px`
                  : '0.55em',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {active ? (
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${ch}-${i}`}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ display: 'inline-block' }}
              >
                {ch}
              </motion.span>
            </AnimatePresence>
          ) : (
            ch
          )}
        </span>
      ))}
    </h4>
  );
}

function BrandName({
  letters,
  charWidths,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  letters: string[];
  charWidths: number[];
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const words = useMemo(() => {
    const result: { chars: string[]; startIndex: number }[] = [];
    let word: string[] = [];
    let start = 0;
    letters.forEach((ch, i) => {
      if (ch === ' ') {
        if (word.length) result.push({ chars: word, startIndex: start });
        word = [];
        start = i + 1;
      } else {
        word.push(ch);
      }
    });
    if (word.length) result.push({ chars: word, startIndex: start });
    return result;
  }, [letters]);

  return (
    <h3
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={
        onMouseEnter ? { cursor: 'pointer', pointerEvents: 'auto' } : undefined
      }
    >
      <span style={{ position: 'relative' }}>
        {words.map((w, wi) => (
          <span key={wi} style={{ display: 'block', whiteSpace: 'nowrap' }}>
            {w.chars.map((ch, ci) => {
              const gi = w.startIndex + ci;
              return (
                <span
                  key={ci}
                  style={{
                    display: 'inline-block',
                    width: charWidths[gi] ? `${charWidths[gi]}px` : '0.55em',
                    textAlign: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={`${ch}-${gi}`}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      style={{ display: 'inline-block', position: 'relative' }}
                    >
                      {ch}
                    </motion.span>
                  </AnimatePresence>
                </span>
              );
            })}
          </span>
        ))}
        {children}
      </span>
    </h3>
  );
}

function BrandSection({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
  const { letters, isHovered, setIsHovered } = useScrambleText(brand.name);
  const charWidths = useCharWidths(brand.name, ref);
  const titleCharWidths = useCharWidths(brand.title || '', ref, 'h4');
  const isLarge = useViewport();
  const isInView = useInView(ref, { once: false, amount: 0.8 });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animationStage, setAnimationStage] = useState<AnimationStage>('idle');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMasking, setIsMasking] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundIndex, setBackgroundIndex] = useState<number | null>(null);
  const [closingMaskImage, setClosingMaskImage] = useState<string | null>(null);

  const itemWidth = isLarge ? '10rem' : '5rem';
  const itemHeight = isLarge ? '35rem' : '18rem';
  const nameProps = {
    letters,
    charWidths,
  };

  // Selection lifecycle
  useEffect(() => {
    if (selectedIndex === null || !ref.current) {
      setAnimationStage('idle');
      setCurrentSlideIndex(0);
      setIsMasking(false);
      setClosingMaskImage(null);
      return;
    }
    setBackgroundIndex(selectedIndex);
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
    setAnimationStage('centering');
    const id = setTimeout(
      () => setAnimationStage('expanding'),
      TIMING.centeringDuration
    );
    return () => clearTimeout(id);
  }, [selectedIndex]);

  // Slideshow
  useEffect(() => {
    if (animationStage !== 'expanding' || selectedIndex === null) return;
    const slides = brand.projects[selectedIndex]?.slideShow;
    if (!slides) return;

    const ids: number[] = [];
    const queue = (fn: () => void, delay: number) =>
      ids.push(window.setTimeout(fn, delay));
    const maskDelay0 = Math.max(
      0,
      TIMING.initialMaskDelayAfterClick - TIMING.centeringDuration
    );
    const swapDelay =
      TIMING.maskTransitionDuration + TIMING.backgroundDelayAfterMaskTransition;

    const run = (delay: number, i: number) => {
      queue(() => {
        setCurrentSlideIndex(i);
        setIsMasking(true);
        queue(() => {
          setBackgroundImage(slides[i].src);
          queue(() => {
            setIsMasking(false);
            run(TIMING.loopMaskDelay, (i + 1) % slides.length);
          }, TIMING.backgroundTransitionDuration);
        }, swapDelay);
      }, delay);
    };

    run(maskDelay0, 0);
    return () => ids.forEach(clearTimeout);
  }, [animationStage, selectedIndex, brand.projects]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimationStage('contracting');
    setTimeout(() => {
      setAnimationStage('returning');
      setTimeout(() => setSelectedIndex(null), 600);
    }, 800);
  };

  const getAnimationState = (index: number) => {
    const baseRotation = -8;
    const rightOffsets = ['32%', '18%', '4%'];
    const rightOffsetNotInView = ['29%', '15%', '1%'];
    const rightOffset = rightOffsets[index] || '4%';
    const basePosition = {
      left: 'auto',
      right: rightOffset,
      y: '-50%',
      rotate: baseRotation,
      zIndex: 1,
    };

    if (selectedIndex === index) {
      const centered = {
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        rotate: 0,
        zIndex: 5,
      };

      switch (animationStage) {
        case 'centering':
          return centered;
        case 'expanding':
          return { ...centered, width: '100vw', height: '100vh' };
        case 'contracting':
          return { ...centered, width: itemWidth, height: itemHeight };
        case 'returning':
          return {
            ...basePosition,
            top: '50%',
            x: 0,
            width: itemWidth,
            height: itemHeight,
            opacity: 1,
            scale: 1,
          };
      }
    }

    if (selectedIndex !== null) {
      return {
        opacity: 0,
        scale: 0.8,
        y: '-50%',
        rotate: baseRotation,
        zIndex: 1,
      };
    }

    return {
      ...basePosition,
      opacity: 1,
      scale: 1,
      width: itemWidth,
      height: itemHeight,
      right: isInView ? rightOffset : rightOffsetNotInView[index] || '2%',
    };
  };

  const getTransitionDuration = () => {
    const durations: Record<AnimationStage, number> = {
      idle: 0.8,
      centering: 0.6,
      expanding: 0.8,
      contracting: 0.8,
      returning: 0.6,
    };
    return selectedIndex !== null ? durations[animationStage] : 0.8;
  };

  return (
    <motion.div className="history-list--brand" ref={ref}>
      {selectedIndex !== null && (
        <button onClick={handleClose} className="brand-close-button">
          ×
        </button>
      )}
      <BrandName
        {...nameProps}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {brand.title && (
          <BrandTitle
            title={brand.title}
            isHovered={isHovered}
            charWidths={titleCharWidths}
          />
        )}
      </BrandName>

      {selectedIndex !== null && isMasking && (() => {
        const maskImageUrl = closingMaskImage || brand.projects[selectedIndex].slideShow[currentSlideIndex]?.src;
        return (
          <h3 className="brand-mask-text">
            {brand.name.split(' ').map((word, wi) => (
              <span key={wi} style={{ display: 'block', whiteSpace: 'nowrap' }}>
                {word.split('').map((ch, ci) => {
                  const gi = brand.name.indexOf(word) + ci;
                  return (
                    <span
                      key={ci}
                      style={{
                        display: 'inline-block',
                        width: charWidths[gi] ? `${charWidths[gi]}px` : '0.55em',
                        textAlign: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundImage: `url(${maskImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </h3>
        );
      })()}

      {brand.projects.map((project, index) => (
        <div key={index}>
          <motion.a
            href="#"
            className="history-list--item"
            onClick={(e) => {
              e.preventDefault();
              setSelectedIndex(selectedIndex === index ? null : index);
            }}
            style={{
              backgroundImage:
                backgroundImage && backgroundIndex === index
                  ? `url(${backgroundImage})`
                  : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={false}
            animate={getAnimationState(index)}
            transition={{
              duration: getTransitionDuration(),
              ease: [0.4, 0, 0.2, 1],
              delay: selectedIndex !== null ? 0 : index * 0.1,
            }}
            whileHover={
              selectedIndex === null
                ? { scale: 1.05, transition: { duration: 0.3 } }
                : {}
            }
          >
            <motion.img
              src={project.image.src}
              alt={project.image.alt}
              animate={{
                opacity: backgroundImage && backgroundIndex === index ? 0 : 1,
              }}
              transition={{
                duration:
                  animationStage === 'contracting' ||
                  animationStage === 'returning'
                    ? 0.3
                    : 1,
              }}
            />
          </motion.a>
          <h3>
            {brand.name.split(' ').map((word, wi) => (
              <span key={wi} style={{ display: 'block', whiteSpace: 'nowrap' }}>
                {word.split('').map((ch, ci) => {
                  const gi = brand.name.indexOf(word) + ci;
                  return (
                    <span
                      key={ci}
                      style={{
                        display: 'inline-block',
                        width: charWidths[gi] ? `${charWidths[gi]}px` : '0.55em',
                        textAlign: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </h3>
        </div>
      ))}
    </motion.div>
  );
}

function History() {
  return (
    <section className="container history">
      <h2 className="my-2 ml-2">
        {'CLIENTS'.split('').map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </h2>
      <div className="history-list">
        {brands.map((brand) => (
          <BrandSection key={brand.name} brand={brand} />
        ))}
      </div>
    </section>
  );
}

export default History;
