import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from '../components/icons/ArrowRight';
import { DonationHeartIcon } from '../components/icons/DonationHeartIcon';

const projFotoRacao = require('../../assets/galeria/Racao-Artesanal-para-Piscicultura-1.webp');
const projFotoBiblioteca = require('../../assets/galeria/biblioteca-1.webp');
const projFotoBarco = require('../../assets/galeria/motorboat-lake-surrounded-by-beautiful-green-trees-cloudy-sky.jpg');
const projFotoMulheres = require('../../assets/galeria/67842325_1067674706768570_5900494219490885632_o-1-1024x768-1.webp');
const projFotoComunidade = require('../../assets/galeria/68558064_1077640049105369_4506630852079255552_o-1-768x540-1.webp');
const projFotoJovens = require('../../assets/galeria/DSC_4735-1-1-scaled.webp');
const projFotoCampo = require('../../assets/galeria/DSC_4771-1536x1021-1.webp');
const projFotoReuniao = require('../../assets/galeria/79496152_1172986396237400_2300327644140404736_n.webp');
const projFotoOficina = require('../../assets/galeria/80979428_1181805752022131_2449503888533880832_n.webp');

export interface ProjectDetail {
  id: string;
  category: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  fullStory: string;
  location: string;
  cardBg: string;
  image: any;
  stats: { value: string; label: string }[];
  gallery: any[];
}

