import { useRef, useState, useCallback, useEffect } from 'react';
import './styles/who.scss';

import faceOn from './assets/face-on.jpg';
import faceUp from './assets/face-up.jpg';
import faceDown from './assets/face-down.jpg';
import faceLeft from './assets/face-left.jpg';
import faceRight from './assets/face-right.jpg';
import faceUpLeft from './assets/face-up-left.jpg';
import faceUpRight from './assets/face-up-right.jpg';
import faceDownLeft from './assets/face-down-left.jpg';
import faceDownRight from './assets/face-down-right.jpg';

const faceImages: Record<string, string> = {
  'on': faceOn,
  'up': faceUp,
  'down': faceDown,
  'left': faceLeft,
  'right': faceRight,
  'up-left': faceUpLeft,
  'up-right': faceUpRight,
  'down-left': faceDownLeft,
  'down-right': faceDownRight,
};

type FaceDirection = keyof typeof faceImages;

function getDirection(mouseX: number, mouseY: number, cx: number, cy: number): FaceDirection {
  const dx = mouseX - cx;
  const dy = mouseY - cy;
  const threshold = 80;

  if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return 'on';

  const horizontal = dx < -threshold ? 'left' : dx > threshold ? 'right' : '';
  const vertical = dy < -threshold ? 'up' : dy > threshold ? 'down' : '';

  if (vertical && horizontal) return `${vertical}-${horizontal}` as FaceDirection;
  if (vertical) return vertical;
  if (horizontal) return horizontal;
  return 'on';
}

function InteractiveFace() {
  const circleRef = useRef<HTMLDivElement>(null);
  const [activeDirection, setActiveDirection] = useState<FaceDirection>('on');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const direction = getDirection(e.clientX, e.clientY, cx, cy);
    setActiveDirection(direction);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="who__face-circle" ref={circleRef}>
      {Object.entries(faceImages).map(([direction, src]) => (
        <img
          key={direction}
          src={src}
          alt={`Face looking ${direction}`}
          className={`who__face-img ${activeDirection === direction ? 'who__face-img--active' : ''}`}
        />
      ))}
    </div>
  );
}

function Who() {
  return (
    <section className="who">
      <div className="container">
        <div className="grid">
          <div className="col-24">
            <h2 className="heading">
              <span>W</span><span>H</span><span>O</span>
              <span className="heading-gap" />
              <span>W</span><span>E</span>
              <span className="heading-gap" />
              <span>A</span><span>R</span><span>E</span>
            </h2>
          </div>
        </div>
        <div className="grid who__content">
          <div className="col-24 col-md-8 who__text-col">
            <h3 className="who__title">FAY+CO</h3>
            <p className="who__description">
              We're a collective of designers, developers, and creative technologists making sharp digital work without the usual agency nonsense. We build brands, websites, products, and experiences that look great, work beautifully, and avoid bloated decks, empty buzzwords, and meetings about meetings.
            </p>
          </div>
          <div className="col-md-1" />
          <div className="col-24 col-md-6 who__image-col">
            <InteractiveFace />
          </div>
          <div className="col-md-1" />
          <div className="col-24 col-md-6 who__skills">
            <h2>Builders</h2>
            <h2>Designers</h2>
            <h2>Technologists</h2>
            <h2>Strategists</h2>
            <h2>Coders</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Who;
