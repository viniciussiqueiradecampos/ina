import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { AmazonTexture } from './AmazonTexture';
import { AnimatedCounter } from './AnimatedCounter';
import { FadeInUp } from './FadeInUp';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  initials: string;
  badge: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Antes do apoio técnico do INÃ, vendíamos o açaí e a farinha pelo preço que o atravessador impunha. Hoje temos cooperativa própria, selo de origem e garantia de renda digna para mais de 85 famílias.',
    author: 'Dona Raimunda Nonata',
    role: 'Agricultora & Liderança Comunitária',
    location: 'Resex Caeté-Taperaçu, Bragança/PA',
    initials: 'RN',
    badge: 'Produção Sustentável',
    stars: 5,
  },
  {
    quote:
      'O INÃ não veio nos ensinar o que a floresta é. Veio nos ouvir e valorizar o que nossos avós já faziam. Recuperamos três nascentes de igarapé e hoje temos água pura para as crianças da aldeia.',
    author: 'Seu Benedito de Paula',
    role: 'Mestre Tradicional e Pescador Artesanal',
    location: 'Comunidade Chaú / Baixo Amazonas',
    initials: 'BP',
    badge: 'Guardião das Águas',
    stars: 5,
  },
  {
    quote:
      'A metodologia do INÃ é referência nacional: alia a sabedoria ancestral das comunidades com dados científicos e monitoramento geoespacial. Um exemplo de conservação produtiva com base comunitária.',
    author: 'Dra. Mariana Caldas',
    role: 'Pesquisadora em Ecologia e Manejo Florestal',
    location: 'MPEG / Belém',
    initials: 'MC',
    badge: 'Ciência & Pesquisa',
    stars: 5,
  },
  {
    quote:
      'Como parceiro institucional, o que mais impressiona no INÃ é o rigor e a transparência em cada relatório. O investimento chega direto na ponta com impacto mensurável e respeito absoluto às comunidades.',
    author: 'Carlos Eduardo Alencar',
    role: 'Coordenador de Parcerias e Governança',
    location: 'Rede Clima e Territórios',
    initials: 'CA',
    badge: 'Transparência Auditada',
    stars: 5,
  },
];

export function SocialProofSection() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  return (
    <View style={styles.section}>
      {/* Amazonian organic river texture background watermark */}
      <AmazonTexture variant="river" color="#193322" opacity={0.06} />

      <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
        {/* Section Header */}
        <FadeInUp delay={60} distance={18}>
          <View style={styles.headerCol}>
            <View style={styles.kickerRow}>
              <View style={styles.kickerDot} />
              <Text style={styles.kickerText}>PROVA SOCIAL & VOZES DA FLORESTA</Text>
            </View>
            <Text style={[styles.heading, isDesktop ? styles.headingDesktop : isTablet ? styles.headingTablet : styles.headingMobile]}>
              Quem vive e constrói com o INÃ.
            </Text>
            <Text style={styles.subtitle}>
              Histórias reais de lideranças, agricultores e especialistas que transformam a realidade da Amazônia ao lado do Instituto.
            </Text>
          </View>
        </FadeInUp>

        {/* Quick Numbers / Proof Bar with animated numbers */}
        <FadeInUp delay={160} distance={22}>
          <View style={[styles.proofBar, !isDesktop && styles.proofBarMobile]}>
            <View style={[styles.proofItem, !isDesktop && styles.proofItemMobile]}>
              <AnimatedCounter target={1420} prefix="+" formatThousands={true} style={styles.proofValue} />
              <Text style={styles.proofLabel}>Famílias com renda fortalecida</Text>
            </View>

            <View style={[styles.proofItem, !isDesktop && styles.proofItemMobile]}>
              <AnimatedCounter target={12} style={styles.proofValue} />
              <Text style={styles.proofLabel}>Comunidades tradicionais atendidas</Text>
            </View>

            <View style={[styles.proofItem, !isDesktop && styles.proofItemMobile]}>
              <AnimatedCounter target={100} suffix="%" style={styles.proofValue} />
              <Text style={styles.proofLabel}>Prestação de contas e relatórios auditados</Text>
            </View>

            <View style={[styles.proofItem, !isDesktop && styles.proofItemMobile]}>
              <AnimatedCounter target={38000} formatThousands={true} style={styles.proofValue} />
              <Text style={styles.proofLabel}>Hectares de floresta sob manejo comunitário</Text>
            </View>
          </View>
        </FadeInUp>

        {/* Testimonials Grid (2 columns on Desktop, 1 on Mobile) with staggered entrance */}
        <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
          {testimonials.map((item, index) => (
            <FadeInUp
              key={index}
              delay={220 + index * 120}
              distance={26}
              style={[styles.card, !isDesktop ? styles.cardFullWidth : undefined]}
            >
              {/* Card Header with Stars and Tag */}
              <View style={styles.cardTopRow}>
                <View style={styles.starsRow}>
                  {Array.from({ length: item.stars }).map((_, sIdx) => (
                    <Text key={sIdx} style={styles.starText}>★</Text>
                  ))}
                </View>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{item.badge}</Text>
                </View>
              </View>

              {/* Quote Content */}
              <Text style={styles.quoteText}>
                “{item.quote}”
              </Text>

              {/* Author Row */}
              <View style={styles.authorRow}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{item.initials}</Text>
                </View>
                <View style={styles.authorInfoCol}>
                  <Text style={styles.authorName}>{item.author}</Text>
                  <Text style={styles.authorRole}>{item.role}</Text>
                  <Text style={styles.authorLocation}>{item.location}</Text>
                </View>
              </View>
            </FadeInUp>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: '#f3efe6',
    paddingVertical: 90,
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: 1382.4,
    alignSelf: 'center',
    position: 'relative',
    zIndex: 1,
  },
  headerCol: {
    marginBottom: 44,
    maxWidth: 780,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  kickerDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  kickerText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.primary,
    fontWeight: '700',
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -1.6,
    fontWeight: '400',
    marginBottom: 16,
  },
  headingDesktop: {
    fontSize: 54,
    lineHeight: 58,
  },
  headingTablet: {
    fontSize: 42,
    lineHeight: 46,
  },
  headingMobile: {
    fontSize: 32,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 25,
    color: colors.subtleText,
    fontWeight: '400',
  },
  proofBar: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 32,
    marginBottom: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  proofBarMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 24,
    paddingHorizontal: 24,
    gap: 20,
  },
  proofItem: {
    flex: 1,
  },
  proofItemMobile: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 12,
  },
  proofValue: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 38,
    color: colors.accent,
    fontWeight: '400',
    marginBottom: 4,
  },
  proofLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  card: {
    width: 'calc(50% - 12px)' as any,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(25, 51, 34, 0.08)',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(25, 51, 34, 0.04)',
      },
    }),
  },
  cardFullWidth: {
    width: '100%',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  starText: {
    color: '#d48b1d',
    fontSize: 16,
  },
  badgePill: {
    backgroundColor: 'rgba(37, 90, 63, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgePillText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    color: colors.primary,
  },
  quoteText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 25,
    color: colors.primary,
    fontStyle: 'italic',
    marginBottom: 24,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 'auto',
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.accent,
    fontWeight: '700',
  },
  authorInfoCol: {
    flex: 1,
  },
  authorName: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  authorRole: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
    marginTop: 2,
  },
  authorLocation: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: '#6e7a68',
    marginTop: 1,
  },
});
