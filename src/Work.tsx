import mercedes from './assets/mercedes-vans.jpg';
import mercedes2 from './assets/mercedes-vans.jpg';
import './styles/work.css';

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
  const imageSpace = (index: number) => {
    const ranges = [
      { min: 5, max: 15 }, // First image: 5-15%
      { min: 45, max: 55 }, // Second image: 45-55%
      { min: 85, max: 100 }, // Third image: 85-100%
    ];

    const range = ranges[Math.min(index, ranges.length - 1)];
    return Math.random() * (range.max - range.min) + range.min + '%';
  };
  return (
    <section className="container work">
      <h2 className="my-2">Work</h2>
      <div className="work-list">
        {brands.map((brand) => (
          <div className="work-item" key={brand.name}>
            {brand.images ? (
              brand.images.map((image, index) => (
                <div
                  style={{
                    left: imageSpace(index),
                  }}
                >
                  <img key={image.src} src={image.src} alt={image.alt} />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;
