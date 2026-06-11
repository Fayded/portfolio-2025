import { useInView, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import './styles/marks.scss';

import {
  HawksIcon,
  BearsIcon,
  BodaciousIcon,
  BruinsIcon,
  FareplaneIcon,
  Fareplane1Icon,
  Fareplane2Icon,
  Fareplane3Icon,
  CB1Icon,
  CB2Icon,
  CB3Icon,
  CB4Icon,
  CB5Icon,
  CB6Icon,
  B2B1Icon,
  B2B2Icon,
  B2B3Icon,
  B2B4Icon,
  B2B5Icon,
  B2B7Icon,
} from './assets/icons';

const brands = [
  {
    name: 'Atlanta Hawks',
    final: { icon: HawksIcon, width: 692, height: 46 },
    versions: [{ icon: HawksIcon, width: 692, height: 46 }],
  },
  {
    name: 'Boston Bruins',
    final: { icon: BruinsIcon, width: 508, height: 190 },
    versions: [
      { icon: BodaciousIcon, width: 106, height: 203 },
      { icon: BruinsIcon, width: 508, height: 190 },
    ],
  },
  {
    name: 'Chicago Bears',
    final: { icon: BearsIcon, width: 432, height: 211 },
    versions: [
      { icon: CB1Icon, width: 188, height: 93 },
      { icon: CB2Icon, width: 93, height: 125 },
      { icon: CB3Icon, width: 164, height: 129 },
      { icon: CB4Icon, width: 311, height: 195 },
      { icon: CB5Icon, width: 118, height: 143 },
      { icon: CB6Icon, width: 467, height: 110 },
    ],
  },
  {
    name: 'Bodacious',
    final: { icon: BodaciousIcon, width: 106, height: 203 },
    versions: [
      { icon: B2B1Icon, width: 142, height: 128 },
      { icon: B2B2Icon, width: 102, height: 215 },
      { icon: B2B3Icon, width: 106, height: 203 },
      { icon: B2B4Icon, width: 125, height: 229 },
      { icon: B2B5Icon, width: 140, height: 128 },
      { icon: B2B7Icon, width: 106, height: 203 },
    ],
  },
  {
    name: 'Fareplane',
    final: { icon: FareplaneIcon, width: 415, height: 113 },
    versions: [
      { icon: Fareplane1Icon, width: 30, height: 36 },
      { icon: Fareplane2Icon, width: 265, height: 66 },
      { icon: Fareplane3Icon, width: 303, height: 73 },
    ],
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

  const handleBrandClick = (brandIndex: number, clickedOffset: number) => {
    if (clickedOffset === 0) {
      handleMarkSelection(brands[brandIndex].name);
    }
  };

  const title = 'WORD MARKS';

  return (
    <section ref={inViewRef} className="container marks">
      <h2 className="my-2 ml-2">
        {title.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h2>
      {!selectedMark && (
        <div className="grid align-items-top my-2">
          {brands.map((_, brandIndex) => (
            <motion.div
              key={brandIndex}
              className="col-sm-8 marks-item--container"
              initial={{ opacity: 1, y: 50 }}
              animate={
                isInView && !selectedMark
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 50 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {[-2, -1, 0, 1, 2].map((offset) => {
                const brand = brands[brandIndex];
                const iconData =
                  offset === 0
                    ? brand.final
                    : brand.versions[
                        Math.abs(offset) - 1 < brand.versions.length
                          ? Math.abs(offset) - 1
                          : (Math.abs(offset) - 1) % brand.versions.length
                      ];
                const Icon = iconData.icon;
                return (
                  <motion.div
                    key={`${brandIndex}-${offset}`}
                    className="marks-item"
                    style={{
                      transform: `translateX(${offset * 60}%)`,
                      zIndex: offset === 0 ? 2 : 1,
                    }}
                    animate={{
                      opacity: 1,
                      scale: offset === 0 ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleBrandClick(brandIndex, offset)}
                  >
                    <Icon
                      fill="white"
                      width={iconData.width}
                      height={iconData.height}
                    />
                  </motion.div>
                );
              })}
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
            <selectedMark.final.icon
              fill="pink"
              width={selectedMark.final.width}
              height={selectedMark.final.height}
            />
          </h4>
        </motion.div>
      )}
    </section>
  );
}

export default Marks;
