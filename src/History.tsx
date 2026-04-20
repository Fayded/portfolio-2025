import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
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
    title: 'Senior Software Engineer',
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
    title: 'Software Engineer',
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
    title: 'Software Engineer',
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
    title: 'Software Engineer',
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
    title: 'Software Engineer',
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
    name: 'Razorfish',
    title: 'Software Engineer',
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
    name: 'Ogilvy & Mather',
    title: 'UI Developer',
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
  {
    name: 'Definition6',
    title: 'UI Developer',
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
        languages: ['Flash', 'ActionScript'],
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

function History() {
  const title = 'CLIENTS';

  return (
    <section className="container work">
      <h2 className="my-2 ml-2">
        {title.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h2>
      <div className="work-list">
        {brands.map((brand) => (
          <BrandSection key={brand.name} brand={brand} />
        ))}
      </div>
    </section>
  );
}

function CloseButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="brand-close-button"
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-white)';
        e.currentTarget.style.color = 'black';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-white)';
      }}
    >
      ×
    </button>
  );
}

function useScrambleText(name: string) {
  const [isHovered, setIsHovered] = useState(false);
  const [letters, setLetters] = useState<string[]>(name.split(''));
  const intervalRefs = useRef<{ [key: number]: NodeJS.Timeout | null }>({});
  const revealTimeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const getRandomLetter = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const updateLetterAtIndex = useCallback((index: number, letter: string) => {
    setLetters((prev) => {
      const newLetters = [...prev];
      newLetters[index] = letter;
      return newLetters;
    });
  }, []);

  useEffect(() => {
    Object.values(intervalRefs.current).forEach((interval) => {
      if (interval) clearInterval(interval);
    });
    revealTimeoutRefs.current.forEach(clearTimeout);
    intervalRefs.current = {};
    revealTimeoutRefs.current = [];

    if (isHovered) {
      name.split('').forEach((_, index) => {
        if (name[index] !== ' ') {
          intervalRefs.current[index] = setInterval(() => {
            updateLetterAtIndex(index, getRandomLetter());
          }, 120);
        }
      });

      name.split('').forEach((char, index) => {
        const timeout = setTimeout(
          () => {
            if (intervalRefs.current[index]) {
              clearInterval(intervalRefs.current[index]!);
              intervalRefs.current[index] = null;
            }
            updateLetterAtIndex(index, char);
          },
          index * 100 + 300
        );
        revealTimeoutRefs.current.push(timeout);
      });
    } else {
      setLetters(name.split(''));
    }

    return () => {
      Object.values(intervalRefs.current).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
      revealTimeoutRefs.current.forEach(clearTimeout);
    };
  }, [isHovered, name, updateLetterAtIndex]);

  return { letters, setIsHovered };
}

