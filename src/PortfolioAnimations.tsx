import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import './styles/App.scss';

// Portfolio-specific animation components
function PortfolioAnimations() {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const yProjects = useTransform(scrollYProgress, [0.2, 0.8], [100, -100]);
  
  // Viewport detection
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const projectVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 100 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div>
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        className="container"
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center',
          y: yHero
        }}
      >
        <motion.div
          className="grid align-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="col-24"
            variants={itemVariants}
          >
            <motion.h1 
              style={{ 
                fontSize: '4rem', 
                color: '#4B71D8',
                textAlign: 'center',
                marginBottom: '2rem'
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.2
              }}
            >
              Kevin Fay
            </motion.h1>
          </motion.div>
          
          <motion.div 
            className="col-24"
            variants={itemVariants}
          >
            <motion.p 
              style={{ 
                fontSize: '1.5rem', 
                textAlign: 'center',
                color: '#666',
                marginBottom: '3rem'
              }}
            >
              Creative Developer & Designer
            </motion.p>
          </motion.div>

          <motion.div 
            className="col-24 text-center"
            variants={itemVariants}
          >
            <motion.button
              style={{
                background: '#FFB8F6',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(255, 184, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        ref={projectsRef}
        className="container"
        style={{ 
          padding: '6rem 0',
          y: yProjects
        }}
      >
        <motion.h2 
          style={{ 
            textAlign: 'center', 
            marginBottom: '4rem',
            color: '#4B71D8'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          animate={isProjectsInView ? "visible" : "hidden"}
        >
          {[
            { title: 'E-commerce Platform', tech: 'React, Node.js', color: '#FFB8F6' },
            { title: 'Portfolio Website', tech: 'React, Framer Motion', color: '#E1FF69' },
            { title: 'Mobile App', tech: 'React Native', color: '#4B71D8' },
            { title: 'Design System', tech: 'Figma, Storybook', color: '#EFEFEF' }
          ].map((project, index) => (
            <motion.div
              key={project.title}
              className="col-12 col-lg-6"
              variants={projectVariants}
              whileHover="hover"
              style={{
                background: project.color,
                color: project.color === '#4B71D8' ? 'white' : 'black',
                padding: '2.5rem',
                borderRadius: '16px',
                margin: '1rem 0',
                cursor: 'pointer'
              }}
            >
              <h3 style={{ marginBottom: '1rem' }}>{project.title}</h3>
              <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>{project.tech}</p>
              <motion.div
                style={{
                  width: '50px',
                  height: '3px',
                  background: project.color === '#4B71D8' ? 'white' : '#4B71D8',
                  borderRadius: '2px'
                }}
                initial={{ width: 0 }}
                whileInView={{ width: 50 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        className="container"
        style={{ padding: '6rem 0' }}
      >
        <div className="grid align-items-center">
          <motion.div
            className="col-24 col-lg-12"
            initial={{ opacity: 0, x: -100 }}
            animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          >
            <h2 style={{ color: '#4B71D8', marginBottom: '2rem' }}>About Me</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              I'm a passionate developer who loves creating beautiful, functional experiences 
              that delight users and solve real problems.
            </p>
            <motion.button
              style={{
                background: '#E1FF69',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.div
            className="col-24 col-lg-12"
            initial={{ opacity: 0, x: 100 }}
            animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80 }}
          >
            <motion.div
              style={{
                background: '#FFB8F6',
                height: '400px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(255, 184, 246, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              Your Photo Here
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Action Button */}
      <motion.button
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#4B71D8',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(75, 113, 216, 0.3)'
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 6px 30px rgba(75, 113, 216, 0.4)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        ↑
      </motion.button>

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #FFB8F6, #E1FF69, #4B71D8)',
          transformOrigin: '0%',
          zIndex: 1000,
          scaleX: scrollYProgress
        }}
      />
    </div>
  );
}

export default PortfolioAnimations;
