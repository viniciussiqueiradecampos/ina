import React, { useEffect, useState, useRef } from 'react';
import { Text, TextStyle, Animated, Platform } from 'react-native';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatThousands?: boolean;
  style?: TextStyle | (TextStyle | undefined)[];
}

export function AnimatedCounter({
  target,
  duration = 1800,
  prefix = '',
  suffix = '',
  formatThousands = false,
  style,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // Fade & scale entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    // Counting number animation with smooth cubic out easing
    const startTime = Date.now();
    let frameId: number;

    const updateCounter = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        if (typeof requestAnimationFrame !== 'undefined') {
          frameId = requestAnimationFrame(updateCounter);
        } else {
          setTimeout(updateCounter, 16);
        }
      } else {
        setDisplayValue(target);
      }
    };

    if (typeof requestAnimationFrame !== 'undefined') {
      frameId = requestAnimationFrame(updateCounter);
    } else {
      setTimeout(updateCounter, 16);
    }

    return () => {
      if (typeof cancelAnimationFrame !== 'undefined' && frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [target, duration, fadeAnim, scaleAnim]);

  const formattedNumber = formatThousands
    ? displayValue.toLocaleString('pt-BR')
    : displayValue.toString();

  return (
    <Animated.Text
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {prefix}
      {formattedNumber}
      {suffix}
    </Animated.Text>
  );
}
