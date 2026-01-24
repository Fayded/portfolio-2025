import { useEffect, useRef } from 'react';
import type { RefObject, Dispatch, SetStateAction } from 'react';
import { gsap } from 'gsap';

export const useLabelAnimation = (
  labelRef: RefObject<HTMLHeadingElement | null>,
  labels: string[],
  currentIndex: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>
) => {
  const startTimeRef = useRef<number | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!labelRef.current) return;

    // Set start time only once
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const chars = labelRef.current.querySelectorAll('.label-char');

    // Set initial state - characters positioned below the mask
    gsap.set(chars, {
      display: 'inline-block',
      y: '100%',
    });

    // Animate in
    const delay = currentIndex === 0 ? 5000 : 0;
    const timeout1 = setTimeout(() => {
      // Check if we've passed 15s
      if (startTimeRef.current && Date.now() - startTimeRef.current >= 15000) {
        return;
      }

      gsap.to(chars, {
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.05,
      });

      // Animate out and cycle to next label
      const timeout2 = setTimeout(() => {
        // Check again if we've passed 15s
        if (
          startTimeRef.current &&
          Date.now() - startTimeRef.current >= 15000
        ) {
          return;
        }

        gsap.to(chars, {
          y: '100%',
          duration: 0.5,
          ease: 'power2.in',
          stagger: 0.03,
          onComplete: () => {
            if (
              startTimeRef.current &&
              Date.now() - startTimeRef.current < 15000
            ) {
              setCurrentIndex((prev) => (prev + 1) % labels.length);
            }
          },
        });
      }, 2500); // Hold for 2.5s before transitioning (total cycle: ~3.8s per label)

      timeoutsRef.current.push(timeout2);
    }, delay);

    timeoutsRef.current.push(timeout1);

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [currentIndex, labelRef, labels, setCurrentIndex]);
};
