import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SocialIconProps {
  size?: number;
  color?: string;
}

export function InstagramIcon({ size = 18, color = '#ffffff' }: SocialIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 6.5h.01"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LinkedInIcon({ size = 18, color = '#ffffff' }: SocialIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x="2"
        y="9"
        width="4"
        height="12"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M4 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
        fill={color}
      />
    </Svg>
  );
}

export function YouTubeIcon({ size = 18, color = '#ffffff' }: SocialIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
        fill={color}
      />
    </Svg>
  );
}
