import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './styles/work.scss';

import mercedes from './assets/mercedes.jpg';
import mercedes2 from './assets/mercedes.jpg';
import carmax from './assets/carmax.jpg';
import carmax2 from './assets/carmax.jpg';

const brands = [
  {
    name: 'hbo',
    images: [
      {
        src: mercedes,
        alt: 'Mercedes Vans',
      },
      {
        src: mercedes2,
        alt: 'Mercedes Vans',
      },
    ],
  },
  {
    name: 'porsche',
    images: [
      {
        src: mercedes,
        alt: 'Mercedes Vans',
      },
      {
        src: mercedes2,
        alt: 'Mercedes Vans',
      },
    ],
  },
  {
    name: 'carmax',
    images: [
      {
        src: carmax,
        alt: 'CarMax',
      },
      {
        src: carmax2,
        alt: 'CarMax',
      },
    ],
  },
  {
    name: 'capital one',
    images: [
      {
        src: mercedes,
        alt: 'Mercedes Vans',
      },
      {
        src: mercedes2,
        alt: 'Mercedes Vans',
      },
    ],
  },
];

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
        {brands.map((brand) => {
          return <BrandSection key={brand.name} brand={brand} />;
        })}
      </div>
    </section>
  );
}

function BrandSection({ brand }: { brand: (typeof brands)[0] }) {
  const ref = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animationStage, setAnimationStage] = useState<
    'idle' | 'centering' | 'expanding' | 'contracting' | 'returning'
  >('idle');
  const isInView = useInView(ref, {
    once: false,
    amount: 0.8,
  });

  useEffect(() => {
    if (selectedIndex !== null && ref.current) {
      // Scroll the brand section to the top of the viewport
      const element = ref.current as HTMLElement;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementTop,
        behavior: 'smooth',
      });

      // Start with centering animation immediately
      setAnimationStage('centering');

      // Then after centering, expand
      setTimeout(() => {
        setAnimationStage('expanding');
      }, 600);
    } else {
      setAnimationStage('idle');
    }
  }, [selectedIndex]);

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const newSelectedIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newSelectedIndex);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();

    // Reverse animation: first contract, then return to original position
    setAnimationStage('contracting');

    setTimeout(() => {
      setAnimationStage('returning');

      // Finally clear selection after animation completes
      setTimeout(() => {
        setSelectedIndex(null);
      }, 600);
    }, 800);
  };

  return (
    <motion.div className="work-list--brand" ref={ref}>
      {selectedIndex !== null && (
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            zIndex: 10,
            background: 'transparent',
            border: '2px solid var(--color-white)',
            color: 'var(--color-white)',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
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
      )}
      <h3>{brand.name}</h3>
      <h3
        style={{
          opacity: selectedIndex !== null ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }}
      >
        {brand.name}
      </h3>
      {brand.images.map((image, index) => (
        <motion.a
          href="#"
          className="work-list--item"
          key={index}
          onClick={(e) => handleImageClick(index, e)}
          initial={false}
          animate={
            selectedIndex === index && animationStage === 'centering'
              ? {
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  rotate: 0,
                  zIndex: 5,
                }
              : selectedIndex === index && animationStage === 'expanding'
              ? {
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  width: '100vw',
                  height: '100vh',
                  rotate: 0,
                  zIndex: 5,
                }
              : selectedIndex === index && animationStage === 'contracting'
              ? {
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  width: '17rem',
                  height: '40rem',
                  rotate: 0,
                  zIndex: 5,
                }
              : selectedIndex === index && animationStage === 'returning'
              ? {
                  left: index === 0 ? '10%' : 'auto',
                  right: index === 0 ? 'auto' : '10%',
                  top: '50%',
                  x: '0%',
                  y: '-50%',
                  width: '17rem',
                  height: '40rem',
                  rotate: index === 0 ? 10 : -10,
                  zIndex: 5,
                  opacity: 1,
                  scale: 1,
                }
              : selectedIndex !== null
              ? {
                  opacity: 0,
                  scale: 0.8,
                  y: '-50%',
                  rotate: index === 0 ? 10 : -10,
                  zIndex: 1,
                }
              : isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  left: index === 0 ? '10%' : 'auto',
                  right: index === 0 ? 'auto' : '10%',
                  y: '-50%',
                  rotate: index === 0 ? 10 : -10,
                  zIndex: 1,
                }
              : {
                  opacity: 1,
                  scale: 1,
                  left: index === 0 ? '7%' : 'auto',
                  right: index === 0 ? 'auto' : '7%',
                  y: '-50%',
                  rotate: index === 0 ? 10 : -10,
                  zIndex: 1,
                }
          }
          transition={{
            duration:
              animationStage === 'centering'
                ? 0.6
                : animationStage === 'expanding'
                ? 0.8
                : animationStage === 'contracting'
                ? 0.8
                : animationStage === 'returning'
                ? 0.6
                : selectedIndex !== null
                ? 1.0
                : 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: selectedIndex !== null ? 0 : index * 0.1,
          }}
          whileHover={
            selectedIndex === null
              ? {
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }
              : {}
          }
        >
          <img src={image.src} alt={image.alt} />
        </motion.a>
      ))}
    </motion.div>
  );
}

export default Work;
