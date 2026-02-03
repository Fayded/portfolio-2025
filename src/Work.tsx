<<<<<<< Updated upstream
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import mercedes from './assets/mercedes-vans.jpg';
=======
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
>>>>>>> Stashed changes
import './styles/work.scss';
import mercedes2 from './assets/mercedes-vans-2.jpg';
import carmax from './assets/carmax.jpg';
import carmax2 from './assets/carmax-2.jpg';

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
    name: 'cmt',
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
  const [hoveredData, setHoveredData] = useState<{
    brandName: string;
    imageSrc: string;
  } | null>(null);

  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  const { positions: imagePositions, rotations: imageRotations } =
    useMemo(() => {
      const positions: { [key: string]: string[] } = {};
      const rotations: { [key: string]: string[] } = {};

      brands.forEach((brand) => {
        if (brand.images) {
          const totalImages = brand.images.length;
          let ranges;

          if (totalImages === 2) {
            ranges = [
              { min: 5, max: 40 },
              { min: 70, max: 90 },
            ];
          } else {
            ranges = [
              { min: 5, max: 20 },
              { min: 45, max: 60 },
              { min: 80, max: 90 },
            ];
          }

          positions[brand.name] = brand.images.map((_, index) => {
            const range = ranges[Math.min(index, ranges.length - 1)];
            return Math.random() * (range.max - range.min) + range.min + '%';
          });

          rotations[brand.name] = brand.images.map(() => {
            const isPositive = Math.random() > 0.5;
            const rotation = isPositive
              ? Math.random() * 10 + 10 // 10 to 20 degrees
              : Math.random() * 10 - 20; // -10 to -20 degrees
            return `${rotation}deg`;
          });
        }
      });

      return { positions, rotations };
    }, []);

  const handleImageHover = (brandName: string, imageSrc: string) => {
    setHoveredData({ brandName, imageSrc });
  };

  const handleBrandClick = (brandName: string) => {
    setExpandedBrand(expandedBrand === brandName ? null : brandName);
  };

  return (
    <section className="container work">
      <h2 className="my-2">Work</h2>
      <div className="work-list">
        {brands.map((brand) => {
          const isHovered = hoveredData?.brandName === brand.name;
          const currentImage = isHovered ? hoveredData.imageSrc : '';
          const isExpanded = expandedBrand === brand.name;

          return (
            <motion.div
              className="work-list--item"
              key={brand.name}
              animate={{
                height: isExpanded ? '100vh' : 'auto',
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {brand.images
                ? brand.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="work-list--btn"
                      onClick={() => handleBrandClick(brand.name)}
                      onMouseOver={() => {
                        handleImageHover(brand.name, image.src);
                      }}
                      onMouseOut={() => {
                        setHoveredData(null);
                      }}
                      style={{
                        left: imagePositions[brand.name]?.[index] || '0%',
                        transform: `rotate(${
                          imageRotations[brand.name]?.[index] || '0deg'
                        })`,
                      }}
                    >
                      <img key={image.src} src={image.src} alt={image.alt} />
                    </motion.div>
                  ))
                : null}
              <motion.div
                className="work-list--text-container"
                animate={{
                  scale: isExpanded ? 0.6 : 1,
                  x: isExpanded ? '0%' : '0%',
                  y: isExpanded ? '10%' : '0%',
                }}
                transition={{
                  duration: 2,
                  ease: [0.16, 1, 0.3, 1], // Smooth ease-out curve
                  delay: isExpanded ? 0.2 : 0, // Start slightly before container finishes
                }}
                style={{
                  position: 'relative',
                  transformOrigin: 'center center',
                  transform: isExpanded
                    ? 'translateX(-50%) translateY(-50%)'
                    : 'none',
                }}
              >
                <h3 className="work-list--brand">{brand.name}</h3>
                <h3
                  className="work-list--mask"
                  style={{
                    backgroundImage: currentImage ? `url(${currentImage})` : '',
                  }}
                >
                  {brand.name}
                </h3>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

<<<<<<< Updated upstream
=======
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
        <motion.button
          onClick={handleClose}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: animationStage === 'expanding' ? 1 : 0,
            scale: animationStage === 'expanding' ? 1 : 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
          }}
          whileHover={{
            background: 'var(--color-white)',
            color: 'black',
            scale: 1.1,
          }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </motion.button>
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

>>>>>>> Stashed changes
export default Work;
