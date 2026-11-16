import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowUpRight } from './icons/ArrowUpRight';
import { AmazonTexture } from './AmazonTexture';

interface TransparencySectionProps {
  onNavigate?: (tab: string) => void;
}

export function TransparencySection({ onNavigate }: TransparencySectionProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const headingFontSize = isDesktop ? 52 : isTablet ? 40 : 30;
  const headingLineHeight = isDesktop ? 54 : isTablet ? 44 : 34;

  return (
    <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
      {/* Subtle organic Amazonian texture watermark */}
      <AmazonTexture variant="river" color="#193322" opacity={0.06} />

      <View style={styles.container}>
        <View style={[styles.compactRow, !isDesktop && styles.compactRowMobile]}>
          {/* Main Direct Message */}
          <View style={styles.textColumn}>
            <Text
              style={[
                styles.heading,
                {
                  fontSize: headingFontSize,
                  lineHeight: headingLineHeight,
                },
              ]}
            >
              Confiança também se constrói com clareza.
            </Text>

            <Text style={styles.subtitle}>
              Acompanhe nossos relatórios, documentos institucionais e prestações de contas abertas.
            </Text>
          </View>

          {/* Direct CTA Action Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => onNavigate && onNavigate('Transparência')}
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel="Acessar documentos de transparência"
          >
            <Text style={styles.actionButtonText}>Acessar documentos</Text>
            <ArrowUpRight size={17} color={colors.white} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: colors.accent,
    paddingVertical: 52,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: 1382.4,
    position: 'relative',
    zIndex: 1,
  },
  compactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  compactRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
  },
  textColumn: {
    flex: 1,
    maxWidth: 820,
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -1.4,
    fontWeight: '400',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 23,
    color: colors.primary,
    fontWeight: '400',
    opacity: 0.9,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingHorizontal: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'flex-start',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(25, 51, 34, 0.2)',
      },
    }),
  },
  actionButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
    fontWeight: '700',
  },
});
