import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface ArrowRightProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function ArrowRight({ size = 19, color = '#08281C', strokeWidth = 1.34583 }: ArrowRightProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
      <G id="Arrow">
        <Path
          d="M3.95833 9.5H15.0417M11.0833 13.4583L15.0417 9.5L11.0833 5.54167"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
