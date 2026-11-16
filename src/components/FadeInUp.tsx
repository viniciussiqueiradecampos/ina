import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, Platform } from 'react-native';

type StyleProp = ViewStyle | undefined | null | false;

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: StyleProp | StyleProp[];
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 750,
  distance = 24,
  style,
}: FadeInUpProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 35,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, distance, opacity, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
