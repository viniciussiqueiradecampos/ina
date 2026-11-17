import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowRight } from './icons/ArrowRight';

const textureOrganicLines = require('../../assets/texture-organic-lines.png');
const textureBannerOutline = require('../../assets/texture-banner-outline.png');
const inaLogoBanner = require('../../assets/ina-logo-white.png');

const cyclingWords = ['Floresta', 'Cultura', 'Resistência', 'Futuro', 'INÃ'];

// Banner box minHeight (must match styles.banner.minHeight below)
const BANNER_HEIGHT = 130;

interface AboutSectionProps {
  onOpenDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function AboutSection({ onOpenDonate, onNavigate }: AboutSectionProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 24;
  const headingFontSize = isDesktop ? 92 : isTablet ? 64 : 44;
  const headingLineHeight = isDesktop ? 90 : isTablet ? 66 : 48;

  // Typewriter effect state
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = cyclingWords[wordIndex];
    let timer: any;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        // Typing
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 110);
      } else {
        // Pause at full word before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayedText.length > 0) {
        // Deleting
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 55);
      } else {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % cyclingWords.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <View style={styles.outerContainer}>
      {/* ── Text content area ── */}
      <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
        {/* Background organic lines watermark */}
        <Image
          source={textureOrganicLines}
          style={styles.bgTexture}
          resizeMode="cover"
          pointerEvents="none"
        />

        <View style={styles.container}>
          <View style={[styles.contentRow, !isDesktop && styles.contentRowMobile]}>
            {/* Left — Instituto\nNova Amazônia */}
            <View style={[styles.leftCol, !isDesktop && styles.fullWidth]}>
              <Text
                style={[
                  styles.headingLine,
                  { fontSize: headingFontSize, lineHeight: headingLineHeight },
                ]}
              >
                Instituto{'\n'}Nova Amazônia
              </Text>
            </View>

            {/* Right — paragraphs */}
            <View style={[styles.rightCol, !isDesktop && styles.fullWidth]}>
              <Text style={styles.leadParagraph}>
                Além de uma sigla, INÃ significa "nós" ou "pessoas", um nome que traduz a
                Amazônia pensada a partir de quem vive e conhece este território.
              </Text>
              <Text style={styles.bodyParagraph}>
                Somos uma ONG que nasce da preocupação com a falta de apoio técnico e social
                para o desenvolvimento sustentável, econômico e igualitário de comunidades
                tradicionais e em situação de risco.
              </Text>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => onNavigate && onNavigate('Quem Somos')}
                style={styles.historyLink}
                accessibilityRole="button"
                accessibilityLabel="Conheça nossa ONG"
              >
                <Text style={styles.historyLinkText}>Conheça nossa ONG</Text>
                <View style={styles.arrowWrapper}>
                  <ArrowRight size={17} color={colors.primary} strokeWidth={1.5} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* ── Banner area — full viewport width ── */}
      {/* Texture starts at 50% of banner height and extends ~150px below */}
      <View style={styles.bannerArea}>
        {/* Texture: absolute, full width, bottom-anchored 150px below bannerArea */}
        <Image
          source={textureBannerOutline}
          style={styles.bannerBgTexture}
          resizeMode="repeat"
          pointerEvents="none"
          accessible={false}
          importantForAccessibility="no"
        />

        {/* Green box — constrained width, sits on top of texture */}
        <View style={[styles.bannerInner, { paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.banner, !isDesktop && styles.bannerMobile]}>
            {/* Logo Left */}
            <View style={styles.bannerCol1}>
              <Image
                source={inaLogoBanner}
                style={styles.bannerLogoImage}
                resizeMode="contain"
                accessible={true}
                accessibilityLabel="Logo INÃ"
              />
            </View>

            {/* Animated "Nós somos [word]" Center com efeito máquina de escrever */}
            <View style={styles.bannerCol2}>
              <View
                style={styles.animatedTextRow}
                accessible={true}
                accessibilityLabel={`Nós somos ${displayedText || 'INÃ'}`}
              >
                <Text style={styles.bannerFixedText}>Nós somos </Text>
                <View style={styles.typewriterWordWrapper}>
                  <Text style={styles.bannerCyclingWord}>
                    {displayedText}
                  </Text>
                  <Text style={styles.typewriterCursor} accessible={false} importantForAccessibility="no">|</Text>
                </View>
              </View>
            </View>

            {/* Transparência Button Right */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => onNavigate ? onNavigate('Transparência') : onOpenDonate?.()}
              style={styles.bannerDonateBtn}
              accessibilityRole="button"
              accessibilityLabel="Ver página de Transparência do INÃ"
            >
              <Text style={styles.bannerDonateBtnText}>Transparência</Text>
              <View style={styles.bannerDonateBtnArrow}>
                <ArrowRight size={16} color={colors.primary} strokeWidth={2} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    backgroundColor: colors.background,
  },

  /* ── Text section ── */
  section: {
    width: '100%',
    paddingTop: 100,
    paddingBottom: 60,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bgTexture: {
    ...StyleSheet.absoluteFill,
    opacity: 0.14,
    zIndex: 0,
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
    maxWidth: 680,
  },
  rightCol: {
    flex: 1,
    maxWidth: 520,
    paddingTop: 12,
  },
  fullWidth: {
    maxWidth: '100%',
  },
  headingLine: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -2,
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
    ...Platform.select({ web: { cursor: 'pointer' } }),
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

  /* ── Banner area (full width) ── */
  bannerArea: {
    width: '100%',
    paddingBottom: 50,
    position: 'relative',
    overflow: 'visible',
  },
  bannerBgTexture: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 150,
    zIndex: 0,
  },
  bannerInner: {
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  banner: {
    width: '100%',
    maxWidth: 1382.4,
    backgroundColor: colors.primaryButton,
    borderRadius: 20,
    minHeight: BANNER_HEIGHT,
    paddingHorizontal: 50,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    overflow: 'hidden',
  },
  bannerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
    gap: 20,
  },
  bannerCol1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  bannerLogoImage: {
    width: 96,
    height: 54,
  },
  bannerCol2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerFixedText: {
    fontFamily: fonts.serif,
    fontSize: 40,
    lineHeight: 44,
    color: colors.white,
    fontWeight: '400',
    letterSpacing: -0.6,
  },
  typewriterWordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 220, // Garante que "Nós somos" fique completamente imóvel e fixo
  },
  bannerCyclingWord: {
    fontFamily: fonts.serif,
    fontSize: 40,
    lineHeight: 44,
    color: colors.accent,
    fontWeight: '400',
    letterSpacing: -0.6,
  },
  typewriterCursor: {
    fontFamily: fonts.sans,
    fontSize: 34,
    lineHeight: 40,
    color: colors.accent,
    fontWeight: '300',
    marginLeft: 2,
    opacity: 0.8,
  },
  bannerDonateBtn: {
    backgroundColor: colors.white,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 2,
    flexShrink: 0,
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
    color: colors.primary,
    fontWeight: '700',
  },
  bannerDonateBtnArrow: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
