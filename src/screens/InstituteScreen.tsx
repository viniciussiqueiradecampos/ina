import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from '../components/icons/ArrowRight';
import { ArrowUpRight } from '../components/icons/ArrowUpRight';

const heroBg = require('../../assets/hero-bg.png');

export function InstituteScreen({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  return (
    <View style={styles.container}>
      {/* Page Hero */}
      <View style={[styles.heroBanner, { paddingHorizontal: horizontalPadding }]}>
        <ImageBackground source={heroBg} style={styles.heroBg} resizeMode="cover">
          <LinearGradient
            colors={['rgba(4, 29, 19, 0.92)', 'rgba(4, 29, 19, 0.40)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroKicker}>O Instituto</Text>
            <Text style={styles.heroTitle}>
              Uma organização que nasce do chão e da voz das comunidades.
            </Text>
            <Text style={styles.heroLead}>
              O Instituto Nova Amazônia (INÃ) é uma organização sem fins lucrativos dedicada
              ao fortalecimento socioeconômico, à preservação ambiental e à garantia de
              direitos de povos tradicionais na Amazônia Oriental.
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Pillars Section */}
      <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionKicker}>Nossa Essência</Text>
          <Text style={styles.sectionTitle}>Princípios que guiam nossa atuação</Text>
        </View>

        <View style={[styles.pillarsGrid, !isDesktop && styles.pillarsGridMobile]}>
          <View style={[styles.pillarCard, { backgroundColor: '#164b35' }]}>
            <Text style={styles.pillarNumber}>01</Text>
            <Text style={styles.pillarTitleWhite}>Escuta Ativa no Território</Text>
            <Text style={styles.pillarDescWhite}>
              Não levamos soluções prontas de fora. Qualquer iniciativa nasce da escuta das
              famílias, compreendendo os saberes ancestrais e as urgências locais.
            </Text>
          </View>

          <View style={[styles.pillarCard, { backgroundColor: '#c9f36b' }]}>
            <Text style={[styles.pillarNumber, { color: '#08281c' }]}>02</Text>
            <Text style={styles.pillarTitleDark}>Soberania Econômica</Text>
            <Text style={styles.pillarDescDark}>
              Capacitamos e estruturamos cadeias produtivas justas para que as comunidades
              tenham independência financeira e permanência digna na terra.
            </Text>
          </View>

          <View style={[styles.pillarCard, { backgroundColor: '#f07a4f' }]}>
            <Text style={[styles.pillarNumber, { color: '#08281c' }]}>03</Text>
            <Text style={styles.pillarTitleDark}>Justiça Socioambiental</Text>
            <Text style={styles.pillarDescDark}>
              Proteger a floresta em pé significa, antes de tudo, valorizar e proteger as
              pessoas que dela cuidam e dependem todos os dias.
            </Text>
          </View>
        </View>
      </View>

      {/* Timeline Trajectory */}
      <View style={[styles.timelineSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionKicker}>Trajetória</Text>
          <Text style={styles.sectionTitle}>Como construímos este caminho</Text>
        </View>

        <View style={styles.timelineList}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineYearBadge}><Text style={styles.timelineYear}>2020</Text></View>
            <View style={styles.timelineBody}>
              <Text style={styles.timelineHeading}>Fundação do INÃ</Text>
              <Text style={styles.timelineText}>
                União de pesquisadores, lideranças comunitárias e técnicos para dar suporte
                emergencial e estruturante a comunidades no Pará durante a pandemia.
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineYearBadge}><Text style={styles.timelineYear}>2022</Text></View>
            <View style={styles.timelineBody}>
              <Text style={styles.timelineHeading}>Expansão Produtiva e Resgate de Saberes</Text>
              <Text style={styles.timelineText}>
                Início do projeto de ração artesanal para piscicultura liderado por mulheres
                e parceria com a cooperativa de catadores de materiais recicláveis.
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineYearBadge}><Text style={styles.timelineYear}>2024</Text></View>
            <View style={styles.timelineBody}>
              <Text style={styles.timelineHeading}>Consolidação do Paneiro do Mangal</Text>
              <Text style={styles.timelineText}>
                Criação da rota de comercialização direta na Reserva Extrativista
                Caeté-Taperaçu, eliminando intermediários e triplicando a renda familiar.
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineYearBadge, { backgroundColor: colors.accent }]}><Text style={[styles.timelineYear, { color: colors.accentDarkText }]}>Hoje</Text></View>
            <View style={styles.timelineBody}>
              <Text style={styles.timelineHeading}>Mais de 500 Famílias Impactadas</Text>
              <Text style={styles.timelineText}>
                Atuação em 10 projetos permanentes de renda, educação, transparência e
                conservação em diversos polos do Pará.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* CTA Box */}
      <View style={[styles.ctaBoxWrapper, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.ctaBox}>
          <Text style={styles.ctaBoxTitle}>Quer conhecer nossos projetos na prática?</Text>
          <Text style={styles.ctaBoxSubtitle}>
            Veja como cada iniciativa transforma o território de forma direta e mensurável.
          </Text>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => onNavigate('Projetos')}
            style={styles.ctaBoxBtn}
          >
            <Text style={styles.ctaBoxBtnText}>Explorar Projetos</Text>
            <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
  },
  heroBanner: {
    paddingVertical: 40,
    width: '100%',
    alignItems: 'center',
  },
  heroBg: {
    width: '100%',
    maxWidth: 1382.4,
    borderRadius: 24,
    overflow: 'hidden',
    minHeight: 440,
    justifyContent: 'center',
    padding: 48,
  },
  heroContent: {
    maxWidth: 860,
    zIndex: 2,
  },
  heroKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: 14,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 52,
    lineHeight: 56,
    color: colors.white,
    letterSpacing: -1.6,
    marginBottom: 18,
  },
  heroLead: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  section: {
    paddingVertical: 80,
    maxWidth: 1382.4,
    width: '100%',
    alignSelf: 'center',
  },
  sectionHeader: {
    marginBottom: 40,
  },
  sectionKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 44,
    color: colors.primary,
    letterSpacing: -1.2,
  },
  pillarsGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  pillarsGridMobile: {
    flexDirection: 'column',
  },
  pillarCard: {
    flex: 1,
    borderRadius: 20,
    padding: 32,
    minHeight: 280,
    justifyContent: 'space-between',
  },
  pillarNumber: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accent,
    marginBottom: 16,
  },
  pillarTitleWhite: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 32,
    color: colors.white,
    marginBottom: 12,
  },
  pillarDescWhite: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pillarTitleDark: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 32,
    color: '#08281c',
    marginBottom: 12,
  },
  pillarDescDark: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: '#08281c',
  },
  timelineSection: {
    backgroundColor: '#f2eee3',
    paddingVertical: 90,
    width: '100%',
  },
  timelineList: {
    maxWidth: 960,
    alignSelf: 'center',
    gap: 24,
    width: '100%',
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'flex-start',
  },
  timelineYearBadge: {
    backgroundColor: colors.primaryButton,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  timelineYear: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.white,
  },
  timelineBody: {
    flex: 1,
  },
  timelineHeading: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 6,
  },
  timelineText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.subtleText,
  },
  ctaBoxWrapper: {
    paddingVertical: 70,
    width: '100%',
    alignItems: 'center',
  },
  ctaBox: {
    width: '100%',
    maxWidth: 1382.4,
    backgroundColor: colors.primaryButton,
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    textAlign: 'center',
    gap: 16,
  },
  ctaBoxTitle: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: colors.white,
    textAlign: 'center',
  },
  ctaBoxSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: 600,
  },
  ctaBoxBtn: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 28,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  ctaBoxBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
  },
});
