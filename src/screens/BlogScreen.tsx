import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowUpRight } from '../components/icons/ArrowUpRight';

const blogImg1 = require('../../assets/project-1.png');
const blogImg2 = require('../../assets/project-2.png');
const blogImg3 = require('../../assets/project-3.png');
const blogImg4 = require('../../assets/project-4.png');

interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: any;
  featured?: boolean;
}

const postsList: BlogPost[] = [
  {
    id: '1',
    category: 'Histórias do Território',
    date: '10 de Novembro, 2026',
    readTime: '5 min de leitura',
    title: 'Da mandioca e do açaí: como as mulheres do Caeté criaram uma ração pioneira',
    excerpt:
      'Uma conversa profunda com Dona Maria do Socorro sobre autonomia econômica, resgate de ingredientes nativos e a soberania das famílias ribeirinhas no Pará.',
    image: blogImg1,
    featured: true,
  },
  {
    id: '2',
    category: 'Economia Circular',
    date: '02 de Novembro, 2026',
    readTime: '4 min de leitura',
    title: 'Transformando resíduos em dignidade: o cotidiano da Coomarca em Bragança',
    excerpt:
      'Como a cooperativa de catadores superou desafios logísticos e hoje produz sabão artesanal de alta qualidade a partir do óleo de cozinha recolhido.',
    image: blogImg2,
  },
  {
    id: '3',
    category: 'Sustentabilidade',
    date: '24 de Outubro, 2026',
    readTime: '6 min de leitura',
    title: 'Por que o transporte direto salva a renda dos ribeirinhos na Caeté-Taperaçu',
    excerpt:
      'A logística solidária do Paneiro do Mangal garante que o valor do pescado e mariscos fique com as famílias extrativistas, e não com intermediários.',
    image: blogImg3,
  },
  {
    id: '4',
    category: 'Educação Comunitária',
    date: '15 de Outubro, 2026',
    readTime: '3 min de leitura',
    title: 'Abertura do acervo infantil na Biblioteca Comunitária do Chaú',
    excerpt:
      'Mais de 400 novos livros doados chegaram à comunidade ribeirinha, fortalecendo as oficinas de leitura e reforço escolar no contraturno das aulas.',
    image: blogImg4,
  },
];

export function BlogScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Histórias do Território', 'Economia Circular', 'Sustentabilidade', 'Educação Comunitária'];

  const filtered = selectedCategory === 'Todos'
    ? postsList
    : postsList.filter((p) => p.category === selectedCategory);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const regularPosts = filtered.filter((p) => p.id !== featured?.id);

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.kicker}>Notícias & Vozes da Floresta</Text>
        <Text style={styles.title}>Blog do Instituto Nova Amazônia</Text>
        <Text style={styles.subtitle}>
          Relatos de campo, pesquisas, histórias de vida e reflexões sobre a conservação
          amazônica contadas por quem está no território.
        </Text>

        {/* Categories Filter */}
        <View style={styles.catFilterRow}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[styles.catChip, isActive && styles.catChipActive]}
              >
                <Text style={[styles.catChipText, isActive && styles.catChipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Featured Post Card */}
      {featured && (
        <View style={[styles.featuredContainer, { paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.featuredCard, !isDesktop && styles.featuredCardMobile]}>
            <View style={styles.featuredImageContainer}>
              <Image source={featured.image} style={styles.featuredImage} resizeMode="cover" />
            </View>

            <View style={styles.featuredContent}>
              <View style={styles.metaRow}>
                <View style={styles.badgePill}><Text style={styles.badgeText}>{featured.category}</Text></View>
                <Text style={styles.dateText}>{featured.date} • {featured.readTime}</Text>
              </View>

              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredExcerpt}>{featured.excerpt}</Text>

              <TouchableOpacity style={styles.readMoreLink}>
                <Text style={styles.readMoreText}>Ler artigo completo</Text>
                <ArrowUpRight size={16} color={colors.primary} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Regular Posts Grid */}
      <View style={[styles.postsGridContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.postsGrid, !isDesktop && styles.postsGridMobile]}>
          {regularPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postCardImageContainer}>
                <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                <View style={styles.postBadge}><Text style={styles.badgeText}>{post.category}</Text></View>
              </View>

              <View style={styles.postCardContent}>
                <Text style={styles.postDate}>{post.date} • {post.readTime}</Text>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postExcerpt}>{post.excerpt}</Text>

                <TouchableOpacity style={styles.postLink}>
                  <Text style={styles.readMoreText}>Ler mais</Text>
                  <ArrowUpRight size={14} color={colors.primary} strokeWidth={1.5} />
                </TouchableOpacity>
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
  catFilterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 100,
    backgroundColor: 'rgba(20, 61, 43, 0.06)',
  },
  catChipActive: {
    backgroundColor: colors.primaryButton,
  },
  catChipText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  catChipTextActive: {
    color: colors.white,
    fontFamily: fonts.sansBold,
  },
  featuredContainer: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 60,
  },
  featuredCard: {
    backgroundColor: '#f2eee3',
    borderRadius: 24,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  featuredCardMobile: {
    flexDirection: 'column',
  },
  featuredImageContainer: {
    flex: 1.2,
    minHeight: 380,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredContent: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    gap: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  badgePill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 9.5,
    textTransform: 'uppercase',
    color: colors.accentDarkText,
  },
  dateText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
  },
  featuredTitle: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 38,
    color: colors.primary,
  },
  featuredExcerpt: {
    fontFamily: fonts.sans,
    fontSize: 14.5,
    lineHeight: 23,
    color: '#42574b',
  },
  readMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 2,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.primary,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  readMoreText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
  },
  postsGridContainer: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  postsGridMobile: {
    flexDirection: 'column',
  },
  postCard: {
    width: '31.5%',
    minWidth: 280,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 0.8,
    borderColor: 'rgba(20, 61, 43, 0.1)',
  },
  postCardImageContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#fffdf8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  postCardContent: {
    padding: 22,
    gap: 10,
  },
  postDate: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.subtleText,
  },
  postTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.primary,
  },
  postExcerpt: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: '#4c6154',
  },
  postLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
});
