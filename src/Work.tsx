import {
  AnimatePresence,
  motion,
  useInView,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './styles/work.scss';

import mercedesEmblem from './assets/mercedes-emblem.jpg';
import mercedesG from './assets/mercedes-g.jpg';
import mercedesWoods from './assets/mercedes-g-woods.jpg';
import mercedesOldCars from './assets/mercedes-old-cars.jpg';
import mercedesGrill from './assets/mercedes-grill.jpg';
import carmaxOldCars from './assets/carmax-old-cars.jpg';
import carmaxParkingLot from './assets/carmax-parking.jpg';
import carmaxOneCar from './assets/carmax-one-car.jpg';
import carmaxEmpty from './assets/carmax-empty.jpg';
import carmaxVintage from './assets/carmax-vintage.jpg';
import carmaxSalesLot from './assets/carmax-sales-lot.jpg';
import pointsGuyBoat from './assets/points-guy-boat.jpg';
import pointsGuyIsland from './assets/points-guy-island.jpg';
import pointsGuyMountains from './assets/points-guy-mountains.jpg';
import pointsGuyWing from './assets/points-guy-wing.jpg';
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
    name: 'mercedes benz',
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
    name: 'red ventures',
    images: [
      { src: carmaxOldCars, alt: 'CarMax' },
      { src: carmaxParkingLot, alt: 'CarMax' },
    ],
    slideShow: [
      { src: pointsGuyBoat, alt: 'The Points Guy' },
      { src: pointsGuyIsland, alt: 'The Points Guy' },
      { src: pointsGuyMountains, alt: 'The Points Guy' },
      { src: pointsGuyWing, alt: 'The Points Guy' },
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
      { src: carmaxOneCar, alt: 'CarMax' },
      { src: carmaxParkingLot, alt: 'CarMax' },
      { src: carmaxEmpty, alt: 'CarMax' },
      { src: carmaxVintage, alt: 'CarMax' },
      { src: carmaxSalesLot, alt: 'CarMax' },
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
      <h2 className="my-2 ml-2">{title}</h2>
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
  const savedOriginRef = useRef<{ left: number; top: number } | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

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
      setBackgroundImage(null);
      return;
    }

    setBackgroundIndex(selectedIndex);
    setBackgroundImage(null);

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

    const findNextDifferent = (startIndex: number, currentSrc: string) => {
      for (let i = 0; i < slideShowImages.length; i++) {
        const idx = (startIndex + i) % slideShowImages.length;
        if (slideShowImages[idx].src !== currentSrc) return idx;
      }
      return -1;
    };

    const runSlideshow = (
      maskDelay: number,
      slideIndex: number,
      currentSrc: string
    ) => {
      const nextIndex = findNextDifferent(slideIndex, currentSrc);
      if (nextIndex === -1) return;

      queueTimeout(() => {
        setCurrentSlideIndex(nextIndex);
        setIsMasking(true);

        queueTimeout(() => {
          setBackgroundImage(slideShowImages[nextIndex].src);

          queueTimeout(() => {
            setIsMasking(false);
            runSlideshow(
              TIMING.loopMaskDelay,
              (nextIndex + 1) % slideShowImages.length,
              slideShowImages[nextIndex].src
            );
          }, TIMING.backgroundTransitionDuration);
        }, backgroundSwapDelay);
      }, maskDelay);
    };

    runSlideshow(initialMaskDelay, 0, brand.images[selectedIndex].src);
    return () => timeoutIds.forEach(clearTimeout);
  }, [animationStage, selectedIndex, brand.slideShow]);

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      const anchor = e.currentTarget as HTMLElement;
      const rect = anchor.getBoundingClientRect();
      const parentRect = ref.current?.getBoundingClientRect();
      if (parentRect) {
        savedOriginRef.current = {
          left: rect.left - parentRect.left,
          top: rect.top - parentRect.top,
        };
      }
      setSelectedIndex(index);
    }
  };

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClosing(true);
    setAnimationStage('contracting');

    setTimeout(() => {
      setAnimationStage('returning');
      setTimeout(() => {
        setSelectedIndex(null);
        setIsClosing(false);
      }, 600);
    }, 800);
  };

  const getAnimationState = (index: number) => {
    const isLeft = index === 0;
    const baseRotation = isLeft ? 10 : -10;
    const restLeft = isLeft
      ? isInView
        ? '10%'
        : '7%'
      : isInView
        ? '90%'
        : '93%';
    const restX = isLeft ? 0 : '-100%';

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
            left: restLeft,
            top: '50%',
            x: restX,
            y: '-50%',
            rotate: baseRotation,
            zIndex: 1,
            width: itemWidth,
            height: itemHeight,
            opacity: 1,
            scale: 1,
          };
      }
    }

    if (selectedIndex !== null) {
      return {
        left: restLeft,
        x: restX,
        opacity: 0,
        scale: 0.8,
        y: '-50%',
        rotate: baseRotation,
        zIndex: 1,
      };
    }

    return {
      left: restLeft,
      x: restX,
      y: isInView ? '-50%' : '100%',
      rotate: isInView ? baseRotation : 0,
      zIndex: 1,
      opacity: 1,
      scale: 1,
      width: itemWidth,
      height: itemHeight,
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
      {selectedIndex !== null && !isClosing && (
        <CloseButton onClick={handleClose} />
      )}
      <h3>{brand.name}</h3>

      {selectedIndex !== null && isMasking && (
        <h3
          className="brand-mask-text"
          style={{
            backgroundImage: `url(${closingMaskImage || brand.slideShow[currentSlideIndex].src})`,
          }}
        >
          {brand.name}
        </h3>
      )}

      {brand.images.map((image, index) => (
        <div key={index}>
          <motion.a
            href="#"
            className="work-list--item"
            onClick={(e) => handleImageClick(index, e)}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={false}
            animate={getAnimationState(index)}
            transition={
              selectedIndex === null
                ? {
                    type: 'spring',
                    bounce: 0.4,
                    duration: 0.8,
                    delay: index * 0.1,
                  }
                : {
                    duration: getTransitionDuration(),
                    ease: [0.4, 0, 0.2, 1],
                  }
            }
            whileHover={
              selectedIndex === null
                ? { scale: 1.05, transition: { duration: 0.3 } }
                : {}
            }
          >
            <AnimatePresence>
              {backgroundImage && backgroundIndex === index && (
                <motion.img
                  key={backgroundImage}
                  src={backgroundImage}
                  alt=""
                  className="work-list--bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
            <motion.img
              src={image.src}
              alt={image.alt}
              className={
                isSelected(index) &&
                (animationStage === 'expanding' ||
                  animationStage === 'centering')
                  ? 'work-list--bg'
                  : undefined
              }
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
