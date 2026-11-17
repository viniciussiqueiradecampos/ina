import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, G, Defs, Pattern, Rect } from 'react-native-svg';

interface AmazonTextureProps {
  variant?: 'river' | 'foliage' | 'marajoara' | 'watermark';
  color?: string;
  opacity?: number;
  style?: ViewStyle;
}

export function AmazonTexture({
  variant = 'river',
  color = '#255a3f',
  opacity = 0.05,
  style,
}: AmazonTextureProps) {
  if (variant === 'river') {
    // Flowing Amazonian river meanders (meandros fluviais da Bacia Amazônica)
    return (
      <View
        pointerEvents="none"
        style={[styles.container, { opacity }, style]}
      >
        <Svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <Path
            d="M-50,120 C180,60 280,240 520,160 C760,80 840,260 1080,180 C1180,140 1250,190 1300,160"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          <Path
            d="M-50,220 C140,160 320,380 580,280 C840,180 920,400 1140,320 C1220,290 1270,330 1320,300"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
          />
          <Path
            d="M-50,340 C220,280 340,520 640,420 C940,320 980,540 1200,460 C1250,440 1290,470 1340,450"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <Path
            d="M-50,460 C160,400 380,590 700,510 C1020,430 1060,590 1260,530"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
          />
        </Svg>
      </View>
    );
  }

  if (variant === 'foliage') {
    // Delicate tropical leaf venation network (nervuras orgânicas de folhas amazônicas)
    return (
      <View
        pointerEvents="none"
        style={[styles.container, { opacity }, style]}
      >
        <Svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <G stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Main branch 1 */}
            <Path d="M100,550 Q300,350 450,100" strokeWidth="3" />
            <Path d="M220,430 Q160,380 120,360" strokeWidth="1.5" />
            <Path d="M260,390 Q340,350 380,330" strokeWidth="1.5" />
            <Path d="M310,340 Q250,290 200,270" strokeWidth="1.5" />
            <Path d="M360,280 Q430,240 480,220" strokeWidth="1.5" />
            <Path d="M400,210 Q340,170 300,150" strokeWidth="1.5" />
            <Path d="M430,140 Q490,110 530,90" strokeWidth="1.2" />

            {/* Main branch 2 */}
            <Path d="M750,550 Q580,320 480,50" strokeWidth="2.5" />
            <Path d="M680,440 Q740,390 770,360" strokeWidth="1.5" />
            <Path d="M630,370 Q560,330 520,310" strokeWidth="1.5" />
            <Path d="M570,280 Q640,240 670,220" strokeWidth="1.5" />
            <Path d="M530,190 Q470,160 440,140" strokeWidth="1.2" />
          </G>
        </Svg>
      </View>
    );
  }

  if (variant === 'watermark') {
    // Elegant geometric diagonal intersections as designed in Figma node 26:27
    return (
      <View
        pointerEvents="none"
        style={[styles.container, { opacity }, style]}
      >
        <Svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <G stroke={color} strokeWidth="1" fill="none">
            <Path d="M-100,50 L800,650" />
            <Path d="M600,-50 L1550,550" />
            <Path d="M300,-100 L1100,700" />
            <Path d="M1200,-50 L400,650" strokeWidth="0.8" />
            <Path d="M1500,100 L700,650" strokeWidth="0.8" />
            <Path d="M900,-80 L150,600" strokeWidth="0.8" />
          </G>
        </Svg>
      </View>
    );
  }

  // Atmospheric organic canopy leaf cluster default fallback
  return (
    <View
      pointerEvents="none"
      style={[styles.container, { opacity }, style]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
        <G fill={color}>
          <Path d="M300,100 C380,140 450,220 440,330 C430,420 360,480 300,520 C240,480 170,420 160,330 C150,220 220,140 300,100 Z" />
          <Path d="M120,250 C180,280 230,340 220,410 C210,470 160,510 120,530 C80,510 40,470 30,410 C20,340 70,280 120,250 Z" />
          <Path d="M480,250 C540,280 590,340 580,410 C570,470 520,510 480,530 C440,510 400,470 390,410 C380,340 430,280 480,250 Z" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
});
