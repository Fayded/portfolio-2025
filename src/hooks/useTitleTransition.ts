import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';

export const useTitleAnimation = (
  h1Ref: RefObject<HTMLHeadingElement | null>
) => {
  useEffect(() => {
    if (!h1Ref.current) return;

    const chars = h1Ref.current.querySelectorAll('.char');
    const firstChar = chars[0];
    const secondChar = chars[1];
    const thirdChar = chars[2];
    const fourthChar = chars[3];
    const lastChar = chars[chars.length - 1];

    // Set display inline-block for transforms to work
    gsap.set(chars, { display: 'inline-block' });

    // Get the initial position of characters to calculate proper offsets
    const firstCharRect = (firstChar as HTMLElement).getBoundingClientRect();
    const secondCharRect = (secondChar as HTMLElement).getBoundingClientRect();
    const thirdCharRect = (thirdChar as HTMLElement).getBoundingClientRect();
    const fourthCharRect = (fourthChar as HTMLElement).getBoundingClientRect();
    const lastCharRect = (lastChar as HTMLElement).getBoundingClientRect();

    // Calculate distances to corners from current positions
    const firstToLeft = -(firstCharRect.left - 20); // 20px padding from edge
    const firstToTop = -(firstCharRect.top - 20);
    const lastToRight = window.innerWidth - lastCharRect.right - 20;
    const lastToBottom = window.innerHeight - lastCharRect.bottom - 20;

    const fourthToLeftQuarter =
      window.innerWidth / 4 - fourthCharRect.left - fourthCharRect.width / 2;
    const fourthToBottom = window.innerHeight - fourthCharRect.bottom - 20;

    const secondToCenter =
      window.innerWidth / 2 - secondCharRect.left - secondCharRect.width / 2;
    const secondToTop = -(secondCharRect.top - 20);

    const lastToRightQuarter =
      (window.innerWidth * 3) / 4 - lastCharRect.left - lastCharRect.width / 2;

    const fourthToRightQuarter =
      (window.innerWidth * 3) / 4 -
      fourthCharRect.left -
      fourthCharRect.width / 2;

    const secondToLeftQuarter =
      window.innerWidth / 4 - secondCharRect.left - secondCharRect.width / 2;

    const thirdToRight = window.innerWidth - thirdCharRect.right - 20;
    const thirdToTop = -(thirdCharRect.top - 20);

    const lastToTop = -(lastCharRect.top - 20);
    const fourthToTop = -(fourthCharRect.top - 20);

    // Animate first character: far left, then top left
    const tl1 = gsap
      .timeline({ delay: 2 })
      .to(firstChar, {
        x: firstToLeft,
        duration: 0.7,
        ease: 'power2.inOut',
      })
      .to(firstChar, {
        y: firstToTop,
        duration: 0.7,
        ease: 'power2.inOut',
      });

    // Animate last character (O): far right, then down, then to 3/4 position
    gsap
      .timeline({ delay: 2 })
      .to(lastChar, {
        x: lastToRight,
        duration: 0.7,
        ease: 'power2.inOut',
      })
      .to(lastChar, {
        y: lastToBottom,
        duration: 0.7,
        ease: 'power2.inOut',
      })
      .to(lastChar, {
        x: lastToRightQuarter,
        duration: 0.7,
        ease: 'power2.inOut',
      });

    // After first animation completes, animate second, third and fourth characters
    tl1.then(() => {
      // Animate second character (A): to center, then up
      gsap
        .timeline()
        .to(secondChar, {
          x: secondToCenter,
          duration: 0.7,
          ease: 'power2.inOut',
        })
        .to(secondChar, {
          y: secondToTop,
          duration: 0.7,
          ease: 'power2.inOut',
        });

      // Animate third character (Y): up, then to far right
      gsap
        .timeline()
        .to(thirdChar, {
          y: thirdToTop,
          duration: 0.7,
          ease: 'power2.inOut',
        })
        .to(thirdChar, {
          x: thirdToRight,
          duration: 0.7,
          ease: 'power2.inOut',
        });

      // Animate fourth character (C): down, then to 1/4 position
      const tl4 = gsap
        .timeline()
        .to(fourthChar, {
          y: fourthToBottom,
          duration: 0.7,
          ease: 'power2.inOut',
        })
        .to(fourthChar, {
          x: fourthToLeftQuarter,
          duration: 0.7,
          ease: 'power2.inOut',
        });

      // After all animations complete, wait 2 seconds then rearrange
      tl4.then(() => {
        setTimeout(() => {
          // Animate O: right, then up (stays on the right)
          gsap
            .timeline()
            .to(lastChar, {
              x: lastToRight,
              duration: 0.7,
              ease: 'power2.inOut',
            })
            .to(lastChar, {
              y: lastToTop,
              duration: 0.7,
              ease: 'power2.inOut',
            });

          // Animate C: to 3/4 position, then up to top (same time as O)
          gsap
            .timeline()
            .to(fourthChar, {
              x: fourthToRightQuarter,
              duration: 0.7,
              ease: 'power2.inOut',
            })
            .to(fourthChar, {
              y: fourthToTop,
              duration: 0.7,
              ease: 'power2.inOut',
            });

          // Animate A and Y at the same time
          gsap.to(secondChar, {
            x: secondToLeftQuarter,
            duration: 0.7,
            ease: 'power2.inOut',
          });
          gsap.to(thirdChar, {
            x: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          });
        }, 2000);
      });
    });
  }, [h1Ref]);
};
