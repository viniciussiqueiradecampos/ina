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
import { DonationHeartIcon } from './icons/DonationHeartIcon';

const ctaBg = require('../../assets/hero-bg.png');

interface CTASectionProps {
  onOpenDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function CTASection({ onOpenDonate, onNavigate }: CTASectionProps = {}) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 24;
  const headingFontSize = isDesktop ? 96 : isTablet ? 60 : 40;
  const headingLineHeight = isDesktop ? 96 : isTablet ? 64 : 44;

  return (
    <View style={styles.section}>
      <ImageBackground
        source={ctaBg}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Dark Gradient Overlay */}
        <LinearGradient
          colors={['rgba(4, 29, 19, 0.95)', 'rgba(4, 29, 19, 0.65)', 'rgba(4, 29, 19, 0.35)']}
          locations={[0, 0.5, 1.0]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Content Container */}
        <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
          <Text style={styles.kicker}>Todo mundo pode fazer parte</Text>

          <Text
            style={[
              styles.heading,
              {
                fontSize: headingFontSize,
                lineHeight: headingLineHeight,
              },
            ]}
          >
            Quando a gente soma,{'\n'}a mudança se multiplica.
          </Text>

          {/* CTA Buttons Row */}
          <View style={styles.ctaRow}>
            {/* Primary Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onOpenDonate}
              style={styles.primaryButton}
              accessibilityRole="button"
              accessibilityLabel="Fazer doação"
            >
              <DonationHeartIcon size={18} color={colors.accentDarkText} />
              <Text style={styles.primaryButtonText}>Fazer doação</Text>
            </TouchableOpacity>

            {/* Secondary Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onNavigate && onNavigate('Voluntários')}
              style={styles.secondaryButton}
              accessibilityRole="button"
              accessibilityLabel="Ser um voluntário"
            >
              <Text style={styles.secondaryButtonText}>Ser um voluntário</Text>
              <ArrowRight size={17} color={colors.white} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    minHeight: 650,
    backgroundColor: '#041d13',
  },
  bgImage: {
    width: '100%',
    minHeight: 650,
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    width: '100%',
    maxWidth: 1382.4,
    alignSelf: 'center',
    paddingVertical: 100,
    zIndex: 2,
  },
  kicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: 1.65,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '700',
    marginBottom: 20,
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.white,
    letterSpacing: -3.2,
    fontWeight: '400',
    maxWidth: 960,
    marginBottom: 40,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
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
      },
    }),
  },
  primaryButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    minHeight: 56,
    paddingHorizontal: 26,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  secondaryButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.white,
    fontWeight: '700',
  },
});
