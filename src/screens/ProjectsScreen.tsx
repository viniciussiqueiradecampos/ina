import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowUpRight } from '../components/icons/ArrowUpRight';

const p1 = require('../../assets/project-1.png');
const p2 = require('../../assets/project-2.png');
const p3 = require('../../assets/project-3.png');
const p4 = require('../../assets/project-4.png');

interface ProjectDetail {
  id: string;
  category: string;
  number: string;
  title: string;
  description: string;
  location: string;
  families: string;
  image: any;
  cardBg: string;
}

const allProjectsList: ProjectDetail[] = [
  {
    id: '1',
    category: 'Renda e Gênero',
    number: '01',
    title: 'Ração artesanal para piscicultura',
    description:
      'Produção comunitária de ração enriquecida a partir de frutos e insumos da Amazônia (açaí, mandioca, pupunha), protagonizada por mulheres agricultoras.',
    location: 'Região do Caeté, Pará',
    families: '45 famílias diretamente',
    image: p1,
    cardBg: '#c9f36b',
  },
  {
    id: '2',
    category: 'Reciclagem & Inclusão',
    number: '02',
    title: 'Inclusão social e produtiva dos catadores',
    description:
      'Fortalecimento técnico e estrutural da Coomarca, com transformação de óleo de cozinha usado em sabão biodegradável e valorização dos trabalhadores.',
    location: 'Bragança e arredores, Pará',
    families: '80 catadores cooperados',
    image: p2,
    cardBg: '#f2eee3',
  },
  {
    id: '3',
    category: 'Extrativismo Sustentável',
    number: '03',
    title: 'Paneiro do Mangal',
    description:
      'Logística integrada e comercialização direta para produtos tradicionais de pesca, mariscos e farinhas da reserva, conectando ribeirinhos ao consumidor consciente.',
    location: 'Reserva Extrativista Caeté-Taperaçu',
    families: '120 famílias ribeirinhas',
    image: p3,
    cardBg: '#f07a4f',
  },
  {
    id: '4',
    category: 'Educação Comunitária',
    number: '04',
    title: 'Biblioteca Comunitária do Chaú',
    description:
      'Espaço voluntário de alfabetização, reforço escolar, leitura viva e inclusão digital para mais de 150 crianças e jovens de comunidades isoladas.',
    location: 'Comunidade do Chaú, Pará',
    families: '150 crianças atendidas',
    image: p4,
    cardBg: '#f2eee3',
  },
  {
    id: '5',
    category: 'Extrativismo Sustentável',
    number: '05',
    title: 'Meliponicultura nas Restingas',
    description:
      'Criação de abelhas nativas sem ferrão para polinização da flora amazônica e produção de mel medicinal com selo de origem comunitária.',
    location: 'Mangais da Costa Paraense',
    families: '35 famílias capacitadas',
    image: p1,
    cardBg: '#c9f36b',
  },
  {
    id: '6',
    category: 'Renda e Gênero',
    number: '06',
    title: 'Fibras e Artesanato do Babaçu',
    description:
      'Resgate das técnicas tradicionais de trançado em palha e fibras vegetais, gerando independência financeira para artesãs locais.',
    location: 'Comunidades da Zona Bragantina',
    families: '60 artesãs',
    image: p3,
    cardBg: '#f07a4f',
  },
];

const categories = ['Todos', 'Renda e Gênero', 'Reciclagem & Inclusão', 'Extrativismo Sustentável', 'Educação Comunitária'];

export function ProjectsScreen({ onSelectDonate }: { onSelectDonate: () => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const [selectedCat, setSelectedCat] = useState('Todos');

  const filtered = selectedCat === 'Todos'
    ? allProjectsList
    : allProjectsList.filter((p) => p.category === selectedCat);

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
          ativa dos ecossistemas amazônicos.
        </Text>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          {categories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCat(cat)}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Projects Grid */}
      <View style={[styles.gridContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.badgePill}>
                  <Text style={styles.badgeText}>{item.category}</Text>
                </View>
              </View>

              <View style={[styles.cardContent, { backgroundColor: item.cardBg }]}>
                <View style={styles.cardMetaRow}>
                  <Text style={styles.cardNum}>{item.number}</Text>
                  <Text style={styles.cardLocation}>📍 {item.location}</Text>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardFamilies}>👥 {item.families}</Text>
                  <TouchableOpacity
                    onPress={onSelectDonate}
                    style={styles.cardActionBtn}
                  >
                    <Text style={styles.cardActionText}>Apoiar este projeto</Text>
                    <ArrowUpRight size={16} color={colors.primary} strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
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
    backgroundColor: 'rgba(20, 61, 43, 0.06)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.primaryButton,
    borderColor: colors.primaryButton,
  },
  filterText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12.5,
    color: colors.primary,
  },
  filterTextActive: {
    color: colors.white,
    fontFamily: fonts.sansBold,
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
  },
  card: {
    width: '48.5%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f2eee3',
  },
  cardImageContainer: {
    height: 320,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    position: 'absolute',
    top: 18,
    left: 18,
    backgroundColor: '#fffdf8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  cardContent: {
    padding: 26,
    minHeight: 240,
    justifyContent: 'space-between',
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardNum: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.primary,
  },
  cardLocation: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.subtleText,
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    lineHeight: 36,
    color: colors.primary,
    marginBottom: 10,
  },
  cardDesc: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 21,
    color: '#344b3d',
    marginBottom: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(20, 61, 43, 0.15)',
    paddingTop: 14,
  },
  cardFamilies: {
    fontFamily: fonts.sansBold,
    fontSize: 11.5,
    color: colors.primary,
  },
  cardActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 2,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.primary,
  },
  cardActionText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.primary,
  },
});
