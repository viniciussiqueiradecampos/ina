import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Image,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowRight } from './icons/ArrowRight';
import { DonationHeartIcon } from './icons/DonationHeartIcon';
import { AmazonTexture } from './AmazonTexture';
import { AnimatedCounter } from './AnimatedCounter';
import { FadeInUp } from './FadeInUp';

const textureNoise = require('../../assets/texture-noise.png');

interface StatsSectionProps {
  onOpenDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function StatsSection({ onOpenDonate, onNavigate }: StatsSectionProps = {}) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1080;
  const isTablet = width >= 720 && width < 1080;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const headingFontSize = isDesktop ? 84 : isTablet ? 54 : 36;
  const headingLineHeight = isDesktop ? 82 : isTablet ? 56 : 40;

  return (
    <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
      <View style={styles.container}>
        {/* Top Header with graceful entrance */}
        <FadeInUp delay={60} distance={18}>
          <View style={[styles.headerRow, !isDesktop && styles.headerRowMobile]}>
            <View style={styles.headingCol}>
              <Text
                style={[
                  styles.heading,
                  {
                    fontSize: headingFontSize,
                    lineHeight: headingLineHeight,
                  },
                ]}
              >
                Números que traduzem{'\n'}
                o nosso coletivo.
              </Text>
            </View>

            <View style={styles.headerSubtitleCol}>
              <Text style={styles.headerSubtitle}>
                Cada número carrega pessoas, encontros e histórias que seguem transformando a
                Amazônia.
              </Text>
            </View>
          </View>
        </FadeInUp>

        {/* Bento Grid with animated number counting and staggered card entrance */}
        {isDesktop ? (
          /* Desktop 4-Column Layout with Spanning Card */
          <View style={styles.gridDesktop}>
            {/* Column 1 */}
            <FadeInUp delay={120} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardForest]} accessible={true} accessibilityLabel="Mais de 500 famílias beneficiadas diretamente">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={500} prefix="+" style={styles.cardNumberWhite} />
                <Text style={styles.cardLabelWhite}>famílias</Text>
              </View>
              <View style={[styles.card, styles.cardCream]} accessible={true} accessibilityLabel="8 vídeos produzidos registrando saberes e histórias">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={8} prefix="0" style={styles.cardNumberDarkGreen} />
                <Text style={styles.cardLabelDarkGreen}>vídeos produzidos</Text>
              </View>
            </FadeInUp>

            {/* Column 2 */}
            <FadeInUp delay={220} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardLime]} accessible={true} accessibilityLabel="Mais de 700 mulheres capacitadas em autonomia e geração de renda">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={700} prefix="+" style={styles.cardNumberDark} />
                <Text style={styles.cardLabelDark}>mulheres capacitadas</Text>
              </View>
              <View style={[styles.card, styles.cardForest]} accessible={true} accessibilityLabel="18 projetos socioambientais aprovados e implementados">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={18} style={styles.cardNumberWhite} />
                <Text style={styles.cardLabelWhite}>projetos aprovados</Text>
              </View>
            </FadeInUp>

            {/* Column 3 (Spanning 2 rows) */}
            <FadeInUp delay={320} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardOrangeSpan]} accessible={true} accessibilityLabel="1.000 crianças atendidas com reforço escolar e leitura viva">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={1000} formatThousands={true} style={styles.cardNumberHuge} />
                <Text style={styles.cardLabelWhite}>crianças atendidas</Text>
              </View>
            </FadeInUp>

            {/* Column 4 */}
            <FadeInUp delay={420} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardDeepDark]} accessible={true} accessibilityLabel="27 encontros realizados entre fóruns, seminários e feiras">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={27} style={styles.cardNumberWhite} />
                <View>
                  <Text style={styles.cardLabelWhite}>encontros realizados</Text>
                  <Text style={styles.cardSublabel}>fóruns, seminários e feiras</Text>
                </View>
              </View>
              <View style={[styles.card, styles.cardLime]} accessible={true} accessibilityLabel="360 grupos culturais apoiados e valorizados">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={360} style={styles.cardNumberDark} />
                <Text style={styles.cardLabelDark}>grupos culturais apoiados</Text>
              </View>
            </FadeInUp>
          </View>
        ) : (
          /* Responsive Mobile/Tablet Grid with Animated Numbers */
          <View style={styles.gridMobile}>
            <FadeInUp delay={100} style={[styles.card, styles.cardForest, styles.cardMobileItem]}>
              <View accessible={true} accessibilityLabel="Mais de 500 famílias beneficiadas diretamente">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={500} prefix="+" style={styles.cardNumberWhite} />
                <Text style={styles.cardLabelWhite}>famílias</Text>
              </View>
            </FadeInUp>

            <FadeInUp delay={180} style={[styles.card, styles.cardLime, styles.cardMobileItem]}>
              <View accessible={true} accessibilityLabel="Mais de 700 mulheres capacitadas">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={700} prefix="+" style={styles.cardNumberDark} />
                <Text style={styles.cardLabelDark}>mulheres capacitadas</Text>
              </View>
            </FadeInUp>

            <FadeInUp delay={260} style={[styles.card, styles.cardOrangeSpan, styles.cardMobileFull]}>
              <View accessible={true} accessibilityLabel="1.000 crianças atendidas">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={1000} formatThousands={true} style={styles.cardNumberHugeMobile} />
                <Text style={styles.cardLabelWhite}>crianças atendidas</Text>
              </View>
            </FadeInUp>

            <FadeInUp delay={340} style={[styles.card, styles.cardDeepDark, styles.cardMobileItem]}>
              <View accessible={true} accessibilityLabel="27 encontros realizados: fóruns, seminários e feiras">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={27} style={styles.cardNumberWhite} />
                <View>
                  <Text style={styles.cardLabelWhite}>encontros realizados</Text>
                  <Text style={styles.cardSublabel}>fóruns, seminários e feiras</Text>
                </View>
              </View>
            </FadeInUp>

            <FadeInUp delay={420} style={[styles.card, styles.cardCream, styles.cardMobileItem]}>
              <View accessible={true} accessibilityLabel="8 vídeos produzidos">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={8} prefix="0" style={styles.cardNumberDarkGreen} />
                <Text style={styles.cardLabelDarkGreen}>vídeos produzidos</Text>
              </View>
            </FadeInUp>

            <FadeInUp delay={500} style={[styles.card, styles.cardForest, styles.cardMobileItem]}>
              <View accessible={true} accessibilityLabel="18 projetos aprovados">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={18} style={styles.cardNumberWhite} />
                <Text style={styles.cardLabelWhite}>projetos aprovados</Text>
              </View>
            </FadeInUp>

            <FadeInUp delay={580} style={[styles.card, styles.cardLime, styles.cardMobileItem]}>
              <View accessible={true} accessibilityLabel="360 grupos culturais apoiados">
                <Image source={textureNoise} style={styles.cardNoiseOverlay} resizeMode="repeat" accessible={false} importantForAccessibility="no" />
                <AnimatedCounter target={360} style={styles.cardNumberDark} />
                <Text style={styles.cardLabelDark}>grupos culturais apoiados</Text>
              </View>
            </FadeInUp>
          </View>
        )}

        {/* Direct Action Buttons matching SocialProofSection */}
        <FadeInUp delay={500} distance={20}>
          <View style={styles.directActionWrapper}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => onNavigate && onNavigate('Voluntários')}
              style={styles.volunteerButton}
              accessibilityRole="button"
              accessibilityLabel="Ser um voluntário"
            >
              <Text style={styles.volunteerButtonText}>Ser um voluntário</Text>
              <ArrowRight size={17} color={colors.primary} strokeWidth={1.8} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onOpenDonate}
              style={styles.donateButton}
              accessibilityRole="button"
              accessibilityLabel="Fazer doação"
            >
              <DonationHeartIcon size={18} color={colors.white} />
              <Text style={styles.donateButtonText}>Fazer doação</Text>
            </TouchableOpacity>
          </View>
        </FadeInUp>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: '#f2eee3',
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 40,
    marginBottom: 60,
  },
  headerRowMobile: {
    flexDirection: 'column',
    gap: 20,
    marginBottom: 40,
  },
  headingCol: {
    flex: 1,
    maxWidth: 760,
  },
  headerSubtitleCol: {
    flex: 1,
    maxWidth: 420,
    paddingTop: 16,
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -1.6,
    fontWeight: '400',
  },
  headingItalic: {
    fontStyle: 'italic',
  },
  headerSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.primary,
    fontWeight: '400',
  },
  gridDesktop: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
  },
  gridCol: {
    flex: 1,
    gap: 20,
  },
  gridMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
  },
  card: {
    borderRadius: 20,
    padding: 30,
    justifyContent: 'space-between',
    minHeight: 180,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 4px 16px rgba(20, 61, 43, 0.05)',
      },
    }),
  },
  cardNoiseOverlay: {
    ...StyleSheet.absoluteFill,
    opacity: 0.18,
    pointerEvents: 'none',
  },
  cardMobileItem: {
    width: 'calc(50% - 8px)' as any,
    minHeight: 160,
    padding: 24,
  },
  cardMobileFull: {
    width: '100%',
    minHeight: 240,
    padding: 32,
  },
  cardForest: {
    backgroundColor: '#193f2f',
  },
  cardLime: {
    backgroundColor: '#8D9F6F',
  },
  cardCream: {
    backgroundColor: '#fffcf2',
    borderWidth: 1,
    borderColor: 'rgba(25, 51, 34, 0.08)',
  },
  cardOrangeSpan: {
    backgroundColor: '#526635',
    flex: 1,
    minHeight: 380,
    justifyContent: 'space-between',
  },
  cardDeepDark: {
    backgroundColor: '#0c2218',
  },
  cardNumberWhite: {
    fontFamily: fonts.serif,
    fontSize: 64,
    lineHeight: 68,
    color: colors.white,
    letterSpacing: -1.5,
    fontWeight: '400',
  },
  cardNumberDark: {
    fontFamily: fonts.serif,
    fontSize: 64,
    lineHeight: 68,
    color: colors.accentDarkText,
    letterSpacing: -1.5,
    fontWeight: '400',
  },
  cardNumberDarkGreen: {
    fontFamily: fonts.serif,
    fontSize: 64,
    lineHeight: 68,
    color: colors.primary,
    letterSpacing: -1.5,
    fontWeight: '400',
  },
  cardNumberHuge: {
    fontFamily: fonts.serif,
    fontSize: 78,
    lineHeight: 82,
    color: colors.white,
    letterSpacing: -2,
    fontWeight: '400',
  },
  cardNumberHugeMobile: {
    fontFamily: fonts.serif,
    fontSize: 68,
    lineHeight: 72,
    color: colors.white,
    letterSpacing: -2,
    fontWeight: '400',
  },
  cardLabelWhite: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.white,
    marginTop: 8,
  },
  cardLabelDark: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.accentDarkText,
    marginTop: 8,
  },
  cardLabelDarkGreen: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.primary,
    marginTop: 8,
  },
  cardSublabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: 2,
  },
  directActionWrapper: {
    marginTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
  },
  volunteerButton: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 100,
    paddingHorizontal: 28,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  volunteerButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  donateButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 100,
    paddingHorizontal: 30,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(22, 75, 53, 0.24)',
      },
    }),
  },
  donateButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
    fontWeight: '700',
  },
});
