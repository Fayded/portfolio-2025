import { useInView, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import './styles/marks.scss';

import {
  HawksIcon,
  BearsIcon,
  BodaciousIcon,
  BruinsIcon,
  FareplaneIcon,
} from './assets/icons';

const brands = [
  {
    name: 'Atlanta Hawks',
    component: HawksIcon,
  },
  {
    name: 'Boston Bruins',
    component: BruinsIcon,
  },
  {
    name: 'Chicago Bears',
    component: BearsIcon,
  },
  {
    name: 'Bodacious',
    component: BodaciousIcon,
  },
  {
    name: 'Fareplane',
    component: FareplaneIcon,
  },
];

function Marks() {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });
  const [selectedMark, setSelectedMark] = useState<(typeof brands)[0] | null>(
    null
  );

  const handleMarkSelection = (brand: string) => {
    const selectedBrand = brands.filter((b) => b.name === brand);
    setSelectedMark(selectedBrand[0] || null);
  };

  return (
    <section ref={inViewRef} className="container marks">
      <h2 className="my-2">Marks</h2>
      {!selectedMark && (
        <div className="grid align-items-center my-2">
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              className="col-sm-8 marks-item"
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView && !selectedMark
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onClick={() => handleMarkSelection(brand.name)}
            >
              <brand.component fill="white" />
            </motion.div>
          ))}
        </div>
      )}
      {selectedMark && (
        <motion.div
          key={selectedMark?.name}
          className="grid marks-selected"
          initial={{ opacity: 0, y: 50 }}
          animate={selectedMark ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <h4 className="col-sm-8 marks-item">
            <selectedMark.component fill="pink" />
          </h4>
        </motion.div>
      )}
    </section>
  );
}

export default Marks;