export const allProjects: ProjectDetail[] = [
  {
    id: '1',
    category: 'Renda e Gênero',
    number: '01',
    title: 'Ração artesanal para piscicultura',
    tagline: 'Autonomia alimentar e geração de renda nas mãos de mulheres ribeirinhas.',
    description:
      'Produção comunitária de ração enriquecida a partir de frutos e insumos da Amazônia (açaí, mandioca, pupunha), protagonizada por mulheres agricultoras.',
    fullStory:
      'Nas margens dos rios da Zona Bragantina, a alimentação dos peixes representava até 70% dos custos dos pequenos criadores. Com apoio do INÃ, as agricultoras desenvolveram uma formulação artesanal rica e balanceada aproveitando a polpa de açaí, resíduos de mandioca e farelo nativo. A iniciativa barateou a produção, elevou o valor de venda do pescado e criou uma cooperativa feminina pioneira.',
    location: 'Região do Caeté, Pará',
    cardBg: '#f2eee3',
    image: projFotoRacao,
    stats: [
      { value: '70%', label: 'Redução de custos operacionais' },
      { value: '3x', label: 'Aumento na margem de lucro' },
      { value: '100%', label: 'Insumos de origem agroflorestal' },
    ],
    gallery: [projFotoRacao, projFotoMulheres, projFotoCampo, projFotoOficina],
  },
  {
    id: '2',
    category: 'Reciclagem & Inclusão',
    number: '02',
    title: 'Inclusão social e produtiva dos catadores',
    tagline: 'Economia circular transformando óleo usado em renda digna e ecologia urbana.',
    description:
      'Fortalecimento técnico e estrutural da cooperativa de catadores, com transformação de óleo de cozinha usado em sabão biodegradável e valorização humana.',
    fullStory:
      'A cooperativa Coomarca uniu recicladores urbanos em torno de um modelo de negócios limpo. Cada litro de óleo recolhido em restaurantes e residências é purificado e convertido em sabão em barra e líquido, gerando remuneração justa para os cooperados e evitando a contaminação de milhares de litros de água doce em nossos igarapés.',
    location: 'Bragança e arredores, Pará',
    cardBg: '#f2eee3',
    image: projFotoComunidade,
    stats: [
      { value: '12.000 L', label: 'Óleo vegetal reaproveitado' },
      { value: '80', label: 'Catadores com carteira fortalecida' },
      { value: '0%', label: 'Resíduos poluentes descartados' },
    ],
    gallery: [projFotoComunidade, projFotoReuniao, projFotoCampo, projFotoOficina],
  },
  {
    id: '3',
    category: 'Extrativismo Sustentável',
    number: '03',
    title: 'Paneiro do Mangal',
    tagline: 'Logística verde conectando o manguezal direto à mesa do consumidor consciente.',
    description:
      'Logística integrada e comercialização direta para produtos tradicionais de pesca, mariscos e farinhas da reserva, eliminando atravessadores.',
    fullStory:
      'Na Reserva Extrativista Caeté-Taperaçu, pescadores e marisqueiras enfrentavam a exploração de intermediários que ficavam com a maior parte da renda. O Paneiro do Mangal estruturou barco comunitário refrigerado, embalagens biodegradáveis com rastreabilidade e canais de venda direta em feiras ecológicas e cooperativas parceiras.',
    location: 'Reserva Extrativista Caeté-Taperaçu',
    cardBg: '#f2eee3',
    image: projFotoBarco,
    stats: [
      { value: '450 km', label: 'Rotas de escoamento fluvial' },
      { value: '+140%', label: 'Valorização direta do quilo' },
      { value: 'Selo', label: 'Origem artesanal certificada' },
    ],
    gallery: [projFotoBarco, projFotoCampo, projFotoMulheres, projFotoReuniao],
  },
  {
    id: '4',
    category: 'Educação Comunitária',
    number: '04',
    title: 'Biblioteca Comunitária do Chaú',
    tagline: 'Leitura viva, reforço escolar e memória ancestral para a infância ribeirinha.',
    description:
      'Espaço voluntário de alfabetização, reforço escolar, leitura viva e inclusão digital para crianças e jovens de comunidades isoladas.',
    fullStory:
      'Construída em mutirão sobre palafitas com madeira certificada, a Biblioteca do Chaú é o coração cultural da vila. Além de mais de 3.000 títulos infanto-juvenis, oferece oficinas de contação de histórias com anciãos, rodas de saberes sobre plantas medicinais e acompanhamento pedagógico contínuo para evitar a evasão escolar.',
    location: 'Comunidade do Chaú, Pará',
    cardBg: '#f2eee3',
    image: projFotoBiblioteca,
    stats: [
      { value: '3.200', label: 'Livros disponíveis no acervo' },
      { value: '98%', label: 'Frequência escolar mantida' },
      { value: '150', label: 'Crianças e jovens participantes' },
    ],
    gallery: [projFotoBiblioteca, projFotoJovens, projFotoOficina, projFotoReuniao],
  },
  {
    id: '5',
    category: 'Extrativismo Sustentável',
    number: '05',
    title: 'Meliponicultura nas Restingas',
    tagline: 'Abelhas nativas sem ferrão polinizando a floresta e gerando mel nobre.',
    description:
      'Criação de abelhas nativas sem ferrão para polinização da flora amazônica e produção de mel medicinal com selo de origem comunitária.',
    fullStory:
      'A meliponicultura resgata o cultivo de abelhas tiúba e uruçu nativas da Amazônia. As colmeias instaladas em quintais agroflorestais promovem a regeneração vegetal e garantem uma fonte de renda estável com produtos de alto valor agregado no mercado de gastronomia sustentável.',
    location: 'Mangais da Costa Paraense',
    cardBg: '#f2eee3',
    image: projFotoCampo,
    stats: [
      { value: '240', label: 'Colmeias ativas preservadas' },
      { value: '18 espécies', label: 'Plantas nativas polinizadas' },
      { value: 'Orgânico', label: 'Padrão fitoterápico de pureza' },
    ],
    gallery: [projFotoCampo, projFotoBarco, projFotoMulheres, projFotoOficina],
  },
  {
    id: '6',
    category: 'Renda e Gênero',
    number: '06',
    title: 'Fibras e Artesanato do Babaçu',
    tagline: 'Trançados tradicionais com design contemporâneo e remuneração justa.',
    description:
      'Resgate das técnicas tradicionais de trançado em palha e fibras vegetais, gerando independência financeira para artesãs locais.',
    fullStory:
      'Unindo saberes de gerações com oficinas de precificação justa e design ecológico, o projeto transforma a palha e as fibras do babaçu em peças utilitárias e decorativas premiadas, comercializadas em todo o país.',
    location: 'Comunidades da Zona Bragantina',
    cardBg: '#f2eee3',
    image: projFotoMulheres,
    stats: [
      { value: '60', label: 'Mulheres com renda própria' },
      { value: '100%', label: 'Fibras colhidas de forma sustentável' },
      { value: 'Nacional', label: 'Distribuição em cooperativas' },
    ],
    gallery: [projFotoMulheres, projFotoOficina, projFotoReuniao, projFotoJovens],
  },
];

