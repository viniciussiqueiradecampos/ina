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
import { AnimatedCounter } from './AnimatedCounter';
import { FadeInUp } from './FadeInUp';

interface StatsSectionProps {
  onOpenDonate?: () => void;
}

export function StatsSection({ onOpenDonate }: StatsSectionProps = {}) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1080;
  const isTablet = width >= 720 && width < 1080;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const headingFontSize = isDesktop ? 84 : isTablet ? 54 : 36;
  const headingLineHeight = isDesktop ? 82 : isTablet ? 56 : 40;

  return (
    <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
      {/* Subtle organic Amazonian foliage background texture */}
      <AmazonTexture variant="foliage" color={colors.primary} opacity={0.035} />

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
                Dados que mostram{'\n'}
                o tamanho desse{' '}
                <Text style={styles.headingItalic}>nós.</Text>
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
              <View style={[styles.card, styles.cardForest]}>
                <AnimatedCounter target={500} style={styles.cardNumberWhite} />
                <Text style={styles.cardLabelWhite}>famílias</Text>
              </View>
              <View style={[styles.card, styles.cardCream]}>
                <AnimatedCounter target={8} prefix="0" style={styles.cardNumberDarkGreen} />
                <Text style={styles.cardLabelDarkGreen}>vídeos produzidos</Text>
              </View>
            </FadeInUp>

            {/* Column 2 */}
            <FadeInUp delay={220} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardLime]}>
                <AnimatedCounter target={700} style={styles.cardNumberDark} />
                <Text style={styles.cardLabelDark}>mulheres capacitadas</Text>
              </View>
              <View style={[styles.card, styles.cardForest]}>
                <AnimatedCounter target={18} style={styles.cardNumberWhite} />
                <Text style={styles.cardLabelWhite}>projetos aprovados</Text>
              </View>
            </FadeInUp>

            {/* Column 3 (Spanning 2 rows) */}
            <FadeInUp delay={320} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardOrangeSpan]}>
                <AnimatedCounter target={1000} formatThousands={true} style={styles.cardNumberHuge} />
                <Text style={styles.cardLabelDark}>crianças atendidas</Text>
              </View>
            </FadeInUp>

            {/* Column 4 */}
            <FadeInUp delay={420} distance={24} style={styles.gridCol}>
              <View style={[styles.card, styles.cardDeepDark]}>
                <AnimatedCounter target={27} style={styles.cardNumberWhite} />
                <View>
                  <Text style={styles.cardLabelWhite}>encontros realizados</Text>
                  <Text style={styles.cardSublabel}>fóruns, seminários e feiras</Text>
                </View>
              </View>
              <View style={[styles.card, styles.cardLime]}>
                <AnimatedCounter target={360} style={styles.cardNumberDark} />
                <Text style={styles.cardLabelDark}>grupos culturais apoiados</Text>
              </View>
            </FadeInUp>
          </View>
        ) : (
          /* Responsive Mobile/Tablet Grid with Animated Numbers */
          <View style={styles.gridMobile}>
            <FadeInUp delay={100} style={[styles.card, styles.cardForest, styles.cardMobileItem]}>
              <AnimatedCounter target={500} style={styles.cardNumberWhite} />
              <Text style={styles.cardLabelWhite}>famílias</Text>
            </FadeInUp>

            <FadeInUp delay={180} style={[styles.card, styles.cardLime, styles.cardMobileItem]}>
              <AnimatedCounter target={700} style={styles.cardNumberDark} />
              <Text style={styles.cardLabelDark}>mulheres capacitadas</Text>
            </FadeInUp>

            <FadeInUp delay={260} style={[styles.card, styles.cardOrangeSpan, styles.cardMobileFull]}>
              <AnimatedCounter target={1000} formatThousands={true} style={styles.cardNumberHugeMobile} />
              <Text style={styles.cardLabelDark}>crianças atendidas</Text>
            </FadeInUp>

            <FadeInUp delay={340} style={[styles.card, styles.cardDeepDark, styles.cardMobileItem]}>
              <AnimatedCounter target={27} style={styles.cardNumberWhite} />
              <View>
                <Text style={styles.cardLabelWhite}>encontros realizados</Text>
                <Text style={styles.cardSublabel}>fóruns, seminários e feiras</Text>
              </View>
            </FadeInUp>

            <FadeInUp delay={420} style={[styles.card, styles.cardCream, styles.cardMobileItem]}>
              <AnimatedCounter target={8} prefix="0" style={styles.cardNumberDarkGreen} />
              <Text style={styles.cardLabelDarkGreen}>vídeos produzidos</Text>
            </FadeInUp>

            <FadeInUp delay={500} style={[styles.card, styles.cardForest, styles.cardMobileItem]}>
              <AnimatedCounter target={18} style={styles.cardNumberWhite} />
              <Text style={styles.cardLabelWhite}>projetos aprovados</Text>
            </FadeInUp>

            <FadeInUp delay={580} style={[styles.card, styles.cardLime, styles.cardMobileItem]}>
              <AnimatedCounter target={360} style={styles.cardNumberDark} />
              <Text style={styles.cardLabelDark}>grupos culturais apoiados</Text>
            </FadeInUp>
          </View>
        )}

        {/* Bottom Banner Card (Node 21:133) */}
        <FadeInUp delay={500} distance={20}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onOpenDonate}
            style={styles.bottomBanner}
            accessibilityRole="button"
            accessibilityLabel="Contribua com o INÃ"
          >
            <Text style={styles.bottomBannerSub}>
              Ajude esses números a continuarem crescendo.
            </Text>
            <View style={styles.bottomBannerAction}>
              <Text style={styles.bottomBannerActionText}>Contribua com o INÃ</Text>
              <ArrowUpRight size={18} color={colors.primary} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>
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
    ...Platform.select({
      web: {
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 4px 16px rgba(20, 61, 43, 0.05)',
      },
    }),
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
    backgroundColor: colors.accent,
  },
  cardCream: {
    backgroundColor: '#fffcf2',
    borderWidth: 1,
    borderColor: 'rgba(25, 51, 34, 0.08)',
  },
  cardOrangeSpan: {
    backgroundColor: '#e79c5c',
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
    color: '#08281c',
    letterSpacing: -2,
    fontWeight: '400',
  },
  cardNumberHugeMobile: {
    fontFamily: fonts.serif,
    fontSize: 68,
    lineHeight: 72,
    color: '#08281c',
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
  bottomBanner: {
    marginTop: 30,
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.22s ease',
      },
    }),
  },
  bottomBannerSub: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  bottomBannerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 2,
  },
  bottomBannerActionText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
});
