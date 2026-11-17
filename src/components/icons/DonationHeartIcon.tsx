import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface DonationHeartIconProps {
  size?: number;
  color?: string;
}

export function DonationHeartIcon({
  size = 18,
  color = '#ffffff',
}: DonationHeartIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Hand receiving/holding open palm */}
      <Path
        d="M2 13h4.2c1.2 0 2.3.6 2.9 1.6l1.3 2.1c.5.8 1.4 1.3 2.4 1.3h5.2a2 2 0 0 0 2-2v-.2c0-1.1-.9-2-2-2h-3.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 17h3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Heart floating above hand */}
      <Path
        d="M17.5 3.5c-2.3 0-3.5 1.8-3.5 1.8s-1.2-1.8-3.5-1.8A3.5 3.5 0 0 0 7 7c0 3.3 5.4 6.8 7 8 1.6-1.2 7-4.7 7-8a3.5 3.5 0 0 0-3.5-3.5z"
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
