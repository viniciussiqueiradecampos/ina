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
import { ArrowUpRight } from '../components/icons/ArrowUpRight';

interface MediaArticle {
  id: string;
  source: string;
  type: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
}

const mediaArticlesList: MediaArticle[] = [
  {
    id: 'm1',
    source: 'Globo Rural',
    type: 'Reportagem Especial',
    date: 'Outubro de 2026',
    title: 'Mulheres ribeirinhas do Pará inovam com ração 100% nativa na piscicultura familiar',
    excerpt:
      'Iniciativa pioneira apoiada pelo Instituto INÃ barateia em até 70% o custo com alimentação de peixes no Rio Caeté, substituindo insumos industriais por açaí e mandioca.',
    url: '#',
  },
  {
    id: 'm2',
    source: 'Revista Cenarium',
    type: 'Entrevista',
    date: 'Setembro de 2026',
    title: 'Instituto INÃ: a tecnologia social que fortalece cadeias da Amazônia Oriental',
    excerpt:
      'Em entrevista exclusiva, fundadoras e lideranças comunitárias explicam como a escuta ativa e a soberania econômica guiam todas as ações de conservação.',
    url: '#',
  },
  {
    id: 'm3',
    source: 'Mongabay Brasil',
    type: 'Artigo / Investigação',
    date: 'Agosto de 2026',
    title: 'Economia circular na maré: cooperativas de reciclagem transformam óleo em renda justa',
    excerpt:
      'Como a cooperativa Coomarca, apoiada pelo INÃ em Bragança, retirou milhares de litros de óleo dos cursos d’água e transformou resíduo em produto de alto valor comercial.',
    url: '#',
  },
  {
    id: 'm4',
    source: 'Folha de S.Paulo',
    type: 'Caderno Sustentabilidade',
    date: 'Julho de 2026',
    title: 'Da floresta para o país: o modelo comunitário de governança no território do Caeté',
    excerpt:
      'Uma análise aprofundada sobre iniciativas que provam que o desenvolvimento sustentável começa por quem habita o território, e não por gabinetes externos.',
    url: '#',
  },
  {
    id: 'm5',
    source: 'O Liberal',
    type: 'Economia Regional',
    date: 'Junho de 2026',
    title: 'Paneiro do Mangal: logística solidária valoriza marisqueiras e pescadores artesanais',
    excerpt:
      'Eliminação de atravessadores na Reserva Caeté-Taperaçu gera acréscimo de mais de 140% no valor do quilo do pescado comercializado em feiras orgânicas.',
    url: '#',
  },
  {
    id: 'm6',
    source: 'Canal Futura',
    type: 'Documentário / TV',
    date: 'Maio de 2026',
    title: 'Saber Tradicional e Alfabetização Viva na Biblioteca do Chaú',
    excerpt:
      'Espaço voluntário construído sobre palafitas com madeira certificada vira modelo de educação comunitária integrada à floresta para mais de 150 crianças.',
    url: '#',
  },
];

export function MediaScreen({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;
  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const filters = ['Todas', 'Reportagem Especial', 'Entrevista', 'Artigo / Investigação', 'Economia Regional', 'Documentário / TV'];

  const filteredArticles = selectedFilter === 'Todas'
    ? mediaArticlesList
    : mediaArticlesList.filter((a) => a.type === selectedFilter);

  return (
    <View style={styles.container}>
      {/* Top Hero Banner */}
      <View style={[styles.heroSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.kickerRow}>
          <View style={styles.kickerDot} />
          <Text style={styles.kickerText}>IMPRENSA & RECONHECIMENTO PÚBLICO</Text>
        </View>

        <Text style={styles.heroTitle}>O INÃ na Mídia</Text>
        <Text style={styles.heroSub}>
          Acompanhe reportagens, entrevistas, artigos e coberturas da imprensa nacional e internacional
          sobre o impacto real e a presença viva do Instituto Nova Amazônia no território.
        </Text>

        {/* Filter Pills */}
        <View style={styles.filtersRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setSelectedFilter(f)}
              style={[
                styles.filterPill,
                selectedFilter === f && styles.filterPillActive,
              ]}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.filterPillText,
                  selectedFilter === f && styles.filterPillTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Articles Grid */}
      <View style={[styles.contentSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.articlesGrid, !isDesktop && styles.articlesGridMobile]}>
          {filteredArticles.map((article) => (
            <View key={article.id} style={styles.articleCard}>
              <View style={styles.cardHeader}>
                <View style={styles.sourceBadge}>
                  <Text style={styles.sourceBadgeText}>{article.source}</Text>
                </View>
                <Text style={styles.dateText}>{article.date}</Text>
              </View>

              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleExcerpt}>{article.excerpt}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.typeTag}>{article.type}</Text>
                <TouchableOpacity
                  style={styles.readMoreBtn}
                  activeOpacity={0.8}
                  accessibilityRole="link"
                >
                  <Text style={styles.readMoreText}>Acessar matéria</Text>
                  <ArrowUpRight size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Press Box */}
        <View style={styles.pressContactBox}>
          <View style={styles.pressContactInfo}>
            <Text style={styles.pressContactTitle}>Assessoria de Imprensa & Mídia</Text>
            <Text style={styles.pressContactSub}>
              É jornalista ou produtor de conteúdo e deseja agendar entrevistas com nossas lideranças,
              solicitar dados técnicos ou captar imagens em campo? Fale diretamente com nossa assessoria.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.pressContactBtn}
            onPress={() => onNavigate && onNavigate('Contato')}
            activeOpacity={0.88}
          >
            <Text style={styles.pressContactBtnText}>Falar com Assessoria</Text>
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
    paddingBottom: 100,
  },
  heroSection: {
    paddingTop: 80,
    paddingBottom: 40,
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
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
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 52,
    lineHeight: 56,
    color: colors.primary,
    letterSpacing: -1.4,
    marginBottom: 16,
  },
  heroSub: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: colors.subtleText,
    maxWidth: 720,
    marginBottom: 32,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: '#e6e1d5',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  filterPillActive: {
    backgroundColor: colors.primary,
  },
  filterPillText: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    color: colors.primary,
  },
  filterPillTextActive: {
    color: colors.white,
  },
  contentSection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 20,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 60,
  },
  articlesGridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  articleCard: {
    flex: 1,
    minWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'space-between',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceBadge: {
    backgroundColor: 'rgba(20, 61, 43, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sourceBadgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 11.5,
    color: colors.primary,
    fontWeight: '700',
  },
  dateText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
  },
  articleTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    color: colors.primary,
  },
  articleExcerpt: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.subtleText,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(20, 61, 43, 0.06)',
  },
  typeTag: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  readMoreText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  pressContactBox: {
    backgroundColor: '#164b35',
    borderRadius: 24,
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  pressContactInfo: {
    flex: 1,
    minWidth: 280,
    gap: 8,
  },
  pressContactTitle: {
    fontFamily: fonts.serif,
    fontSize: 26,
    lineHeight: 30,
    color: colors.white,
  },
  pressContactSub: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  pressContactBtn: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 28,
    paddingVertical: 14,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  pressContactBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
});
