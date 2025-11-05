import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';

import hawks from './assets/hawks.svg';
import bruins from './assets/bruins.svg';

function Marks() {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });

  return (
    <section ref={inViewRef} className="container">
      <h2 className="my-2">Marks</h2>
      <div className="grid align-items-center my-2">
        <div className="col-10">
          <motion.div
            key={hawks}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 0.2,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <img src={hawks} alt="Hawks Logo" />
          </motion.div>
        </div>
        <div className="col-8 col-start-14 col-end-22">
          <motion.div
            key={bruins}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 0.4,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <img src={bruins} alt="Bruins Logo" />
          </motion.div>
        </div>
      </div>
      <div className="grid align-items-center my-2">
        <div className="col-8">
          <motion.div
            key={bruins}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 0.6,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <img src={bruins} alt="Bruins Logo" />
          </motion.div>
        </div>
        <div className="col-10 col-start-14 col-end-24">
          <motion.div
            key={hawks}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <img src={hawks} alt="Hawks Logo" />
          </motion.div>
        </div>
      </div>
      <div className="grid align-items-center my-2">
        <div className="col-10">
          <motion.div
            key={hawks}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 1.0,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <img src={hawks} alt="Hawks Logo" />
          </motion.div>
        </div>
        <div className="col-8 col-start-14 col-end-22">
          <motion.div
            key={bruins}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 1.2,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <img src={bruins} alt="Bruins Logo" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Marks;
