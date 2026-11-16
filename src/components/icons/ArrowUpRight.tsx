import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface ArrowUpRightProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function ArrowUpRight({ size = 19, color = '#ffffff', strokeWidth = 1.34583 }: ArrowUpRightProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
      <G id="Arrow">
        <Path
          d="M5.54167 13.4583L13.4583 5.54167M13.4583 12.6667V5.54167H6.33333"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
