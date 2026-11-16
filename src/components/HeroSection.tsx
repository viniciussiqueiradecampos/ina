import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../constants/theme';
import { ArrowRight } from './icons/ArrowRight';
import { ArrowUpRight } from './icons/ArrowUpRight';
import { FadeInUp } from './FadeInUp';

const heroBg = require('../../assets/hero-bg.png');

interface HeroSectionProps {
  onOpenDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function HeroSection({ onOpenDonate, onNavigate }: HeroSectionProps = {}) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  // Responsive calculations
  const heroHeight = isDesktop
    ? Math.max(540, Math.min(height - 120, 680))
    : isTablet
    ? Math.max(520, Math.min(height - 110, 620))
    : undefined;

  const contentPaddingHorizontal = isDesktop ? 76.8 : isTablet ? 40 : 24;
  const contentPaddingVertical = isDesktop ? 40 : 28;

  const headingFontSize = isDesktop ? 65 : isTablet ? 48 : 34;
  const headingLineHeight = isDesktop ? 64 : isTablet ? 48 : 38;

  return (
    <View style={styles.heroOuterContainer}>
      <View
        style={[
          styles.heroCard,
          heroHeight ? { height: heroHeight } : { minHeight: 480 },
        ]}
      >
        <ImageBackground
          source={heroBg}
          style={StyleSheet.absoluteFill}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Horizontal Gradient Overlay (left to right) */}
          <LinearGradient
            colors={[
              'rgba(4, 29, 19, 0.90)',
              'rgba(4, 29, 19, 0.40)',
              'rgba(4, 29, 19, 0.05)',
            ]}
            locations={[0, 0.65, 1.0]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Vertical Gradient Overlay (bottom to top for text legibility) */}
          <LinearGradient
            colors={['rgba(4, 29, 19, 0.60)', 'rgba(4, 29, 19, 0.0)']}
            locations={[0, 0.55]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Content Container */}
          <View
            style={[
              styles.contentContainer,
              {
                paddingHorizontal: contentPaddingHorizontal,
                paddingVertical: contentPaddingVertical,
              },
            ]}
          >
            {/* Tag / Kicker */}
            <FadeInUp delay={80} distance={14}>
              <Text style={styles.kicker}>INÃ SIGNIFICA NÓS</Text>
            </FadeInUp>

            {/* Main Heading */}
            <FadeInUp delay={180} distance={20} style={styles.headingWrapper}>
              <Text
                style={[
                  styles.heading,
                  {
                    fontSize: headingFontSize,
                    lineHeight: headingLineHeight,
                  },
                ]}
              >
                Uma nova Amazônia começa por quem vive nela.
              </Text>
            </FadeInUp>

            {/* Subtitle */}
            <FadeInUp delay={300} distance={20}>
              <Text style={styles.subtitle}>
                Construímos caminhos para o desenvolvimento sustentável, econômico e
                igualitário de comunidades tradicionais e em situação de risco.
              </Text>
            </FadeInUp>

            {/* CTA Buttons Row */}
            <FadeInUp delay={420} distance={20} style={styles.ctaRow}>
              {/* Primary Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={onOpenDonate}
                style={styles.primaryButton}
                accessibilityRole="button"
                accessibilityLabel="Quero transformar junto"
              >
                <Text style={styles.primaryButtonText}>Quero transformar junto</Text>
                <View style={styles.buttonArrowWrapper}>
                  <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.4} />
                </View>
              </TouchableOpacity>

              {/* Secondary Link */}
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => onNavigate && onNavigate('O Instituto')}
                style={styles.secondaryLink}
                accessibilityRole="button"
                accessibilityLabel="Conheça o INÃ"
              >
                <Text style={styles.secondaryLinkText}>Conheça o INÃ</Text>
                <View style={styles.linkArrowWrapper}>
                  <ArrowUpRight size={17} color={colors.white} strokeWidth={1.4} />
                </View>
              </TouchableOpacity>
            </FadeInUp>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroOuterContainer: {
    width: '100%',
    paddingHorizontal: 14,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  heroCard: {
    width: '100%',
    maxWidth: 1508,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0a2318',
  },
  backgroundImage: {
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 880,
    zIndex: 2,
  },
  kicker: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 2.04,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '700',
    marginBottom: 16,
  },
  headingWrapper: {
    maxWidth: 760,
    marginBottom: 20,
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.white,
    letterSpacing: -1.8,
    fontWeight: '400',
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.whiteMuted,
    maxWidth: 620,
    marginBottom: 28,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    minHeight: 56,
    paddingLeft: 28,
    paddingRight: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  primaryButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  buttonArrowWrapper: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 4,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.white,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  secondaryLinkText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.white,
    fontWeight: '700',
  },
  linkArrowWrapper: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
