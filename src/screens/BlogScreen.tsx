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
import { ArrowRight } from '../components/icons/ArrowRight';

const blogImg1 = require('../../assets/galeria/67842325_1067674706768570_5900494219490885632_o-1-1024x768-1.webp');
const blogImg2 = require('../../assets/galeria/68558064_1077640049105369_4506630852079255552_o-1-768x540-1.webp');
const blogImg3 = require('../../assets/galeria/motorboat-lake-surrounded-by-beautiful-green-trees-cloudy-sky.jpg');
const blogImg4 = require('../../assets/galeria/biblioteca-1.webp');

interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  fullContent?: string;
  author?: string;
  image: any;
  featured?: boolean;
}

const postsList: BlogPost[] = [
  {
    id: '1',
    category: 'Histórias do Território',
    date: '10 de Novembro, 2026',
    readTime: '5 min de leitura',
    author: 'Equipe Editorial INÃ',
    title: 'Da mandioca e do açaí: como as mulheres do Caeté criaram uma ração pioneira',
    excerpt:
      'Uma conversa profunda com Dona Maria do Socorro sobre autonomia econômica, resgate de ingredientes nativos e a soberania das famílias ribeirinhas no Pará.',
    fullContent: `Nas margens sinuosas do Rio Caeté, no nordeste do Pará, a relação das comunidades ribeirinhas com as águas é ancestral. Contudo, ao longo dos últimos anos, o encarecimento dos insumos industriais colocou em xeque a sustentabilidade da piscicultura familiar. A ração comercializada por grandes distribuidores chegava a representar 70% dos custos operacionais, consumindo a maior parte da renda das mulheres responsáveis pelos tanques-rede e viveiros escavados.

Diante desse cenário desafiador, um grupo de 35 mulheres agricultoras e pescadoras, reunidas em oficinas técnicas promovidas pelo Instituto Nova Amazônia (INÃ), decidiu buscar na própria floresta a resposta que os mercados externos não ofereciam.

A fórmula desenvolvida combina o farelo de mandioca e a polpa excedente de açaí com resíduos de sementes e folhas ricas em proteína vegetal da flora local. O resultado foi uma ração 100% agroecológica, de alta palatabilidade e custo de produção três vezes inferior ao produto comercial.

"A gente aprendeu que a floresta dá tudo que precisamos, desde que tenhamos sabedoria para respeitar seus ciclos", conta Dona Maria do Socorro, liderança comunitária e pioneira do projeto. "Hoje nós não apenas alimentamos nossos peixes com qualidade comprovada em análises laboratoriais parceiras, mas geramos trabalho cooperativo e renda direta que fica dentro da nossa própria comunidade."

Com a consolidação do primeiro centro comunitário de moagem e peletização, a cooperativa feminina já abastece pequenos criadores de três municípios vizinhos, mostrando que a bioeconomia solidária é o caminho mais sólido para o futuro da Amazônia.`,
    image: blogImg1,
    featured: true,
  },
  {
    id: '2',
    category: 'Economia Circular',
    date: '02 de Novembro, 2026',
    readTime: '4 min de leitura',
    author: 'Coletivo de Comunicação Coomarca',
    title: 'Transformando resíduos em dignidade: o cotidiano da Coomarca em Bragança',
    excerpt:
      'Como a cooperativa de catadores superou desafios logísticos e hoje produz sabão artesanal de alta qualidade a partir do óleo de cozinha recolhido.',
    fullContent: `Em centros urbanos da Amazônia Oriental, o descarte inadequado de óleo vegetal costumava ter como destino os cursos d’água e igarapés, contaminando centenas de milhares de litros de água doce a cada mês. Em Bragança, essa realidade começou a ser reescrita com a estruturação da cooperativa Coomarca.

Apoiada pelo INÃ com equipamentos de filtragem, capacitação em química verde e logística reversa, a cooperativa reúne hoje 80 recicladores urbanos. O óleo doado por restaurantes, feiras e residências passa por um processo rigoroso de decantação e purificação antes de ser transformado em sabão artesanal, barras multiuso e detergente biodegradável.

"O que para muitos era lixo poluente, nas nossas mãos virou sustento, dignidade e respeito para nossas famílias", relata Marcos Pereira, associado da cooperativa.

Além da geração direta de renda com carteira assinada e partilha de lucros, o projeto promove campanhas semanais de educação ambiental nas escolas da rede pública, criando uma rede de conscientização comunitária que já retirou mais de 12.000 litros de óleo do ecossistema local.`,
    image: blogImg2,
  },
  {
    id: '3',
    category: 'Sustentabilidade',
    date: '24 de Outubro, 2026',
    readTime: '6 min de leitura',
    author: 'Núcleo de Cadeias da Sociobiodiversidade',
    title: 'Por que o transporte direto salva a renda dos ribeirinhos na Caeté-Taperaçu',
    excerpt:
      'A logística solidária do Paneiro do Mangal garante que o valor do pescado e mariscos fique com as famílias extrativistas, e não com intermediários.',
    fullContent: `A Reserva Extrativista Marinha Caeté-Taperaçu abriga um dos mais ricos e preservados manguezais do planeta. No entanto, historicamente, os homens e mulheres que extraem o caranguejo-uçá e praticam a pesca artesanal de marés sofriam com a pressão dos atravessadores, que compravam a produção a preços irrisórios na beira da maré.

Para quebrar essa dependência econômica predatória, nasceu o Paneiro do Mangal: uma iniciativa de logística solidária com embarcação frigorificada comunitária, embalagens ecológicas rastreáveis e canais diretos de distribuição para redes de consumo consciente e feiras agroecológicas em centros consumidores.

Com a eliminação dos intermediários, a remuneração paga às marisqueiras e pescadores teve um acréscimo médio de 140%. Mais do que ganhos financeiros imediatos, o programa estabeleceu acordos voluntários de pesca com períodos de defeso ampliados, comprovando que segurança econômica e conservação da biodiversidade caminham necessariamente juntas.`,
    image: blogImg3,
  },
  {
    id: '4',
    category: 'Educação Comunitária',
    date: '15 de Outubro, 2026',
    readTime: '3 min de leitura',
    author: 'Equipe Pedagógica Chaú',
    title: 'Abertura do acervo infantil na Biblioteca Comunitária do Chaú',
    excerpt:
      'Mais de 400 novos livros doados chegaram à comunidade ribeirinha, fortalecendo as oficinas de leitura e reforço escolar no contraturno das aulas.',
    fullContent: `Erguida sobre palafitas às margens do igarapé e construída em regime de mutirão com madeira certificada de manejo sustentável, a Biblioteca Comunitária do Chaú acaba de inaugurar seu espaço ampliado de leitura infanto-juvenil.

A chegada de mais de 400 novos títulos — incluindo literatura de lendas amazônicas, enciclopédias ilustradas da fauna e flora e livros pedagógicos de alfabetização — foi celebrada com contação de histórias pelos mais velhos da aldeia e apresentações de carimbó mirim.

O espaço atende atualmente mais de 150 crianças e jovens em contraturno escolar, oferecendo acompanhamento com educadores voluntários para erradicação da defasagem escolar. "Quando uma criança ribeirinha segura um livro e se enxerga nas histórias, ela descobre que o mundo é grande e que seu território é fonte de orgulho e futuro", celebra a pedagoga Tereza Baía.`,
    image: blogImg4,
  },
];

