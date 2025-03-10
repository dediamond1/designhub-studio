
import { useEffect, useState, useCallback, RefObject } from 'react';

export const useImageLoad = () => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  return { loaded, handleImageLoaded };
};

export const useScrollReveal = (
  ref: RefObject<HTMLElement>,
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, rootMargin]);

  return isVisible;
};

export const useParallax = (speed: number = 0.1) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    transform: `translateY(${offset * speed}px)`,
  };
};

export const useNavbarTransition = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};
