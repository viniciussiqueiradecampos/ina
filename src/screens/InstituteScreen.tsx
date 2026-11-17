import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from '../components/icons/ArrowRight';
import {
  EscutaAtivaIcon,
  SoberaniaIcon,
  JusticaSocioambientalIcon,
} from '../components/icons/PillarIcons';
import { AmazonTexture } from '../components/AmazonTexture';

const heroBg = require('../../assets/galeria/motorboat-lake-surrounded-by-beautiful-green-trees-cloudy-sky.jpg');
const textureAboutSplit = require('../../assets/texture-about-split.png');
const textureOrganicFill = require('../../assets/texture-cta-lines.png');
const fotoQuemSomosDestaque = require('../../assets/quem-somos-destaque.png');
const p1 = require('../../assets/project-1.png');
const p2 = require('../../assets/project-2.png');
const p3 = require('../../assets/project-3.png');
const p4 = require('../../assets/project-4.png');

// Fotos reais Fundadores & Voluntários
const fotoPatriciaReis = require('../../assets/Quem somos/Patricia Reis.webp');
const fotoAnaRaquel = require('../../assets/Quem somos/Ana Raquel Leite.webp');
const fotoIsabelCristina = require('../../assets/Quem somos/Isabel Cristina.webp');
const fotoRuiMauricio = require('../../assets/Quem somos/Rui Maurício.webp');
const fotoMariaReis = require('../../assets/Quem somos/Maria Reis.webp');
const fotoTarcisioReis = require('../../assets/Quem somos/Tarcísio Reis.webp');
const fotoGessicaSousa = require('../../assets/Quem somos/Gessica Sousa.webp');
const fotoLuisEustorgio = require('../../assets/Quem somos/Luís Eustórgio.webp');
const fotoTatianaReis = require('../../assets/Quem somos/Tatiana Reis.webp');
const fotoWilhamesRodrigues = require('../../assets/Quem somos/Wilhames Rodrigues.webp');

const timelineItems = [
  { year: '2017', text: 'Fundação do INÃ — primeiros passos de mobilização territorial e articulação com lideranças comunitárias e pesquisadores na região do Caeté.', image: p1 },
  { year: '2018', text: 'Formalização e primeiros projetos estruturados de apoio técnico socioambiental.', image: p1 },
  { year: '2019', text: 'Parceria com comunidades ribeirinhas do Baixo Amazonas, ampliando o alcance territorial.', image: p2 },
  { year: '2020', text: 'Lançamento do programa de piscicultura comunitária com rações artesanais de insumos nativos.', image: p3 },
  { year: '2021', text: 'Cooperativa Coomarca de catadores formada e ativada, transformando óleo usado em renda digna.', image: p4 },
  { year: '2022', text: 'Biblioteca do Chaú inaugurada em mutirão comunitário sobre palafitas com madeira certificada.', image: p1 },
  { year: '2023', text: 'Programa Paneiro do Mangal: logística extrativista direta eliminando atravessadores na cadeia.', image: p2 },
  { year: '2024', text: '1.000 crianças atendidas, 12 comunidades parceiras e 500 famílias beneficiadas diretamente.', image: p3 },
  { year: '2025', text: 'Expansão para novos territórios com relatório de impacto auditado e transparência total.', image: p4 },
  { year: '2026', text: 'Hoje — continuidade e crescimento do impacto territorial com presença em toda a Amazônia Oriental.', image: p1 },
];

interface PersonCard {
  name: string;
  title: string;
  role: string;
  bio: string;
  image: any;
  tag: string;
}

const founders: PersonCard[] = [
  {
    name: 'Patrícia Reis',
    title: 'Fundadora',
    role: 'Fundadora do Instituto INÃ',
    bio: 'Dedicada ao fortalecimento socioambiental, governança comunitária e valorização da sabedoria ancestral da floresta.',
    image: fotoPatriciaReis,
    tag: 'Fundadora',
  },
  {
    name: 'Ana Raquel Leite',
    title: 'Fundadora',
    role: 'Fundadora do Instituto INÃ',
    bio: 'Idealizadora de iniciativas comunitárias que unem conservação, desenvolvimento sustentável e protagonismo no território.',
    image: fotoAnaRaquel,
    tag: 'Fundadora',
  },
];

