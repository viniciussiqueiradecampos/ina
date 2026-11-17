import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { FadeInUp } from './FadeInUp';
import { DonationHeartIcon } from './icons/DonationHeartIcon';
import { ArrowRight } from './icons/ArrowRight';

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
      'A parceria comunitária com o INÃ impulsionou nossos grupos produtivos, garantindo autonomia, manejo responsável e fortalecimento social em nossa comunidade.',
    author: 'Dona Raimunda Nonata',
    role: 'Agricultora & Liderança Local',
    location: 'Comunidade Modelo / Região Norte',
    initials: 'RN',
    badge: 'Produção Sustentável',
    stars: 5,
  },
  {
    quote:
      'O trabalho valoriza nossos saberes ancestrais e fortalece a gestão das águas e das matas com metodologia colaborativa e escuta atenta.',
    author: 'Seu Benedito de Paula',
    role: 'Mestre Tradicional e Pescador Artesanal',
    location: 'Comunidade Chaú / Território Tradicional',
    initials: 'BP',
    badge: 'Guardião das Águas',
    stars: 5,
  },
  {
    quote:
      'Uma metodologia que alia conhecimento de campo com boas práticas de monitoramento e impacto socioambiental mensurável a longo prazo.',
    author: 'Dra. Mariana Caldas',
    role: 'Pesquisadora em Ecologia e Conservação',
    location: 'Centro de Pesquisas Aplicadas',
    initials: 'MC',
    badge: 'Ciência & Conservação',
    stars: 5,
  },
  {
    quote:
      'Transparência impecável em cada prestação e um compromisso real com a transformação direta de famílias e ecossistemas.',
    author: 'Carlos Eduardo Alencar',
    role: 'Gestor de Parcerias Institucionais',
    location: 'Rede de Apoio Territorial',
    initials: 'CA',
    badge: 'Governança & Impacto',
    stars: 5,
  },
];

interface SocialProofSectionProps {
  onOpenDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function SocialProofSection({
  onOpenDonate,
  onNavigate,
}: SocialProofSectionProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);

  // In desktop we show 2 cards at a time; in mobile 1 card at a time
  const itemsPerPage = isDesktop ? 2 : 1;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <View style={styles.section}>
      <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
        {/* Section Header */}
        <FadeInUp delay={60} distance={18}>
          <View style={styles.headerRow}>
            <View style={styles.headerCol}>
              <View style={styles.kickerRow}>
                <View style={styles.kickerDot} />
                <Text style={styles.kickerText}>PROVA SOCIAL & VOZES DA FLORESTA</Text>
              </View>
              <Text
                style={[
                  styles.heading,
                  isDesktop
                    ? styles.headingDesktop
                    : isTablet
                    ? styles.headingTablet
                    : styles.headingMobile,
                ]}
              >
                Quem vive e constrói com o INÃ.
              </Text>
              <Text style={styles.subtitle}>
                Depoimentos de lideranças, parceiros e especialistas que constroem
                diariamente caminhos sustentáveis e solidários.
              </Text>
            </View>

            {/* Carousel Navigation Arrows */}
            <View style={styles.carouselNavButtons}>
              <TouchableOpacity
                onPress={prevSlide}
                style={styles.navButton}
                accessibilityRole="button"
                accessibilityLabel="Depoimento anterior"
              >
                <Text style={styles.navButtonText}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={nextSlide}
                style={styles.navButton}
                accessibilityRole="button"
                accessibilityLabel="Próximo depoimento"
              >
                <Text style={styles.navButtonText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeInUp>

        {/* Carousel Cards View */}
        <View style={styles.carouselWrapper}>
          <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
            {visibleTestimonials.map((item, index) => (
              <FadeInUp
                key={`${currentIndex}-${index}`}
                delay={80 + index * 80}
                distance={20}
                style={[
                  styles.card,
                  isDesktop ? styles.cardDesktop : styles.cardFullWidth,
                ]}
              >
                {/* Card Header with Stars and Tag */}
                <View style={styles.cardTopRow}>
                  <View
                    style={styles.starsRow}
                    accessible={true}
                    accessibilityLabel={`Avaliação: ${item.stars} de 5 estrelas`}
                  >
                    {Array.from({ length: item.stars }).map((_, sIdx) => (
                      <Text
                        key={sIdx}
                        style={styles.starText}
                        accessible={false}
                        importantForAccessibility="no"
                      >
                        ★
                      </Text>
                    ))}
                  </View>
                  <View style={styles.badgePill}>
                    <Text style={styles.badgePillText}>{item.badge}</Text>
                  </View>
                </View>

                {/* Quote Content */}
                <Text style={styles.quoteText}>“{item.quote}”</Text>

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

          {/* Pagination Indicators */}
          <View style={styles.paginationRow}>
            {Array.from({ length: totalPages }).map((_, pageIdx) => (
              <TouchableOpacity
                key={pageIdx}
                onPress={() => setCurrentIndex(pageIdx)}
                style={[
                  styles.dot,
                  currentIndex === pageIdx && styles.dotActive,
                ]}
                accessibilityLabel={`Slide ${pageIdx + 1}`}
              />
            ))}
          </View>
        </View>

        {/* CTAs directly below social proof */}
        <FadeInUp delay={200} distance={20}>
          <View style={styles.actionsContainer}>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 36,
    flexWrap: 'wrap',
    gap: 20,
  },
  headerCol: {
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
  carouselNavButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(25, 51, 34, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      },
    }),
  },
  navButtonText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
    lineHeight: 22,
  },
  carouselWrapper: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(25, 51, 34, 0.08)',
    minHeight: 260,
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(25, 51, 34, 0.04)',
      },
    }),
  },
  cardDesktop: {
    flex: 1,
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
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(20, 61, 43, 0.2)',
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.primary,
  },
  actionsContainer: {
    marginTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
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
