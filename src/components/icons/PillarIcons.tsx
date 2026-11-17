import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// 01 Escuta Ativa: Speech dialogue bubble with active listening soundwaves / hearing
export function EscutaAtivaIcon({ size = 32, color = '#8D9F6F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1001 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.89999C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.115 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91569 21 11V11.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 11.5C8.5 11.5 10 9.5 12 9.5C14 9.5 15.5 11.5 15.5 11.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="14" r="1" fill={color} />
    </Svg>
  );
}

// 02 Soberania Econômica: Sprout / plant seedling emerging from cooperative hands & growth
export function SoberaniaIcon({ size = 32, color = '#143d2b' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22V12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12C12 7.5 15.5 4 20 4C20 8.5 16.5 12 12 12Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C12 11.5 9 8.5 5 8.5C5 12 8 15 12 15Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 22H20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// 03 Justiça Socioambiental: Guardian shield with leaf & flowing water
export function JusticaSocioambientalIcon({ size = 32, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 7C9.5 9.5 9.5 13.5 12 16C14.5 13.5 14.5 9.5 12 7Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 11V16"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
