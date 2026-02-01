import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import mercedes from './assets/mercedes.jpg';
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
  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
    margin: '0px 0px -20% 0px',
  });

  return (
    <div className="work-list--brand" ref={ref}>
      <h3>{brand.name}</h3>
      <h3>{brand.name}</h3>
      {brand.images.map((image, index) => (
        <motion.a
          href="#"
          className="work-list--item"
          key={index}
          initial={{
            left: index === 0 ? '5%' : 'auto',
            right: index === 0 ? 'auto' : '5%',
          }}
          animate={
            isInView
              ? {
                  left: index === 0 ? '10%' : 'auto',
                  right: index === 0 ? 'auto' : '10%',
                }
              : {
                  left: index === 0 ? '5%' : 'auto',
                  right: index === 0 ? 'auto' : '5%',
                }
          }
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: index * 0.1,
          }}
        >
          <img src={image.src} alt={image.alt} />
        </motion.a>
      ))}
    </div>
  );
}

export default Work;
