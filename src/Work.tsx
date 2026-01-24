import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import mercedes from './assets/mercedes-vans.jpg';
import './styles/work.scss';
import mercedes2 from './assets/mercedes-vans-2.jpg';

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

export default Work;