export function BlogScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const categories = ['Todos', 'Histórias do Território', 'Economia Circular', 'Sustentabilidade', 'Educação Comunitária'];

  const activeArticle = postsList.find((p) => p.id === activeArticleId);

  // Single Article Page View
  if (activeArticle) {
    const relatedPosts = postsList.filter((p) => p.id !== activeArticle.id).slice(0, 2);

    return (
      <View style={styles.articleContainer}>
        {/* Top Back Navigation Bar */}
        <View style={[styles.articleTopNav, { paddingHorizontal: horizontalPadding }]}>
          <TouchableOpacity
            onPress={() => setActiveArticleId(null)}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Voltar ao Blog"
          >
            <Text style={styles.backButtonArrow}>←</Text>
            <Text style={styles.backButtonText}>Todos os Artigos</Text>
          </TouchableOpacity>

          <View style={styles.articleBadgeTop}>
            <Text style={styles.articleBadgeTopText}>{activeArticle.category}</Text>
          </View>
        </View>

        {/* Article Header */}
        <View style={[styles.articleHeader, { paddingHorizontal: horizontalPadding }]}>
          <Text style={styles.articleMetaDate}>
            {activeArticle.date} • {activeArticle.readTime} • {activeArticle.author || 'Equipe INÃ'}
          </Text>
          <Text style={styles.articleTitle}>{activeArticle.title}</Text>
          <Text style={styles.articleLead}>{activeArticle.excerpt}</Text>
        </View>

        {/* Hero Image */}
        <View style={[styles.articleImageWrapper, { paddingHorizontal: horizontalPadding }]}>
          <Image source={activeArticle.image} style={styles.articleHeroImage} resizeMode="cover" />
        </View>

        {/* Article Body Content */}
        <View style={[styles.articleBody, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.articleContentColumn}>
            {activeArticle.fullContent?.split('\n\n').map((paragraph, idx) => (
              <Text key={idx} style={styles.articleParagraph}>
                {paragraph}
              </Text>
            ))}

            {/* Back Button and Share Row */}
            <View style={styles.articleFooterNav}>
              <TouchableOpacity
                onPress={() => setActiveArticleId(null)}
                style={styles.articleReturnBtn}
                accessibilityRole="button"
              >
                <Text style={styles.articleReturnBtnText}>← Voltar para o Blog</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Related Posts Section */}
        <View style={[styles.relatedSection, { paddingHorizontal: horizontalPadding }]}>
          <Text style={styles.relatedSectionTitle}>Mais publicações recentes</Text>
          <View style={[styles.postsGrid, !isDesktop && styles.postsGridMobile]}>
            {relatedPosts.map((post) => (
              <TouchableOpacity
                key={post.id}
                activeOpacity={0.9}
                onPress={() => setActiveArticleId(post.id)}
                style={styles.postCard}
              >
                <View style={styles.postCardImageContainer}>
                  <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                  <View style={styles.postBadge}>
                    <Text style={styles.badgeText}>{post.category}</Text>
                  </View>
                </View>
                <View style={styles.postCardContent}>
                  <Text style={styles.postDate}>{post.date} • {post.readTime}</Text>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                  <View style={styles.postLink}>
                    <Text style={styles.readMoreText}>Ler mais</Text>
                    <ArrowRight size={14} color={colors.primary} strokeWidth={1.5} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

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
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => setActiveArticleId(featured.id)}
            style={[styles.featuredCard, !isDesktop && styles.featuredCardMobile]}
            accessibilityRole="button"
            accessibilityLabel={`Ler artigo ${featured.title}`}
          >
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

              <View style={styles.readMoreLink}>
                <Text style={styles.readMoreText}>Ler artigo completo</Text>
                <ArrowRight size={16} color={colors.primary} strokeWidth={1.5} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Regular Posts Grid */}
      <View style={[styles.postsGridContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.postsGrid, !isDesktop && styles.postsGridMobile]}>
          {regularPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              activeOpacity={0.92}
              onPress={() => setActiveArticleId(post.id)}
              style={styles.postCard}
              accessibilityRole="button"
              accessibilityLabel={`Ler artigo ${post.title}`}
            >
              <View style={styles.postCardImageContainer}>
                <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                <View style={styles.postBadge}><Text style={styles.badgeText}>{post.category}</Text></View>
              </View>

              <View style={styles.postCardContent}>
                <Text style={styles.postDate}>{post.date} • {post.readTime}</Text>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postExcerpt}>{post.excerpt}</Text>

                <View style={styles.postLink}>
                  <Text style={styles.readMoreText}>Ler mais</Text>
                  <ArrowRight size={14} color={colors.primary} strokeWidth={1.5} />
                </View>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#164b35',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 9.5,
    textTransform: 'uppercase',
    color: '#ffffff',
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
    backgroundColor: '#164b35',
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

  // Single Article Specific Styles
  articleContainer: {
    width: '100%',
    backgroundColor: colors.background,
    paddingBottom: 100,
  },
  articleTopNav: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 36,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  backButtonArrow: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
  backButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
  },
  articleBadgeTop: {
    backgroundColor: '#164b35',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
  },
  articleBadgeTopText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  articleHeader: {
    maxWidth: 960,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 24,
  },
  articleMetaDate: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 16,
  },
  articleTitle: {
    fontFamily: fonts.serif,
    fontSize: 44,
    lineHeight: 48,
    color: colors.primary,
    letterSpacing: -1.2,
    marginBottom: 20,
  },
  articleLead: {
    fontFamily: fonts.sans,
    fontSize: 18,
    lineHeight: 28,
    color: '#344c3f',
  },
  articleImageWrapper: {
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    marginVertical: 32,
  },
  articleHeroImage: {
    width: '100%',
    height: 480,
    borderRadius: 24,
  },
  articleBody: {
    maxWidth: 960,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 60,
  },
  articleContentColumn: {
    width: '100%',
  },
  articleParagraph: {
    fontFamily: fonts.sans,
    fontSize: 17,
    lineHeight: 30,
    color: '#2d3d34',
    marginBottom: 24,
  },
  articleFooterNav: {
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(20, 61, 43, 0.12)',
    marginTop: 20,
  },
  articleReturnBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: colors.primary,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  articleReturnBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
  },
  relatedSection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(20, 61, 43, 0.1)',
  },
  relatedSectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 32,
    color: colors.primary,
    marginBottom: 28,
  },
});
