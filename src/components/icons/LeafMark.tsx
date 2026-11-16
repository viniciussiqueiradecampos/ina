import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface LeafMarkProps {
  size?: number;
  color?: string;
}

export function LeafMark({ size = 34, color = '#143D2B' }: LeafMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <G id="LeafMark">
        <Path
          d="M17 30.7308C10.4615 25.5 5.88462 18.9615 6.53846 12.4231C12.4231 13.0769 17 16.3462 19.6154 20.9231"
          stroke={color}
          strokeWidth={1.43846}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.6538 30.7308C16.3462 21.5769 19.6154 13.0769 27.4615 7.84615C29.4231 17 26.1538 25.5 17.6538 30.7308Z"
          stroke={color}
          strokeWidth={1.43846}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