const volunteersList: PersonCard[] = [
  {
    name: 'Isabel Cristina',
    title: 'Voluntária',
    role: 'Voluntária do Instituto INÃ',
    bio: 'Soma dedicação técnica e presença direta nas ações de impacto socioambiental.',
    image: fotoIsabelCristina,
    tag: 'Voluntária',
  },
  {
    name: 'Rui Maurício',
    title: 'Voluntário',
    role: 'Voluntário do Instituto INÃ',
    bio: 'Apoia iniciativas de campo e articulação comunitária no território.',
    image: fotoRuiMauricio,
    tag: 'Voluntário',
  },
  {
    name: 'Maria Reis',
    title: 'Voluntária',
    role: 'Voluntária do Instituto INÃ',
    bio: 'Engajada nas frentes de apoio comunitário e soberania alimentar.',
    image: fotoMariaReis,
    tag: 'Voluntária',
  },
  {
    name: 'Tarcísio Reis',
    title: 'Voluntário',
    role: 'Voluntário do Instituto INÃ',
    bio: 'Participa ativamente das ações de sustentabilidade e fortalecimento local.',
    image: fotoTarcisioReis,
    tag: 'Voluntário',
  },
  {
    name: 'Gessica Sousa',
    title: 'Voluntária',
    role: 'Voluntária do Instituto INÃ',
    bio: 'Contribui com formação, educação comunitária e mobilização no território.',
    image: fotoGessicaSousa,
    tag: 'Voluntária',
  },
  {
    name: 'Luís Eustórgio',
    title: 'Voluntário',
    role: 'Voluntário do Instituto INÃ',
    bio: 'Apoia projetos socioambientais e infraestrutura comunitária sustentável.',
    image: fotoLuisEustorgio,
    tag: 'Voluntário',
  },
  {
    name: 'Tatiana Reis',
    title: 'Voluntária',
    role: 'Voluntária do Instituto INÃ',
    bio: 'Dedica-se a projetos de apoio coletivo, cultura e preservação ambiental.',
    image: fotoTatianaReis,
    tag: 'Voluntária',
  },
  {
    name: 'Wilhames Rodrigues',
    title: 'Voluntário',
    role: 'Voluntário do Instituto INÃ',
    bio: 'Atua nas frentes de campo, logística socioambiental e engajamento comunitário.',
    image: fotoWilhamesRodrigues,
    tag: 'Voluntário',
  },
];

