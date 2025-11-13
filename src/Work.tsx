import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import mercedes from './assets/mercedes-vans.jpg';
import './styles/work.css';
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

  const imagePositions = useMemo(() => {
    const positions: { [key: string]: string[] } = {};

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
      }
    });

    return positions;
  }, []);

  const handleImageHover = (brandName: string, imageSrc: string) => {
    setHoveredData({ brandName, imageSrc });
  };

  return (
    <section className="container work">
      <h2 className="my-2">Work</h2>
      <div className="work-list">
        {brands.map((brand) => {
          const isHovered = hoveredData?.brandName === brand.name;
          const currentImage = isHovered ? hoveredData.imageSrc : '';

          return (
            <div className="work-list--item" key={brand.name}>
              {brand.images
                ? brand.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="work-list--btn"
                      onMouseOver={() => {
                        handleImageHover(brand.name, image.src);
                      }}
                      onMouseOut={() => {
                        setHoveredData(null);
                      }}
                      style={{
                        left: imagePositions[brand.name]?.[index] || '0%',
                      }}
                    >
                      <img key={image.src} src={image.src} alt={image.alt} />
                    </motion.div>
                  ))
                : null}
              <h3>{brand.name}</h3>
              <h3
                style={{
                  backgroundImage: currentImage ? `url(${currentImage})` : '',
                }}
              >
                {brand.name}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Work;
