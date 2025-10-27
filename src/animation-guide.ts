// Framer Motion Animation Guide for Portfolio 2025

/*
🎭 FRAMER MOTION CHEAT SHEET

📦 Installation:
pnpm add framer-motion

📥 Basic Imports:
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

🎯 COMMON ANIMATION PATTERNS FOR PORTFOLIOS:

1. 📜 SCROLL-BASED ANIMATIONS
   =============================
   - Perfect for hero sections, parallax effects
   - Smooth performance with hardware acceleration

   const { scrollYProgress } = useScroll();
   const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
   
   <motion.div style={{ y }}>
     Content that moves on scroll
   </motion.div>

2. 🎪 ENTRANCE ANIMATIONS (Scroll Into View)
   ==========================================
   - Great for project cards, about sections
   - Triggers once when element enters viewport

   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, amount: 0.3 });
   
   <motion.div
     ref={ref}
     initial={{ opacity: 0, y: 100 }}
     animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
     transition={{ duration: 0.6, type: "spring" }}
   >
     Content that animates in
   </motion.div>

3. 🖱️ HOVER & CLICK INTERACTIONS
   ===============================
   - Essential for buttons, project cards, CTAs
   - Provides immediate user feedback

   <motion.button
     whileHover={{ scale: 1.05, y: -5 }}
     whileTap={{ scale: 0.95 }}
     transition={{ type: "spring", stiffness: 300 }}
   >
     Interactive Button
   </motion.button>

4. 📋 STAGGERED LIST ANIMATIONS
   =============================
   - Perfect for skill lists, project grids
   - Creates elegant sequential reveals

   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.1 }
     }
   };

   const itemVariants = {
     hidden: { y: 20, opacity: 0 },
     visible: { y: 0, opacity: 1 }
   };

5. 🔄 PAGE TRANSITIONS
   ====================
   - For route changes, modal overlays
   - Smooth content swapping

   <AnimatePresence mode="wait">
     {showContent && (
       <motion.div
         initial={{ opacity: 0, x: -100 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 100 }}
       >
         Content
       </motion.div>
     )}
   </AnimatePresence>

⚡ PERFORMANCE TIPS:
==================
- Use transform properties (x, y, scale, rotate) instead of changing layout properties
- Set `will-change: transform` for elements that animate frequently
- Use `layoutId` for shared element transitions
- Prefer `useTransform` for scroll-based animations (more performant)

🎨 PORTFOLIO-SPECIFIC USE CASES:
===============================

Hero Section:
- Text reveal with staggered animation
- Background parallax effect
- CTA button hover states

Project Gallery:
- Cards that lift on hover
- Image reveal animations
- Filter transitions

About Section:
- Text slides in from left
- Image slides in from right
- Skill bars animate on scroll

Navigation:
- Mobile menu slide transitions
- Active link indicators
- Scroll progress bar

Contact Form:
- Input focus animations
- Submit button states
- Success/error feedback

🔧 RECOMMENDED FOLDER STRUCTURE:
===============================
src/
  components/
    animations/
      HeroAnimation.tsx
      ProjectCard.tsx
      ScrollProgress.tsx
  hooks/
    useScrollAnimations.ts
    useViewportAnimations.ts
  styles/
    animations.scss  // Custom animation utilities

💡 PRO TIPS:
===========
1. Start with subtle animations - less is more
2. Use consistent easing curves throughout your site
3. Test on mobile devices - some animations may be too intensive
4. Consider user preferences (prefers-reduced-motion)
5. Use loading states for better perceived performance

🎯 COMMON ANIMATION VALUES:
==========================
Duration: 0.3-0.8s (longer for complex animations)
Spring stiffness: 100-300 (higher = snappier)
Spring damping: 10-30 (higher = less bouncy)
Scale hover: 1.02-1.1 (subtle is better)
Y offset: 20-100px (depending on element size)

Example spring config for different feels:
- Bouncy: { type: "spring", stiffness: 400, damping: 17 }
- Smooth: { type: "spring", stiffness: 100, damping: 20 }
- Gentle: { type: "spring", stiffness: 50, damping: 25 }

🚀 READY-TO-USE COMPONENTS:
==========================
Check out:
- AnimationExamples.tsx (comprehensive examples)
- PortfolioAnimations.tsx (portfolio-specific patterns)
*/

export {}; // Make this a module