export function InstituteScreen({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;
  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  const volunteerScrollRef = useRef<any>(null);
  const [volunteerIndex, setVolunteerIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Track which timeline items are visible - initialize all as visible so they never appear blank/apagadas
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true
  });
  const itemRefs = useRef<(any | null)[]>([]);

  const scrollVolunteers = (direction: 'left' | 'right') => {
    const cardWidth = 270;
    const maxIndex = volunteersList.length - 1;
    const newIndex = direction === 'left' ? Math.max(0, volunteerIndex - 1) : Math.min(maxIndex, volunteerIndex + 1);
    setVolunteerIndex(newIndex);
    if (volunteerScrollRef.current) {
      volunteerScrollRef.current.scrollTo({ x: newIndex * cardWidth, animated: true });
    }
  };

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    // Set initial visible items based on scroll
    const checkScroll = () => {
      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const domNode = (el as any)._nativeTag || (el as any).node || (el as any);
        if (domNode && domNode.getBoundingClientRect) {
          const rect = domNode.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.85) {
            setVisibleItems((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
          }
        }
      });
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    // Run once on mount and after short delay
    checkScroll();
    const t = setTimeout(checkScroll, 500);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Hero Banner com margem nas laterais e cantos arredondados */}
      <View style={[styles.heroBannerWrapper, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.heroBannerRounded}>
          <ImageBackground
            source={heroBg}
            style={styles.heroBg}
            imageStyle={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(4, 29, 19, 0.90)', 'rgba(4, 29, 19, 0.45)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroKicker}>Quem Somos</Text>
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
      </View>

      {/* Descritivo de Quem Somos dividido em 2 colunas com imagem ampliada alinhada à direita */}
      <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
        <View
          style={[
            styles.identityRow,
            !isDesktop && styles.identityRowMobile,
            isDesktop && { marginRight: -horizontalPadding },
          ]}
        >
          {/* Coluna 1: Textos */}
          <View style={[styles.identityTextCol, !isDesktop && styles.fullWidth]}>
            <Text style={styles.sectionMainTitle}>
              Defendemos as populações tradicionais e o desenvolvimento sustentável a partir de quem vive na Amazônia
            </Text>
            <Text style={styles.descritivoParagraph}>
              Nossa missão é promover os direitos das populações tradicionais e em situação de exclusão social,
              baseando-se nos princípios do desenvolvimento socioambiental de forma transparente e ética.
              Priorizamos o desenvolvimento sustentável, econômico e igualitário de comunidades tradicionais e em situação de risco.
            </Text>
            <Text style={styles.descritivoParagraph}>
              Construímos pontes para uma nova Amazônia pensada por quem nela vive. Através da valorização do trabalho e da autonomia das mulheres,
              articulamos cadeias da sociobiodiversidade, manejo agroecológico, inclusão comunitária e defesa profunda do território com governança própria.
            </Text>
          </View>

          {/* Coluna 2: Foto institucional sem margem à direita e ampliada */}
          <View style={[styles.identityMediaCol, !isDesktop && styles.fullWidth]}>
            <Image
              source={fotoQuemSomosDestaque}
              style={[
                styles.identityDestaqueImage,
                {
                  maxHeight: isDesktop ? 640 : isTablet ? 480 : 320,
                  maxWidth: isDesktop ? 760 : '100%',
                },
              ]}
              resizeMode="contain"
              accessibilityRole="image"
              accessibilityLabel="Equipe e fundadoras do Instituto Nova Amazônia em ação"
            />
          </View>
        </View>

        {/* Seção Missão, Visão e Valores */}
        <View style={styles.mvvSection}>
          <View style={styles.subSectionHeader}>
            <Text style={styles.sectionKicker}>Princípios Institucionais</Text>
            <Text style={styles.sectionTitle}>Missão, Visão e Valores</Text>
          </View>

          <View style={[styles.mvvGrid, !isDesktop && styles.mvvGridMobile]}>
            {/* MISSÃO */}
            <View
              style={[styles.mvvCard, { backgroundColor: '#164b35' }]}
              accessible={true}
              accessibilityLabel="Missão: Promover direitos e desenvolvimento ético. Promover os direitos das populações tradicionais e em situação de exclusão social, baseando-se nos princípios do desenvolvimento socioambiental de forma transparente e ética. Priorizamos o desenvolvimento sustentável, econômico e igualitário de comunidades tradicionais e em situação de risco."
            >
              <View style={styles.mvvIconWrap} accessible={false} importantForAccessibility="no">
                <EscutaAtivaIcon size={72} color="rgba(255,255,255,0.22)" />
              </View>
              <Text style={styles.mvvTitleWhite}>Promover direitos e desenvolvimento ético</Text>
              <Text style={styles.mvvDescWhite}>
                Promover os direitos das populações tradicionais e em situação de exclusão social, baseando-se nos princípios do desenvolvimento socioambiental de forma transparente e ética. Priorizamos o desenvolvimento sustentável, econômico e igualitário de comunidades tradicionais e em situação de risco.
              </Text>
            </View>

            {/* VISÃO */}
            <View
              style={[styles.mvvCard, { backgroundColor: '#8D9F6F' }]}
              accessible={true}
              accessibilityLabel="Visão: Construir uma nova Amazônia viva. Construir uma nova Amazônia pensada a partir de quem vive no território e conhece de perto o modelo de desenvolvimento sustentável necessário."
            >
              <View style={styles.mvvIconWrap} accessible={false} importantForAccessibility="no">
                <SoberaniaIcon size={72} color="rgba(8,40,28,0.22)" />
              </View>
              <Text style={styles.mvvTitleDark}>Construir uma nova Amazônia viva</Text>
              <Text style={styles.mvvDescDark}>
                Construir uma nova Amazônia pensada a partir de quem vive no território e conhece de perto o modelo de desenvolvimento sustentável necessário.
              </Text>
            </View>

            {/* VALORES */}
            <View
              style={[styles.mvvCard, { backgroundColor: '#526635' }]}
              accessible={true}
              accessibilityLabel="Valores: Transparência & Ética. Transparência e Ética como pilares absolutos de cada ação, prestação de contas, relação com parceiros e convivência fraterna nas comunidades."
            >
              <View style={styles.mvvIconWrap} accessible={false} importantForAccessibility="no">
                <JusticaSocioambientalIcon size={72} color="rgba(255,255,255,0.22)" />
              </View>
              <Text style={styles.mvvTitleWhite}>Transparência & Ética</Text>
              <Text style={styles.mvvDescWhite}>
                Transparência e Ética como pilares absolutos de cada ação, prestação de contas, relação com parceiros e convivência fraterna nas comunidades.
              </Text>
            </View>
          </View>
        </View>

        {/* Destaque Estratégico: Transformação Social e Ambiental */}
        <View style={styles.transformacaoBanner}>
          <View style={styles.transformacaoContent}>
            <Text style={styles.transformacaoKicker}>TRANSFORMAÇÃO SOCIAL & AMBIENTAL</Text>
            <Text style={styles.transformacaoTitle}>
              A valorização do trabalho e autonomia das mulheres e o fortalecimento de direitos de populações tradicionais.
            </Text>
            <Text style={styles.transformacaoLead}>
              Este é o coração de tudo o que realizamos: colocar a liderança feminina na vanguarda da geração de renda agroecológica, soberania alimentar e defesa intransigente da Amazônia pensada por quem nela vive.
            </Text>
          </View>
        </View>

        {/* Timeline 2017–2026 */}
        <View style={styles.timelineSection}>
          <View style={styles.subSectionHeader}>
            <Text style={styles.sectionKicker}>Nossa História</Text>
            <Text style={styles.sectionTitle}>De 2017 a 2026</Text>
          </View>
          <View style={styles.timelineList}>
            {timelineItems.map((item, idx) => {
              const isVisible = Platform.OS !== 'web' || visibleItems[idx];
              return (
                <View
                  key={item.year}
                  ref={(el) => { (itemRefs.current as any[])[idx] = el; }}
                  {...(Platform.OS === 'web' ? { 'data-idx': String(idx) } : {})}
                  style={[
                    styles.timelineItem,
                    (Platform.OS === 'web' && ({
                      opacity: 1,
                      transform: [{ translateY: isVisible ? 0 : 10 }],
                      transition: 'transform 0.4s ease',
                    } as any)),
                  ]}
                >
                  {/* Line */}
                  <View style={styles.timelineLine}>
                    <View style={[styles.timelineDot, isVisible && styles.timelineDotActive]} />
                    {idx < timelineItems.length - 1 && (
                      <View style={[styles.timelineConnector, isVisible && styles.timelineConnectorActive]} />
                    )}
                  </View>
                  {/* Content */}
                  <View style={[styles.timelineContent, isDesktop && { flexDirection: 'row', gap: 24 }]}>
                    <View style={styles.timelineTextBlock}>
                      <Text style={styles.timelineYear}>{item.year}</Text>
                      <Text style={styles.timelineText}>{item.text}</Text>
                    </View>
                    <Image source={item.image} style={styles.timelineImage} resizeMode="cover" />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 2 Fotos das Fundadoras - Sem Rolagem */}
        <View style={styles.foundersSection}>
          <View style={styles.subSectionHeader}>
            <Text style={styles.sectionKicker}>Liderança & Origem</Text>
            <Text style={styles.sectionTitle}>Fundadoras do Instituto INÃ</Text>
            <Text style={styles.subSectionText}>
              A visão e o compromisso de quem deu os primeiros passos nesta trajetória coletiva.
            </Text>
          </View>

          <View style={[styles.foundersGrid, !isDesktop && styles.foundersGridMobile]}>
            {founders.map((founder) => (
              <View key={founder.name} style={[styles.personCardRef, styles.founderCard]}>
                <Image source={founder.image} style={styles.personPhotoCover} resizeMode="cover" />
                <LinearGradient
                  colors={['transparent', 'rgba(4, 29, 19, 0.4)', 'rgba(4, 29, 19, 0.95)']}
                  locations={[0.3, 0.65, 1]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.personTextOverlayRef}>
                  <Text style={styles.personNameOverlayRef}>{founder.name}</Text>
                  <Text style={styles.personRoleOverlayRef}>{founder.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 8 Fotos com Título de Voluntários */}
        <View style={styles.volunteersSection}>
          <View style={styles.volunteersHeaderRow}>
            <View style={styles.subSectionHeader}>
              <Text style={styles.sectionKicker}>Força Coletiva</Text>
              <Text style={styles.sectionTitle}>Nossos Voluntários</Text>
              <Text style={styles.subSectionText}>
                Profissionais e especialistas voluntários que somam tempo, técnica e coração no território.
              </Text>
            </View>

            {/* Navigation Arrows for volunteers scroll */}
            <View style={styles.volunteersControls}>
              <TouchableOpacity
                onPress={() => scrollVolunteers('left')}
                style={styles.navArrowBtn}
                accessibilityRole="button"
                accessibilityLabel="Voluntários anteriores"
              >
                <Text style={styles.navArrowText}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => scrollVolunteers('right')}
                style={styles.navArrowBtn}
                accessibilityRole="button"
                accessibilityLabel="Próximos voluntários"
              >
                <Text style={styles.navArrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            ref={volunteerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.volunteersCarousel}
            style={styles.volunteersScrollView}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const idx = Math.round(x / 270);
              if (idx !== volunteerIndex) setVolunteerIndex(idx);
            }}
            scrollEventThrottle={16}
          >
            {volunteersList.map((vol) => (
              <View key={vol.name} style={styles.personCardRef}>
                <Image source={vol.image} style={styles.personPhotoCover} resizeMode="cover" />
                <LinearGradient
                  colors={['transparent', 'rgba(4, 29, 19, 0.4)', 'rgba(4, 29, 19, 0.95)']}
                  locations={[0.3, 0.65, 1]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.personTextOverlayRef}>
                  <Text style={styles.personNameOverlayRef}>{vol.name}</Text>
                  <Text style={styles.personRoleOverlayRef}>{vol.role}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.carouselIndicators}>
            {volunteersList.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setVolunteerIndex(i);
                  volunteerScrollRef.current?.scrollTo({ x: i * 270, animated: true });
                }}
                style={[
                  styles.carouselDot,
                  volunteerIndex === i ? styles.carouselDotActive : styles.carouselDotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Princípios que guiam nossa atuação */}
        <View style={styles.pillarsSection}>
          <View style={styles.subSectionHeader}>
            <Text style={styles.sectionKicker}>Pilares Éticos</Text>
            <Text style={styles.sectionTitle}>Como colocamos nossos valores em prática</Text>
          </View>

          <View style={[styles.pillarsGrid, !isDesktop && styles.pillarsGridMobile]}>
            <View style={[styles.pillarCard, { backgroundColor: '#164b35' }]}>
              <View style={styles.pillarHeaderRow}>
                <EscutaAtivaIcon size={52} color={colors.accent} />
              </View>
              <View>
                <Text style={styles.pillarTitleWhite}>Escuta Ativa</Text>
                <Text style={styles.pillarDescWhite}>
                  Toda ação nasce da convivência no território e das prioridades definidas pelas próprias famílias.
                </Text>
              </View>
            </View>

            <View style={[styles.pillarCard, { backgroundColor: '#8D9F6F' }]}>
              <View style={styles.pillarHeaderRow}>
                <SoberaniaIcon size={52} color="#08281c" />
              </View>
              <View>
                <Text style={styles.pillarTitleDark}>Soberania Econômica</Text>
                <Text style={styles.pillarDescDark}>
                  Estruturamos cadeias produtivas justas com agregação de valor local e independência comercial.
                </Text>
              </View>
            </View>

            <View style={[styles.pillarCard, { backgroundColor: '#526635' }]}>
              <View style={styles.pillarHeaderRow}>
                <JusticaSocioambientalIcon size={52} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.pillarTitleWhite}>Justiça Socioambiental</Text>
                <Text style={styles.pillarDescWhite}>
                  Cuidar da floresta é, antes de tudo, garantir água limpa, saúde e futuro para quem vive nela.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* CTA Section com textura de largura total por trás, subindo até metade do box e encostada na próxima seção (rodapé) */}
      <View style={styles.ctaWrapper}>
        <Image
          source={textureOrganicFill}
          style={styles.ctaWrapperBgTexture}
          resizeMode="cover"
        />

        <View style={[styles.ctaBoxContainer, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.ctaBox}>
            <View style={styles.ctaBoxContent}>
              <Text style={styles.ctaBoxTitle}>Quer conhecer nossos projetos no território?</Text>
              <Text style={styles.ctaBoxSubtitle}>
                Veja como cada iniciativa transforma comunidades de forma direta, mensurável e participativa.
              </Text>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => onNavigate('Projetos')}
                style={styles.ctaBoxBtn}
                accessibilityRole="button"
                accessibilityLabel="Explorar projetos"
              >
                <Text style={styles.ctaBoxBtnText}>Explorar Projetos</Text>
                <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Modal Interativo do Player de Vídeo */}
      <Modal
        visible={videoModalOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setVideoModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.videoModalContent, { maxWidth: isDesktop ? 860 : '95%' }]}>
            <View style={styles.videoModalHeader}>
              <View>
                <Text style={styles.videoModalKicker}>Vídeo Institucional</Text>
                <Text style={styles.videoModalTitle}>Conheça o INÃ em Ação</Text>
              </View>
              <TouchableOpacity
                onPress={() => setVideoModalOpen(false)}
                style={styles.videoModalCloseBtn}
                accessibilityRole="button"
                accessibilityLabel="Fechar vídeo"
              >
                <Text style={styles.videoModalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.videoModalPlayerBox}>
              <Image
                source={require('../../assets/galeria/dsc_4755-2048x1362-1.webp')}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(4, 29, 19, 0.3)', 'rgba(4, 29, 19, 0.85)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.videoModalNoticeBox}>
                <View style={styles.videoModalPlayBadge}>
                  <View style={styles.playIconTriangle} />
                </View>
                <Text style={styles.videoModalNoticeTitle}>
                  Documentário Institucional INÃ
                </Text>
                <Text style={styles.videoModalNoticeDesc}>
                  Produção audiovisual registrando os impactos nas comunidades ribeirinhas do Rio Caeté, Reserva Marinha de Taperaçu e cooperativas de Bragança.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    paddingBottom: 0,
  },
  heroBannerWrapper: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  heroBannerRounded: {
    width: '100%',
    maxWidth: 1382.4,
    borderRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
    }),
  },
  heroBg: {
    width: '100%',
    overflow: 'hidden',
    minHeight: 440,
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 48,
  },
  heroContent: {
    maxWidth: 820,
    zIndex: 2,
    paddingVertical: 0,
  },
  heroKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 48,
    lineHeight: 52,
    color: colors.white,
    letterSpacing: -1.2,
    marginBottom: 16,
  },
  heroLead: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: 'rgba(255, 255, 255, 0.88)',
  },
  section: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 60,
  },
  identityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 60,
    marginBottom: 80,
    paddingVertical: 40,
  },
  identityRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  fullWidth: {
    maxWidth: '100%',
  },
  identityTextCol: {
    flex: 1,
    maxWidth: 580,
  },
  identityMediaCol: {
    flex: 1,
    maxWidth: 680,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  identityDestaqueImage: {
    width: '100%',
    aspectRatio: 1.25,
    borderRadius: 24,
    ...Platform.select({
      web: {
        filter: 'drop-shadow(0 14px 32px rgba(0, 0, 0, 0.08))',
      },
    }),
  },
  textureWrapper: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  identityTextureImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '-6%',
    width: '112%',
    height: '100%',
    opacity: 0.9,
    zIndex: 1,
  },
  videoPlayerCard: {
    width: '100%',
    maxWidth: 560,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.28)',
      },
    }),
  },
  videoThumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -34,
    marginLeft: -34,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.45)',
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease',
      },
    }),
  },
  playIconTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.accentDarkText,
    marginLeft: 4,
  },
  videoInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 22,
    paddingVertical: 18,
    zIndex: 5,
  },
  videoTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
    marginBottom: 2,
  },
  videoDuration: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(4, 29, 19, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 9999,
  },
  videoModalContent: {
    width: '100%',
    backgroundColor: '#0c2e20',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201, 243, 107, 0.25)',
    ...Platform.select({
      web: {
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
      },
    }),
  },
  videoModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  videoModalKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  videoModalTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.white,
    marginTop: 2,
  },
  videoModalCloseBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  videoModalCloseText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  videoModalPlayerBox: {
    width: '100%',
    height: 440,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoModalNoticeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 5,
    maxWidth: 580,
  },
  videoModalPlayBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
      },
    }),
  },
  videoModalNoticeTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  videoModalNoticeDesc: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  descritivoBox: {
    paddingVertical: 40,
    marginBottom: 60,
  },
  sectionKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 10,
  },
  sectionMainTitle: {
    fontFamily: fonts.serif,
    fontSize: 36,
    lineHeight: 42,
    color: colors.primary,
    letterSpacing: -0.8,
    marginBottom: 20,
  },
  descritivoParagraph: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 28,
    color: '#344c3f',
    marginBottom: 16,
  },
  subSectionHeader: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 38,
    color: colors.primary,
    marginBottom: 8,
  },
  subSectionText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.subtleText,
    maxWidth: 680,
  },
  foundersSection: {
    marginBottom: 70,
  },
  foundersGrid: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  foundersGridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  founderCard: {
    width: 280,
    height: 380,
  },
  volunteersSection: {
    marginBottom: 70,
  },
  volunteersHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 16,
  },
  volunteersControls: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingTop: 8,
  },
  navArrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1b3b2c',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(201, 243, 107, 0.25)',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  navArrowText: {
    color: colors.white,
    fontSize: 26,
    lineHeight: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  volunteersScrollView: {
    overflow: 'visible',
  },
  volunteersCarousel: {
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 16,
  },
  personCardRef: {
    width: 250,
    height: 360,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1b3b2c',
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
    }),
  },
  personPhotoCover: {
    width: '100%',
    height: '100%',
  },
  personTextOverlayRef: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 2,
  },
  personNameOverlayRef: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    lineHeight: 22,
    color: colors.white,
    marginBottom: 4,
  },
  personRoleOverlayRef: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  carouselDot: {
    height: 6,
    borderRadius: 3,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  carouselDotActive: {
    width: 28,
    backgroundColor: colors.accent,
  },
  carouselDotInactive: {
    width: 10,
    backgroundColor: 'rgba(20, 61, 43, 0.25)',
  },
  carouselPillActive: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3b82f6',
  },
  carouselPillInactive: {
    width: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(20, 61, 43, 0.15)',
  },
  timelineConnectorActive: {
    backgroundColor: colors.primary,
  },
  pillarHeaderRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  pillarsSection: {
    marginBottom: 60,
  },
  pillarsGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  pillarsGridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  pillarCard: {
    flex: 1,
    borderRadius: 20,
    padding: 30,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  pillarNumber: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accent,
    marginBottom: 8,
  },
  pillarTitleWhite: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    color: colors.white,
    marginBottom: 8,
  },
  pillarDescWhite: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  pillarTitleDark: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    color: colors.accentDarkText,
    marginBottom: 8,
  },
  pillarDescDark: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.accentDarkText,
  },
  pillarTitleOrange: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    color: '#ffffff',
    marginBottom: 8,
  },
  pillarDescOrange: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  mvvSection: {
    marginBottom: 70,
  },
  mvvGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  mvvGridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  mvvCard: {
    flex: 1,
    borderRadius: 20,
    padding: 30,
    minHeight: 260,
    justifyContent: 'flex-start',
    gap: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  mvvIconWrap: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    opacity: 1,
  },
  mvvTagPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  mvvTagText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.4,
    color: colors.white,
    fontWeight: '700',
  },
  mvvTitleWhite: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.white,
  },
  mvvDescWhite: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.88)',
  },
  mvvTitleDark: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.accentDarkText,
  },
  mvvDescDark: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.accentDarkText,
  },
  mvvTitleOrange: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.white,
  },
  mvvDescOrange: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  transformacaoBanner: {
    backgroundColor: '#0a271c',
    borderRadius: 24,
    padding: 40,
    marginBottom: 70,
    borderWidth: 1,
    borderColor: 'rgba(201, 243, 107, 0.25)',
  },
  transformacaoContent: {
    gap: 12,
  },
  transformacaoKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.8,
    color: colors.accent,
    fontWeight: '700',
  },
  transformacaoTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 36,
    color: colors.white,
  },
  transformacaoLead: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  ctaWrapper: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    overflow: 'visible',
    paddingTop: 70,
    paddingBottom: 50,
  },
  ctaWrapperBgTexture: {
    position: 'absolute',
    bottom: -170,
    left: 0,
    right: 0,
    width: '100%',
    height: 360,
    zIndex: 1,
  },
  ctaBoxContainer: {
    width: '100%',
    maxWidth: 1382.4,
    alignItems: 'center',
    zIndex: 2,
    paddingBottom: 80,
  },
  ctaBox: {
    width: '100%',
    backgroundColor: '#164b35',
    borderRadius: 24,
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.18)',
      },
    }),
  },
  ctaBoxContent: {
    width: '100%',
    padding: 44,
    alignItems: 'center',
    textAlign: 'center',
    gap: 16,
  },
  ctaBoxTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    lineHeight: 36,
    color: colors.white,
    textAlign: 'center',
  },
  ctaBoxSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.82)',
    textAlign: 'center',
    maxWidth: 620,
  },
  ctaBoxBtn: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 28,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  ctaBoxBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  timelineSection: {
    marginBottom: 70,
  },
  timelineList: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  timelineLine: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(20, 61, 43, 0.2)',
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: 4,
  },
  timelineDotActive: {
    backgroundColor: colors.primary,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(20, 61, 43, 0.15)',
    marginTop: 4,
    marginBottom: -32,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(20, 61, 43, 0.08)',
  },
  timelineTextBlock: {
    flex: 1,
  },
  timelineYear: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 6,
  },
  timelineText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: '#344c3f',
  },
  timelineImage: {
    width: 180,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#1b3b2c',
  },
});
