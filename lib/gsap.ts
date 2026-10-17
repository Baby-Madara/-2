import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Check if the user is on a touch device or prefers reduced motion
 */
export const isTouchOrReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return true;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isTouch || prefersReduced;
};

/**
 * Hook for Luxury Magnetic CTA Buttons (Award-winning Front-End Agency signature)
 * Pulls the button towards the cursor on proximity with organic spring release.
 */
export const useGsapMagnetic = <T extends HTMLElement>(strength: number = 0.35) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchOrReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      xTo(distanceX);
      yTo(distanceY);
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return ref;
};

/**
 * Hook for 3D Perspective Tilt on Cards (Stripe / Apple / Awwwards aesthetic)
 * Smoothly tilts the card towards the mouse cursor without mechanical CSS snapping.
 */
export const useGsapTilt3D = <T extends HTMLElement>(maxTilt: number = 7) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchOrReducedMotion()) return;

    const rotXTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const rotYTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power2.out' });

    gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 2 - 1; // -1 to 1
      const yPercent = (y / rect.height) * 2 - 1; // -1 to 1

      rotYTo(xPercent * maxTilt);
      rotXTo(-yPercent * maxTilt);
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { rotationX: 0, rotationY: 0, scale: 1 });
    };
  }, [maxTilt]);

  return ref;
};

/**
 * Hook for Smooth Organic Number Counter Roll
 */
export const useGsapCounter = (endValue: number, duration: number = 2) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: endValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) {
              el.innerText = Math.round(obj.val).toLocaleString();
            }
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [endValue, duration]);

  return ref;
};
