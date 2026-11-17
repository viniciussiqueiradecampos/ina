import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowRight } from './icons/ArrowRight';

const logoAmePet = require('../../assets/Apoiadores/ame-pet.png');
const logoFundoCasa = require('../../assets/Apoiadores/fundo-casa.webp');
const logoItauSocial = require('../../assets/Apoiadores/itau-social.png');
const logoCooperativa = require('../../assets/Apoiadores/cooperativa-catadores.png');
const logoMovimentoBemMaior = require('../../assets/Apoiadores/movimento-bem-maior.webp');
const logoPhomenta = require('../../assets/Apoiadores/phomenta.png');

interface Supporter {
  id: string;
  name: string;
  logo: any;
}

const supportersList: Supporter[] = [
  { id: 'ame-pet', name: 'Ame Pet', logo: logoAmePet },
  { id: 'fundo-casa', name: 'Fundo Casa Socioambiental', logo: logoFundoCasa },
  { id: 'itau-social', name: 'Itaú Social', logo: logoItauSocial },
  { id: 'cooperativa', name: 'Cooperativa de Catadores', logo: logoCooperativa },
  { id: 'movimento-bem-maior', name: 'Movimento Bem Maior', logo: logoMovimentoBemMaior },
  { id: 'phomenta', name: 'Phomenta', logo: logoPhomenta },
];

export function SupportersSection({ onBecomeSupporter }: { onBecomeSupporter?: () => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Single card: 220px width + 24px gap = 244px per item
  const cardWidthWithGap = 244;
  const singleSetWidth = supportersList.length * cardWidthWithGap;

  // Repeat sequence 4 times for completely seamless non-stop loop
  const marqueeItems = [
    ...supportersList,
    ...supportersList,
    ...supportersList,
    ...supportersList,
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let anim: Animated.CompositeAnimation;

    const startMarquee = () => {
      scrollX.setValue(0);
      anim = Animated.loop(
        Animated.timing(scrollX, {
          toValue: -singleSetWidth,
          duration: 25000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        })
      );
      anim.start();
    };

    startMarquee();

    return () => {
      if (anim) {
        anim.stop();
      }
    };
  }, [singleSetWidth, scrollX]);

  return (
    <View style={styles.section}>
      <View style={[styles.headerContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.headerLeft}>
          <View style={styles.kickerRow}>
            <View style={styles.kickerDot} />
            <Text style={styles.kicker}>REDE DE CONFIANÇA & PARCERIAS</Text>
          </View>
          <Text style={styles.heading}>
            Quem caminha com a gente.
          </Text>
          <Text style={styles.subtitle}>
            Organizações, fundações e redes que apoiam, financiam e constroem soluções
            de impacto duradouro ao lado das comunidades amazônicas.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onBecomeSupporter}
          style={styles.ctaButton}
          accessibilityRole="button"
          accessibilityLabel="Seja um apoiador institucional"
        >
          <Text style={styles.ctaButtonText}>Seja um parceiro / apoiador</Text>
          <ArrowRight size={17} color={colors.accentDarkText} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      {/* Infinite Animated Marquee com retângulos brancos padronizados */}
      <View style={styles.marqueeOuter}>
        {/* Left & Right Edge Vignette Fades */}
        <View pointerEvents="none" style={styles.leftVignette} />
        <View pointerEvents="none" style={styles.rightVignette} />

        <Animated.View
          style={[
            styles.marqueeTrack,
            {
              transform: [{ translateX: scrollX }],
            },
          ]}
        >
          {marqueeItems.map((supporter, idx) => (
            <View key={`${supporter.id}-${idx}`} style={styles.whiteLogoBox}>
              <Image
                source={supporter.logo}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: '#0a271c',
    paddingVertical: 90,
    overflow: 'hidden',
    position: 'relative',
  },
  headerContainer: {
    width: '100%',
    maxWidth: 1382.4,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 32,
    marginBottom: 50,
  },
  headerLeft: {
    maxWidth: 680,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  kicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '700',
  },
  heading: {
    fontFamily: fonts.serif,
    fontSize: 48,
    lineHeight: 52,
    color: colors.white,
    letterSpacing: -1.4,
    fontWeight: '400',
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.78)',
  },
  ctaButton: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 26,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  ctaButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  marqueeOuter: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 16,
    position: 'relative',
  },
  leftVignette: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 120,
    zIndex: 2,
    ...Platform.select({
      web: {
        background: 'linear-gradient(to right, #0a271c 0%, rgba(10, 39, 28, 0) 100%)',
      },
      default: {
        backgroundColor: 'transparent',
      },
    }),
  },
  rightVignette: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 120,
    zIndex: 2,
    ...Platform.select({
      web: {
        background: 'linear-gradient(to left, #0a271c 0%, rgba(10, 39, 28, 0) 100%)',
      },
      default: {
        backgroundColor: 'transparent',
      },
    }),
  },
  marqueeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  whiteLogoBox: {
    width: 220,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});
