import { useRef } from 'react';
import { useTitleAnimation } from './hooks/useTitleTransition';
import './styles/splash.scss';

function Splash() {
  const title = useRef<HTMLHeadingElement>(null);

  useTitleAnimation(title);

  return (
    <header className="splash">
      <h1 ref={title}>
        {'FAYCO'.split('').map((char, index) => (
          <span key={index} className="char">
            {char}
          </span>
        ))}
      </h1>
    </header>
  );
}

export default Splash;
