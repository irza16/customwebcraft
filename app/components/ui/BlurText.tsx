'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  margin?: string | number | (string | number)[];
  animationFrom?: Record<string, number | string>;
  animationTo?: Record<string, number | string>;
  easing?: number[] | ((t: number) => number);
  onAnimationComplete?: () => void;
  stepDuration?: number;
  animationSteps?: Array<Record<string, number | string>>;
  startOnView?: boolean;
}

const buildKeyframes = (from: Record<string, number | string>, steps: Array<Record<string, number | string>>, to: Record<string, number | string>) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap(s => Object.keys(s)),
    ...Object.keys(to)
  ]);
  const keyframes: Record<string, (number | string)[]> = {};
  keys.forEach(key => {
    keyframes[key] = [
      from[key],
      ...steps.map(s => s[key]),
      to[key]
    ];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  margin = '0px',
  animationFrom,
  animationTo,
  easing = [0.25, 0.4, 0.45, 0.95],
  onAnimationComplete,
  stepDuration = 0.35,
  animationSteps = [],
  startOnView = true,
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold, margin: margin as any });
  const controls = useAnimation();

  const defaultFrom = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, y: -50 }
    : { filter: 'blur(10px)', opacity: 0, y: 50 };
  const defaultTo = { filter: 'blur(0px)', opacity: 1, y: 0 };

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshot = animationTo ?? defaultTo;

  const keyframes = animationSteps.length > 0
    ? buildKeyframes(fromSnapshot, animationSteps, toSnapshot)
    : null;

  useEffect(() => {
    if ((!startOnView || inView)) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls, startOnView]);

  return (
    <p ref={ref} className={`blur-text ${className}`} style={{ display: 'flex', flexWrap: 'wrap', gap: animateBy === 'words' ? '0.25em' : '0' }}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: fromSnapshot,
            visible: keyframes
              ? { ...keyframes }
              : toSnapshot,
          }}
          transition={
            keyframes
              ? { duration: stepDuration * (animationSteps.length + 1), delay: (index * delay) / 1000, ease: easing as any }
              : { duration: stepDuration, delay: (index * delay) / 1000, ease: easing as any }
          }
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {segment === ' ' ? ' ' : segment}
          {animateBy === 'words' && index < elements.length - 1 ? '' : ''}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;