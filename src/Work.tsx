import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import './styles/work.scss';

import mercedes from './assets/mercedes.jpg';
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
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.8,
  });

  const handleImageClick = (imageSrc: string, e: React.MouseEvent) => {
    e.preventDefault();
    setBackgroundImage(imageSrc);

    // Scroll the brand section to the top of the viewport
    if (ref.current) {
      (ref.current as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div
      className="work-list--brand"
      ref={ref}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <h3>{brand.name}</h3>
      <h3
        style={{
          opacity: backgroundImage ? 0 : 1,
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
          onClick={(e) => handleImageClick(image.src, e)}
          initial={{
            left: index === 0 ? '7%' : 'auto',
            right: index === 0 ? 'auto' : '7%',
          }}
          animate={
            backgroundImage
              ? {
                  left: index === 0 ? '-20%' : 'auto',
                  right: index === 0 ? 'auto' : '-20%',
                }
              : isInView
              ? {
                  left: index === 0 ? '10%' : 'auto',
                  right: index === 0 ? 'auto' : '10%',
                }
              : {
                  left: index === 0 ? '7%' : 'auto',
                  right: index === 0 ? 'auto' : '7%',
                }
          }
          transition={{
            duration: backgroundImage ? 1.0 : 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: backgroundImage ? 0 : index * 0.1,
          }}
        >
          <img src={image.src} alt={image.alt} />
        </motion.a>
      ))}
    </div>
  );
}

export default Work;
