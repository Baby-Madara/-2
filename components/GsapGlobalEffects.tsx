import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger, isTouchOrReducedMotion } from '../lib/gsap';

/**
 * Global GSAP Effects Orchestrator
 * Adds human-crafted agency micro-interactions (magnetic CTAs, 3D tilt, subtle scroll parallax)
 * completely non-destructively without modifying core business logic or layout.
 */
const GsapGlobalEffects: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (isTouchOrReducedMotion()) return;

    // 1. Magnetic Effect on all elements marked with .gsap-magnetic
    const magneticElements = document.querySelectorAll<HTMLElement>('.gsap-magnetic');
    const cleanups: Array<() => void> = [];

    magneticElements.forEach((el) => {
      const strength = parseFloat(el.getAttribute('data-strength') || '0.3');
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        xTo((e.clientX - centerX) * strength);
        yTo((e.clientY - centerY) * strength);
      };

      const onMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      cleanups.push(() => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    // 2. 3D Tilt on all elements marked with .gsap-tilt
    const tiltElements = document.querySelectorAll<HTMLElement>('.gsap-tilt');
    tiltElements.forEach((el) => {
      const maxTilt = parseFloat(el.getAttribute('data-max-tilt') || '6');
      const rotXTo = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power2.out' });
      const rotYTo = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power2.out' });

      gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotYTo(x * (maxTilt * 2));
        rotXTo(-y * (maxTilt * 2));
      };

      const onMouseLeave = () => {
        gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      cleanups.push(() => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    // 3. Ambient Parallax on elements with .gsap-parallax
    const parallaxElements = document.querySelectorAll<HTMLElement>('.gsap-parallax');
    const scrollTriggers: ScrollTrigger[] = [];

    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.15');
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const y = (self.progress - 0.5) * (speed * 100);
          gsap.set(el, { y });
        },
      });
      scrollTriggers.push(st);
    });

    // Refresh ScrollTrigger when DOM is settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanups.forEach((fn) => fn());
      scrollTriggers.forEach((st) => st.kill());
    };
  }, [location.pathname]);

  return null;
};

export default GsapGlobalEffects;
