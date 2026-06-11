import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTitleAnimation } from './hooks/useTitleTransition';
import './styles/splash.scss';

function Splash() {
  const title = useRef<HTMLHeadingElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onSplashComplete = useCallback(() => {
    if (!wrapper.current) return;
    gsap.to(wrapper.current, {
      height: '70vh',
      duration: 1.2,
      ease: 'power2.inOut',
      delay: 0.5,
    });
  }, []);

  useTitleAnimation(title, onSplashComplete);

  return (
    <div className="splash-wrapper" ref={wrapper}>
      <header className="splash">
        <h1 ref={title}>
          {'FAYCO'.split('').map((char, index) => (
            <span key={index} className="char">
              {char}
            </span>
          ))}
        </h1>
      </header>
    </div>
  );
}

export default Splash;
