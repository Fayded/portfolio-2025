import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import logo from './assets/logo.svg'
import './styles/App.scss'

// Simple Typewriter Component
function SimpleTypewriter() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = useState([
    "We build stunning websites",
    "We create mobile apps", 
    "We design user experiences",
    "We craft digital solutions"
  ])[0];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const animateText = () => {
      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          timeout = setTimeout(animateText, 80 + Math.random() * 40);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          timeout = setTimeout(animateText, 40);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          timeout = setTimeout(animateText, 300);
        }
      }
    };

    timeout = setTimeout(animateText, 500);
    return () => clearTimeout(timeout);
  }, [currentTextIndex, currentText, isDeleting, texts]);

  return (
    <span style={{ color: '#FFB8F6' }}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
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

function App() {
  return (
    <>
      <motion.header 
        className="container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="grid">
          <div className="col-start-23 col-end-25">
            <motion.img 
              className="logo" 
              src={logo} 
              alt="Logo"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.8, 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </div>
      </motion.header>
      
      {/* Typewriter Demo */}
      <main className="container" style={{ padding: '4rem 0' }}>
        <div className="grid align-items-center justify-items-center">
          <div className="col-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                color: '#4B71D8',
                marginBottom: '2rem',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SimpleTypewriter />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
