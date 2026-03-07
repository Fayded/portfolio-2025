import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './styles/work.scss';

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

interface Brand {
  name: string;
  images: BrandImage[];
  slideShow: BrandImage[];
}

const brands: Brand[] = [
  {
    name: 'mercedes',
    images: [
      { src: mercedesG, alt: 'Mercedes Vans' },
      { src: mercedesGrill, alt: 'Mercedes Vans' },
    ],
    slideShow: [
      { src: mercedesG, alt: 'Mercedes Vans' },
      { src: mercedesWoods, alt: 'Mercedes in the woods' },
      { src: mercedesGrill, alt: 'Mercedes Grill' },
      { src: mercedesEmblem, alt: 'Mercedes Emble,' },
      { src: mercedesOldCars, alt: 'Mercedes Old' },
    ],
  },
  {
    name: 'porsche',
    images: [
      { src: porscheBehind, alt: 'Porsche' },
      { src: porscheRim, alt: 'Porsche' },
    ],
    slideShow: [
      { src: porscheBehind, alt: 'Porsche' },
      { src: porscheRim, alt: 'Porsche' },
      { src: porscheWheel, alt: 'Porsche' },
    ],
  },
  {
    name: 'carmax',
    images: [
      { src: carmaxOldCars, alt: 'CarMax' },
      { src: carmaxParkingLot, alt: 'CarMax' },
    ],
    slideShow: [
      { src: carmaxOldCars, alt: 'CarMax' },
      { src: carmaxParkingLot, alt: 'CarMax' },
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

function Work() {
  const title = 'CLIENT WORK';

  return (
    <section className="container work">
      <h2 className="my-2">
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

function BrandSection({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
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

  const itemWidth = isLargeViewport ? '17rem' : '8rem';
  const itemHeight = isLargeViewport ? '40rem' : '20rem';

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

    const slideShowImages = brand.slideShow;
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
  }, [animationStage, selectedIndex, brand.slideShow]);

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
    const isLeft = index === 0;
    const baseRotation = isLeft ? 10 : -10;
    const basePosition = {
      left: isLeft ? '10%' : 'auto',
      right: isLeft ? 'auto' : '10%',
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
      left: isLeft ? (isInView ? '10%' : '7%') : 'auto',
      right: isLeft ? 'auto' : isInView ? '10%' : '7%',
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
      <h3>{brand.name}</h3>

      <AnimatePresence>
        {selectedIndex !== null && isMasking && (
          <motion.h3
            className="brand-mask-text"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundImage: `url(${closingMaskImage || brand.slideShow[currentSlideIndex].src})`,
            }}
          >
            {brand.name}
          </motion.h3>
        )}
      </AnimatePresence>

      {brand.images.map((image, index) => (
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
              src={image.src}
              alt={image.alt}
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
          <h3>{brand.name}</h3>
        </div>
      ))}
    </motion.div>
  );
}

export default Work;
