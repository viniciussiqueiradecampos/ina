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
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowUpRight } from './icons/ArrowUpRight';
import { AmazonTexture } from './AmazonTexture';

interface Supporter {
  name: string;
  category: string;
  badge: string;
  iconBg: string;
  iconColor: string;
}

const supportersList: Supporter[] = [
  { name: 'Fundo Amazônia', category: 'Fundo Público / BNDES', badge: 'FA', iconBg: '#1e4835', iconColor: '#c9f36b' },
  { name: 'Rainforest Foundation', category: 'Cooperação Internacional', badge: 'RF', iconBg: '#193f2f', iconColor: '#7dd395' },
  { name: 'Instituto Clima e Sociedade', category: 'Filantropia Climática', badge: 'iCS', iconBg: '#0f3827', iconColor: '#93e5ab' },
  { name: 'Fundação Ford', category: 'Direitos & Justiça Social', badge: 'FF', iconBg: '#214e38', iconColor: '#ffffff' },
  { name: 'FUNBIO', category: 'Fundo Brasileiro de Biodiversidade', badge: 'FB', iconBg: '#18432f', iconColor: '#c9f36b' },
  { name: 'Fundação Avina', category: 'Desenvolvimento Sustentável', badge: 'AV', iconBg: '#1b4432', iconColor: '#e0f792' },
  { name: 'Instituto Socioambiental', category: 'Rede Socioambiental', badge: 'ISA', iconBg: '#23523b', iconColor: '#a1e9b7' },
  { name: 'Fundação W.K. Kellogg', category: 'Comunidades Tradicionais', badge: 'WKK', iconBg: '#1d4834', iconColor: '#ffffff' },
  { name: 'Instituto Arapyaú', category: 'Desenvolvimento Territorial', badge: 'IA', iconBg: '#133a28', iconColor: '#c9f36b' },
  { name: 'Coomarca Bragança', category: 'Cooperativa Parceira', badge: 'CB', iconBg: '#24563d', iconColor: '#7ce2a6' },
  { name: 'Assoc. Caeté-Taperaçu', category: 'Comunidade Tradicional', badge: 'ACT', iconBg: '#1b4633', iconColor: '#e6ff94' },
  { name: 'MacArthur Foundation', category: 'Apoio Institucional Global', badge: 'MF', iconBg: '#17402d', iconColor: '#ffffff' },
];

export function SupportersSection({ onBecomeSupporter }: { onBecomeSupporter?: () => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Single card estimate: 270px width + 20px gap = 290px per item
  const cardWidthWithGap = 290;
  const singleSetWidth = supportersList.length * cardWidthWithGap; // ~3480px

  // Triple list for completely seamless non-stop loop
  const marqueeItems = [...supportersList, ...supportersList, ...supportersList];

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let anim: Animated.CompositeAnimation;

    const startMarquee = () => {
      scrollX.setValue(0);
      anim = Animated.loop(
        Animated.timing(scrollX, {
          toValue: -singleSetWidth,
          duration: 38000,
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
      {/* Amazonian Marajoara subtle background texture */}
      <AmazonTexture variant="marajoara" color="#c9f36b" opacity={0.04} />

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
          <ArrowUpRight size={17} color={colors.accentDarkText} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      {/* Infinite Animated Marquee (logos scroll automatically continuously) */}
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
            <View key={`${supporter.name}-${idx}`} style={styles.supporterCard}>
              <View style={[styles.logoBadgeContainer, { backgroundColor: supporter.iconBg }]}>
                <Text style={[styles.badgeLetters, { color: supporter.iconColor }]}>
                  {supporter.badge}
                </Text>
              </View>
              <View style={styles.supporterTextCol}>
                <Text style={styles.supporterName} numberOfLines={1}>
                  {supporter.name}
                </Text>
                <Text style={styles.supporterCategory} numberOfLines={1}>
                  {supporter.category}
                </Text>
              </View>
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
    paddingVertical: 14,
    position: 'relative',
  },
  leftVignette: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
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
    width: 100,
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
    gap: 20,
    width: 12000,
  },
  supporterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 16,
    width: 270,
    ...Platform.select({
      web: {
        cursor: 'auto',
        backdropFilter: 'blur(8px)',
      },
    }),
  },
  logoBadgeContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  badgeLetters: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  supporterTextCol: {
    flex: 1,
  },
  supporterName: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
    fontWeight: '700',
    marginBottom: 3,
  },
  supporterCategory: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.65)',
  },
});
