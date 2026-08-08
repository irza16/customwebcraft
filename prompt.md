Replace the broken StrokeText hero wordmark with BlurText from React Bits.
StrokeText uses GSAP which keeps breaking in Next.js SSR. BlurText uses 
Framer Motion which is already installed and works perfectly.

## Step 1 — Create /app/components/ui/BlurText.jsx

```jsx
'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

const buildKeyframes = (from, steps, to) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap(s => Object.keys(s)),
    ...Object.keys(to)
  ]);
  const keyframes = {};
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
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = [0.25, 0.4, 0.45, 0.95],
  onAnimationComplete,
  stepDuration = 0.35,
  animationSteps = [],
  startOnView = true,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const MotionComponent = animateBy === 'words' ? motion.span : motion.span;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold, rootMargin });
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
              ? { duration: stepDuration * (animationSteps.length + 1), delay: (index * delay) / 1000, ease: easing }
              : { duration: stepDuration, delay: (index * delay) / 1000, ease: easing }
          }
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 ? '' : ''}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
```

## Step 2 — Replace StrokeText in page.tsx hero with BlurText

Remove ALL StrokeText imports and usage from the hero. Remove isMobile and 
heroFontSize state. Replace the wordmark div with:

```tsx
import BlurText from './components/ui/BlurText';

{/* Hero wordmark */}
<div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '120px 0 0 0', textAlign: 'center' }}>
  <BlurText
    text="customwebcraft"
    delay={80}
    animateBy="characters"
    direction="top"
    startOnView={false}
    className="hero-wordmark"
    stepDuration={0.4}
  />
</div>
```

## Step 3 — Add CSS to globals.css

```css
.hero-wordmark {
  font-size: clamp(3.5rem, 14vw, 12rem);
  font-weight: 900;
  color: #f0ede6;
  letter-spacing: -4px;
  line-height: 0.9;
  text-transform: lowercase;
  justify-content: center !important;
}

@media (max-width: 480px) {
  .hero-wordmark {
    font-size: clamp(3rem, 18vw, 5rem);
    letter-spacing: -2px;
    word-break: break-all;
  }
}
```

## Step 4 — Remove unused StrokeText dynamic import and states

Delete from page.tsx:
- const StrokeText = dynamic(...)
- const [isMobile, setIsMobile] = useState(false)
- const [heroFontSize, setHeroFontSize] = useState(160)
- The useEffect that sets isMobile and heroFontSize
