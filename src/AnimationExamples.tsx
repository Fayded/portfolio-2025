import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './styles/App.scss';

// Simple Typewriter Component for Demo
function TypewriterDemo({ texts, speed = 80 }: { texts: string[], speed?: number }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;

    const animateText = () => {
      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          timeout = setTimeout(animateText, speed + Math.random() * 30);
        } else {
          // Finished typing, pause then start deleting
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          timeout = setTimeout(animateText, 40);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          const nextIndex = (currentTextIndex + 1) % texts.length;
          setCurrentTextIndex(nextIndex);
          timeout = setTimeout(animateText, 300);
        }
      }
    };

    timeout = setTimeout(animateText, 500);

    return () => clearTimeout(timeout);
  }, [currentTextIndex, currentText, isDeleting, texts, speed, isInView]);

  return (
    <span ref={ref}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          ease: "linear"
        }}
        style={{ 
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          backgroundColor: '#FFB8F6',
          marginLeft: '2px'
        }}
      />
    </span>
  );
}

function AnimationExamples() {
  const [isVisible, setIsVisible] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  
  // Scroll-based animation setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to different values
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  // Viewport detection for entrance animations
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.3 });

  return (
    <div ref={containerRef} style={{ minHeight: '300vh' }}>
      {/* 1. Basic Click Animations */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2>Click & Hover Animations</h2>
        <div className="grid gap-lg">
          
          {/* Simple click animation */}
          <motion.div 
            className="col-8"
            style={{ 
              background: '#FFB8F6', 
              padding: '2rem', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(255, 184, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setClickCount(prev => prev + 1)}
          >
            <h3>Click me! ({clickCount} clicks)</h3>
            <p>Hover for scale effect, click for tap animation</p>
          </motion.div>

          {/* Button with multiple states */}
          <motion.button
            className="col-8"
            style={{
              background: '#4B71D8',
              color: 'white',
              border: 'none',
              padding: '2rem',
              borderRadius: '8px',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}
            variants={{
              idle: { scale: 1, rotate: 0 },
              hover: { scale: 1.1, rotate: 5 },
              tap: { scale: 0.9, rotate: -5 }
            }}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Advanced Button
          </motion.button>

          {/* Toggle animation */}
          <motion.div
            className="col-8"
            style={{ 
              background: isVisible ? '#E1FF69' : '#666', 
              padding: '2rem', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            animate={{ 
              backgroundColor: isVisible ? '#E1FF69' : '#666666',
              color: isVisible ? '#000' : '#fff'
            }}
            onClick={() => setIsVisible(!isVisible)}
            transition={{ duration: 0.3 }}
          >
            <h3>Toggle State</h3>
            <p>Click to change color: {isVisible ? 'Visible' : 'Hidden'}</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Scroll-based Animations */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2>Scroll-Based Animations</h2>
        
        {/* Parallax effect */}
        <motion.div
          className="grid"
          style={{ y, minHeight: '60vh', alignItems: 'center' }}
        >
          <motion.div
            className="col-12"
            style={{
              background: '#FFB8F6',
              padding: '3rem',
              borderRadius: '16px',
              scale
            }}
          >
            <h3>Parallax & Scale on Scroll</h3>
            <p>This element moves and scales as you scroll</p>
          </motion.div>
          
          <motion.div
            className="col-12"
            style={{
              background: '#4B71D8',
              color: 'white',
              padding: '3rem',
              borderRadius: '16px',
              rotate
            }}
          >
            <h3>Rotation on Scroll</h3>
            <p>This element rotates 360° as you scroll</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Entrance Animations (Viewport Detection) */}
      <section ref={inViewRef} className="container" style={{ padding: '4rem 0' }}>
        <h2>Scroll Into View Animations</h2>
        <div className="grid">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div
              key={item}
              className="col-6"
              style={{
                background: ['#FFB8F6', '#E1FF69', '#4B71D8', '#EFEFEF'][index],
                color: index === 2 ? 'white' : 'black',
                padding: '2rem',
                borderRadius: '8px',
                margin: '1rem 0'
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <h4>Card {item}</h4>
              <p>I animate in when scrolled into view!</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Page Transitions */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2>Page Transitions & State Changes</h2>
        
        <motion.button
          style={{
            background: '#E1FF69',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(!isVisible)}
        >
          Toggle Content
        </motion.button>

        <AnimatePresence mode="wait">
          {isVisible ? (
            <motion.div
              key="visible"
              className="grid"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="col-24" style={{ background: '#FFB8F6', padding: '2rem', borderRadius: '8px' }}>
                <h3>Visible Content</h3>
                <p>This content slides in from the left and exits to the right</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hidden"
              className="grid"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="col-24" style={{ background: '#4B71D8', color: 'white', padding: '2rem', borderRadius: '8px' }}>
                <h3>Alternative Content</h3>
                <p>This content slides in from the right and exits to the left</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 5. Complex Scroll Progress Indicator */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: '#4B71D8',
          transformOrigin: '0%',
          zIndex: 1000,
          scaleX: scrollYProgress
        }}
      />

      {/* 6. Staggered List Animation */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2>Staggered Animations</h2>
        <motion.div
          className="grid"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'].map((item) => (
            <motion.div
              key={item}
              className="col-4"
              style={{
                background: '#E1FF69',
                padding: '1.5rem',
                borderRadius: '8px',
                margin: '0.5rem 0'
              }}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Agency Typewriter Effect */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2>Agency Services Typewriter</h2>
        <div className="grid align-items-center justify-items-center">
          <div className="col-24 text-center">
            <div style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              color: '#4B71D8',
              marginBottom: '2rem',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TypewriterDemo 
                texts={[
                  "We build stunning websites",
                  "We create mobile apps", 
                  "We design user experiences",
                  "We develop e-commerce platforms",
                  "We craft brand identities"
                ]}
                speed={70}
              />
            </div>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Perfect for showcasing your agency's diverse services and capabilities
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnimationExamples;
