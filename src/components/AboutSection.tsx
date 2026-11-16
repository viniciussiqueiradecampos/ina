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

interface AboutSectionProps {
  onOpenDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function AboutSection({ onOpenDonate, onNavigate }: AboutSectionProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 24;
  const headingFontSize = isDesktop ? 80 : isTablet ? 56 : 38;
  const headingLineHeight = isDesktop ? 82 : isTablet ? 58 : 42;

  return (
    <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
      {/* Subtle organic Amazonian foliage texture */}
      <AmazonTexture variant="foliage" color={colors.primary} opacity={0.045} />

      <View style={styles.container}>
        {/* Top Two Column Content */}
        <View style={[styles.contentRow, !isDesktop && styles.contentRowMobile]}>
          {/* Left Column: Big Heading */}
          <View style={[styles.leftCol, !isDesktop && styles.fullWidth]}>
            <Text
              style={[
                styles.heading,
                {
                  fontSize: headingFontSize,
                  lineHeight: headingLineHeight,
                },
              ]}
            >
              INÃ é uma palavra de origem indígena.
            </Text>
          </View>

          {/* Right Column: Paragraphs & Link */}
          <View style={[styles.rightCol, !isDesktop && styles.fullWidth]}>
            <Text style={styles.leadParagraph}>
              Além de uma sigla, significa “nós” ou “pessoas” — um nome que traduz a
              Amazônia pensada a partir de quem vive e conhece este território.
            </Text>

            <Text style={styles.bodyParagraph}>
              Somos uma ONG que nasce da preocupação com a falta de apoio técnico e social
              para o desenvolvimento sustentável, econômico e igualitário de comunidades
              tradicionais e em situação de risco.
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => onNavigate && onNavigate('O Instituto')}
              style={styles.historyLink}
              accessibilityRole="button"
              accessibilityLabel="Conheça nossa história"
            >
              <Text style={styles.historyLinkText}>Conheça nossa história</Text>
              <View style={styles.arrowWrapper}>
                <ArrowUpRight size={17} color={colors.primary} strokeWidth={1.5} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Green Banner (Node 21:62) with CTA button */}
        <View style={styles.bannerContainer}>
          <View style={[styles.banner, !isDesktop && styles.bannerMobile]}>
            <View style={styles.bannerCol1}>
              <Text style={styles.bannerTitle}>INÃ</Text>
            </View>

            <View style={styles.bannerCol2}>
              <Text style={styles.bannerDotsText}>
                nós • pessoas • coletivo • futuro
              </Text>
            </View>

            {/* CTA Button to Donate */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onOpenDonate}
              style={styles.bannerDonateBtn}
              accessibilityRole="button"
              accessibilityLabel="Fazer doação para o INÃ"
            >
              <Text style={styles.bannerDonateBtnText}>Fazer uma doação</Text>
              <View style={styles.bannerDonateBtnArrow}>
                <ArrowUpRight size={16} color={colors.accentDarkText} strokeWidth={2} />
              </View>
            </TouchableOpacity>

            {isDesktop && (
              <View style={styles.bannerDecorative} pointerEvents="none">
                <View style={styles.skewPattern}>
                  <View style={styles.skewBar1} />
                  <View style={styles.skewBar2} />
                  <View style={styles.skewBar3} />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 100,
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
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 60,
  },
  contentRowMobile: {
    flexDirection: 'column',
    gap: 32,
  },
  leftCol: {
    flex: 1,
    maxWidth: 720,
  },
  rightCol: {
    flex: 1,
    maxWidth: 560,
    paddingTop: 12,
  },
  fullWidth: {
    maxWidth: '100%',
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -1.6,
    fontWeight: '400',
  },
  leadParagraph: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.primary,
    fontWeight: '400',
    marginBottom: 20,
  },
  bodyParagraph: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22.4,
    color: colors.subtleText,
    fontWeight: '400',
    marginBottom: 28,
  },
  historyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  historyLinkText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.primary,
    fontWeight: '700',
  },
  arrowWrapper: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    marginTop: 80,
    width: '100%',
  },
  banner: {
    backgroundColor: colors.primaryButton,
    borderRadius: 20,
    minHeight: 150,
    paddingHorizontal: 50,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 28,
    paddingVertical: 32,
    gap: 20,
  },
  bannerCol1: {
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: fonts.serif,
    fontSize: 74,
    lineHeight: 80,
    color: colors.accent,
    fontWeight: '400',
  },
  bannerCol2: {
    justifyContent: 'center',
  },
  bannerDotsText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 2.0,
    textTransform: 'uppercase',
    color: colors.white,
  },
  bannerDonateBtn: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
  bannerDonateBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  bannerDonateBtnArrow: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerDecorative: {
    position: 'absolute',
    right: 40,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    opacity: 0.2,
  },
  skewPattern: {
    flexDirection: 'row',
    gap: 14,
    transform: [{ skewX: '-16deg' }],
  },
  skewBar1: {
    width: 24,
    height: 120,
    backgroundColor: colors.accent,
    borderRadius: 6,
  },
  skewBar2: {
    width: 16,
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  skewBar3: {
    width: 32,
    height: 120,
    backgroundColor: colors.accent,
    borderRadius: 6,
  },
});