function AnimatedBrandName({
  name,
  letters,
  charWidths,
  onMouseEnter,
  onMouseLeave,
}: {
  name: string;
  letters: string[];
  charWidths: number[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  // Split letters into words based on space positions in the original name
  const words: { chars: string[]; startIndex: number }[] = [];
  let currentWord: string[] = [];
  let wordStart = 0;
  name.split('').forEach((origChar, i) => {
    if (origChar === ' ') {
      if (currentWord.length > 0) {
        words.push({ chars: currentWord, startIndex: wordStart });
        currentWord = [];
      }
      wordStart = i + 1;
    } else {
      currentWord.push(letters[i]);
    }
  });
  if (currentWord.length > 0) {
    words.push({ chars: currentWord, startIndex: wordStart });
  }

  return (
    <h3
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: onMouseEnter ? 'pointer' : undefined }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: 'block', whiteSpace: 'nowrap' }}
        >
          {word.chars.map((char, charIndex) => {
            const globalIndex = word.startIndex + charIndex;
            return (
              <span
                key={charIndex}
                style={{
                  display: 'inline-block',
                  width: charWidths[globalIndex]
                    ? `${charWidths[globalIndex]}px`
                    : '0.55em',
                  textAlign: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${char}-${globalIndex}`}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{ display: 'inline-block', position: 'relative' }}
                  >
                    {char}
                  </motion.span>
                </AnimatePresence>
              </span>
            );
          })}
        </span>
      ))}
    </h3>
  );
}

function useMeasureCharWidths(name: string, containerRef: React.RefObject<HTMLDivElement | null>) {
  const [charWidths, setCharWidths] = useState<number[]>([]);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const h3 = container.querySelector('h3');
      if (!h3) return;

      const style = window.getComputedStyle(h3);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

      const widths = name.split('').map((char) => {
        if (char === ' ') return 0;
        return Math.ceil(ctx.measureText(char.toUpperCase()).width);
      });

      setCharWidths(widths);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [name, containerRef]);

  return charWidths;
}

function BrandSection({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
  const { letters, setIsHovered } = useScrambleText(brand.name);
  const charWidths = useMeasureCharWidths(brand.name, ref);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animationStage, setAnimationStage] = useState<AnimationStage>('idle');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMasking, setIsMasking] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundIndex, setBackgroundIndex] = useState<number | null>(null);
  const [closingMaskImage, setClosingMaskImage] = useState<string | null>(null);
  const [isLargeViewport, setIsLargeViewport] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const isInView = useInView(ref, { once: false, amount: 0.8 });

  const itemWidth = isLargeViewport ? '10rem' : '5rem';
  const itemHeight = isLargeViewport ? '35rem' : '18rem';

  useEffect(() => {
    const handleResize = () => setIsLargeViewport(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSelected = (index: number) => selectedIndex === index;
  const hasBackground = (index: number) =>
    backgroundImage && backgroundIndex === index;

  useEffect(() => {
    if (selectedIndex === null || !ref.current) {
      setAnimationStage('idle');
      setCurrentSlideIndex(0);
      setIsMasking(false);
      setClosingMaskImage(null);
      return;
    }

    setBackgroundIndex(selectedIndex);

    const element = ref.current;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop, behavior: 'smooth' });

    setAnimationStage('centering');
    const timerId = setTimeout(
      () => setAnimationStage('expanding'),
      TIMING.centeringDuration
    );
    return () => clearTimeout(timerId);
  }, [selectedIndex]);

  useEffect(() => {
    if (animationStage !== 'expanding' || selectedIndex === null) return;

    const selectedProject = brand.projects[selectedIndex];
    if (!selectedProject) return;

    const slideShowImages = selectedProject.slideShow;
    const initialMaskDelay = Math.max(
      0,
      TIMING.initialMaskDelayAfterClick - TIMING.centeringDuration
    );
    const backgroundSwapDelay =
      TIMING.maskTransitionDuration + TIMING.backgroundDelayAfterMaskTransition;
    const timeoutIds: number[] = [];

    const queueTimeout = (callback: () => void, delay: number) => {
      timeoutIds.push(window.setTimeout(callback, delay));
    };

    const runSlideshow = (maskDelay: number, slideIndex: number) => {
      queueTimeout(() => {
        setCurrentSlideIndex(slideIndex);
        setIsMasking(true);

        queueTimeout(() => {
          setBackgroundImage(slideShowImages[slideIndex].src);

          queueTimeout(() => {
            setIsMasking(false);
            runSlideshow(
              TIMING.loopMaskDelay,
              (slideIndex + 1) % slideShowImages.length
            );
          }, TIMING.backgroundTransitionDuration);
        }, backgroundSwapDelay);
      }, maskDelay);
    };

    runSlideshow(initialMaskDelay, 0);
    return () => timeoutIds.forEach(clearTimeout);
  }, [animationStage, selectedIndex, brand.projects]);

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIndex(selectedIndex === index ? null : index);
  };

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

    if (isSelected(index)) {
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
    <motion.div className="work-list--brand" ref={ref}>
      {selectedIndex !== null && <CloseButton onClick={handleClose} />}
      <AnimatedBrandName
        name={brand.name}
        letters={letters}
        charWidths={charWidths}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <AnimatePresence>
        {selectedIndex !== null && isMasking && (
          <motion.h3
            className="brand-mask-text"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundImage: `url(${closingMaskImage || brand.projects[selectedIndex].slideShow[currentSlideIndex]?.src})`,
            }}
          >
            {brand.name}
          </motion.h3>
        )}
      </AnimatePresence>

      {brand.projects.map((project, index) => (
        <div key={index}>
          <motion.a
            href="#"
            className="work-list--item"
            onClick={(e) => handleImageClick(index, e)}
            style={{
              backgroundImage: hasBackground(index)
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
              animate={{ opacity: hasBackground(index) ? 0 : 1 }}
              transition={{
                duration:
                  animationStage === 'contracting' ||
                  animationStage === 'returning'
                    ? 0.3
                    : 1,
              }}
            />
          </motion.a>
          <AnimatedBrandName
            name={brand.name}
            letters={letters}
            charWidths={charWidths}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default History;