interface ProjectsScreenProps {
  initialProjectId?: string | null;
  onSelectDonate?: () => void;
  onNavigate?: (tab: string) => void;
}

export function ProjectsScreen({
  initialProjectId,
  onSelectDonate,
  onNavigate,
}: ProjectsScreenProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;
  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    initialProjectId || null
  );
  const [galleryIndex, setGalleryIndex] = useState(0);

  const activeProject = allProjects.find((p) => p.id === selectedProjectId);

  const handlePrevPhoto = () => {
    if (!activeProject) return;
    setGalleryIndex((prev) => (prev > 0 ? prev - 1 : activeProject.gallery.length - 1));
  };

  const handleNextPhoto = () => {
    if (!activeProject) return;
    setGalleryIndex((prev) => (prev < activeProject.gallery.length - 1 ? prev + 1 : 0));
  };

  // Single Project Dedicated Page
  if (activeProject) {
    return (
      <View style={styles.detailContainer}>
        {/* Hero Cover Image & Title - Top starts directly below header menu */}
        <View style={styles.detailHeroWrapper}>
          <Image
            source={activeProject.image}
            style={styles.detailHeroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(4, 29, 19, 0.78)', 'rgba(4, 29, 19, 0.42)', 'rgba(4, 29, 19, 0.94)']}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Floating nav overlay over the photo */}
          <View style={[styles.detailHeroTopNav, { paddingHorizontal: horizontalPadding }]}>
            <TouchableOpacity
              onPress={() => setSelectedProjectId(null)}
              style={styles.backButtonOverlay}
              accessibilityRole="button"
              accessibilityLabel="Voltar para a lista de projetos"
            >
              <Text style={styles.backButtonArrowOverlay}>←</Text>
              <Text style={styles.backButtonTextOverlay}>Todos os Projetos</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.detailHeroContent, { paddingHorizontal: horizontalPadding }]}>
            <Text style={styles.detailNumber}>{activeProject.number}</Text>
            <Text style={styles.detailTitle}>{activeProject.title}</Text>
            <Text style={styles.detailTagline}>{activeProject.tagline}</Text>
            <Text style={styles.detailLocation}>📍 {activeProject.location}</Text>
          </View>
        </View>

        <View style={[styles.detailBody, { paddingHorizontal: horizontalPadding }]}>
          {/* Numbers / Stats Section */}
          <View style={styles.statsRow}>
            {activeProject.stats.map((s, idx) => (
              <View key={idx} style={styles.statCard}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Story Text — full width, no box */}
          <View style={styles.storySection}>
            <Text style={styles.storyKicker}>Histórico & Metodologia</Text>
            <Text style={styles.storyHeading}>Sobre o Projeto</Text>
            <Text style={styles.storyParagraph}>{activeProject.description}</Text>
            <Text style={styles.storyParagraph}>{activeProject.fullStory}</Text>
          </View>

          {/* Gallery Header */}
          <View style={styles.galleryHeader}>
            <View>
              <Text style={styles.galleryKicker}>Território em Imagens</Text>
              <Text style={styles.galleryTitle}>Galeria do Projeto</Text>
            </View>
            <View style={styles.galleryNavBox}>
              <Text style={styles.galleryCounter}>
                0{galleryIndex + 1} / 0{activeProject.gallery.length}
              </Text>
              <TouchableOpacity
                onPress={handlePrevPhoto}
                style={styles.galleryNavBtn}
                accessibilityRole="button"
                accessibilityLabel="Foto anterior"
              >
                <Text style={styles.galleryNavArrow}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextPhoto}
                style={styles.galleryNavBtn}
                accessibilityRole="button"
                accessibilityLabel="Próxima foto"
              >
                <Text style={styles.galleryNavArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Full-width Dynamic Photo Slider */}
          <View style={styles.dynamicSlider}>
            <View style={styles.activeSlide}>
              <Image
                source={activeProject.gallery[galleryIndex]}
                style={styles.slideImage}
                resizeMode="cover"
              />
              <View style={styles.slideBadge}>
                <Text style={styles.slideBadgeText}>Foto 0{galleryIndex + 1}</Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleNextPhoto}
              style={styles.peekSlide}
              accessibilityRole="button"
              accessibilityLabel="Ver próxima foto"
            >
              <Image
                source={activeProject.gallery[(galleryIndex + 1) % activeProject.gallery.length]}
                style={styles.slideImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(4, 29, 19, 0.6)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.peekArrowCircle}>
                <Text style={styles.peekArrowSymbol}>→</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Action Footer for Single Project */}
          <View style={styles.detailActionFooter}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onSelectDonate}
              style={styles.detailDonateBtn}
              accessibilityRole="button"
              accessibilityLabel="Fazer doação para este projeto"
            >
              <DonationHeartIcon size={18} color={colors.white} />
              <Text style={styles.detailDonateBtnText}>Fazer doação para este projeto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setSelectedProjectId(null)}
              style={styles.detailOtherProjectsBtn}
              accessibilityRole="button"
            >
              <Text style={styles.detailOtherProjectsBtnText}>Ver outros projetos</Text>
              <ArrowRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.kicker}>Projetos no Território</Text>
        <Text style={styles.title}>
          Transformação real construída de mãos dadas com a comunidade.
        </Text>
        <Text style={styles.subtitle}>
          Cada projeto do INÃ é desenhado para gerar autonomia econômica e conservação
          ativa dos ecossistemas amazônicos. Clique em um projeto para ver a história e galeria completa.
        </Text>
      </View>

      {/* Projects Grid */}
      <View style={[styles.gridContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
          {allProjects.map((item) => {
            const isDark = item.cardBg === '#526635';
            const titleColor = isDark ? '#ffffff' : '#143d2b';
            const descColor = isDark ? 'rgba(255,255,255,0.95)' : '#4f6559';
            const locationColor = isDark ? '#ffffff' : '#143d2b';

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.92}
                onPress={() => setSelectedProjectId(item.id)}
                style={styles.card}
                accessibilityRole="button"
                accessibilityLabel={`Projeto ${item.number}: ${item.title}. Local: ${item.location}. ${item.description}`}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={item.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                    accessible={false}
                    importantForAccessibility="no"
                  />
                </View>

                <View style={[styles.cardContent, { backgroundColor: item.cardBg }]}>
                  <View style={styles.cardMetaRow}>
                    <Text style={[styles.cardNum, { color: titleColor }]}>{item.number}</Text>
                    <Text style={[styles.cardLocation, { color: locationColor }]}>
                      📍 {item.location}
                    </Text>
                  </View>

                  <Text style={[styles.cardTitle, { color: titleColor }]}>{item.title}</Text>
                  <Text style={[styles.cardDesc, { color: descColor }]}>{item.description}</Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.cardActionBtn}>
                      <Text
                        style={[
                          styles.cardActionText,
                          isDark && { color: '#ffffff' },
                        ]}
                      >
                        Conhecer projeto
                      </Text>
                      <ArrowRight
                        size={16}
                        color={isDark ? '#ffffff' : colors.primary}
                        strokeWidth={1.6}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    paddingBottom: 80,
  },
  headerBanner: {
    paddingVertical: 60,
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  kicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 12,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 48,
    lineHeight: 52,
    color: colors.primary,
    letterSpacing: -1.4,
    maxWidth: 900,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: colors.subtleText,
    maxWidth: 720,
    marginBottom: 32,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.12)',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
  },
  filterTextActive: {
    color: colors.white,
  },
  gridContainer: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 24,
  },
  card: {
    width: 'calc(50% - 12px)' as any,
    minWidth: 300,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
      },
    }),
  },
  cardImageContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
    backgroundColor: '#1b3b2c',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#fffdf8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  cardContent: {
    padding: 28,
    minHeight: 240,
    justifyContent: 'space-between',
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardNum: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    letterSpacing: 1,
  },
  cardLocation: {
    fontFamily: fonts.sans,
    fontSize: 12,
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.6,
    marginBottom: 10,
  },
  cardDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  cardActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardActionText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },

  // Detail View Styles
  detailContainer: {
    width: '100%',
    backgroundColor: colors.background,
    paddingBottom: 100,
  },
  detailHeroWrapper: {
    width: '100%',
    height: 500,
    position: 'relative',
    justifyContent: 'flex-end',
    backgroundColor: '#041d13',
  },
  detailHeroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  detailHeroTopNav: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  backButtonOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(4, 29, 19, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
      },
    }),
  },
  backButtonArrowOverlay: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '700',
  },
  backButtonTextOverlay: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.white,
  },
  detailBadgeOverlay: {
    backgroundColor: 'rgba(201, 243, 107, 0.25)',
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)',
      },
    }),
  },
  detailBadgeTextOverlay: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  detailHeroContent: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: 48,
    zIndex: 2,
  },
  detailNumber: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.accent,
    letterSpacing: 2,
    marginBottom: 8,
  },
  detailTitle: {
    fontFamily: fonts.serif,
    fontSize: 54,
    lineHeight: 58,
    color: colors.white,
    letterSpacing: -1.6,
    maxWidth: 900,
    marginBottom: 12,
  },
  detailTagline: {
    fontFamily: fonts.sans,
    fontSize: 18,
    lineHeight: 28,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: 720,
    marginBottom: 10,
  },
  detailLocation: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.accent,
  },
  detailBody: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    marginTop: 48,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 44,
  },
  statCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({
      web: { boxShadow: '0 4px 16px rgba(0,0,0,0.04)' },
    }),
  },
  statValue: {
    fontFamily: fonts.serif,
    fontSize: 38,
    lineHeight: 42,
    color: colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.subtleText,
  },
  storySection: {
    marginBottom: 60,
    maxWidth: 960,
  },
  storyKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.primary,
    marginBottom: 8,
  },
  storyHeading: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 40,
    color: colors.primary,
    letterSpacing: -0.6,
    marginBottom: 20,
  },
  storyParagraph: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 28,
    color: '#344c3f',
    marginBottom: 16,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  galleryKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.primary,
    marginBottom: 4,
  },
  galleryTitle: {
    fontFamily: fonts.serif,
    fontSize: 30,
    lineHeight: 34,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  galleryNavBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  galleryCounter: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    marginRight: 6,
  },
  galleryNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  galleryNavArrow: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
  dynamicSlider: {
    flexDirection: 'row',
    gap: 16,
    height: 540,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 60,
  },
  activeSlide: {
    width: '67%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1b3b2c',
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
    }),
  },
  peekSlide: {
    width: '31%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1b3b2c',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  slideBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(4, 29, 19, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  slideBadgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.accent,
    letterSpacing: 0.6,
  },
  peekArrowCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 4px 14px rgba(0,0,0,0.25)' },
    }),
  },
  peekArrowSymbol: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
  },
  detailActionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(20, 61, 43, 0.12)',
  },
  detailDonateBtn: {
    backgroundColor: colors.primaryButton,
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 18px rgba(22, 75, 53, 0.28)',
      },
    }),
  },
  detailDonateBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.white,
    fontWeight: '700',
  },
  detailOtherProjectsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  detailOtherProjectsBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
});
