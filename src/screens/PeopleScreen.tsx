import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Modal,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowRight } from '../components/icons/ArrowRight';

const photoGaleria1 = require('../../assets/galeria/DSC_4735-1-1-scaled.webp');
const photoGaleria2 = require('../../assets/galeria/dsc_4765-1024x681-1.webp');
const photoGaleria3 = require('../../assets/galeria/dsc_4768-1-scaled-1.webp');
const photoGaleria4 = require('../../assets/galeria/DSC_4771-1536x1021-1.webp');
const photoGaleria5 = require('../../assets/galeria/DSC_4777-1-scaled (1).webp');
const photoGaleria6 = require('../../assets/galeria/biblioteca-1.webp');
const photoGaleria7 = require('../../assets/galeria/67842325_1067674706768570_5900494219490885632_o-1-1024x768-1.webp');
const photoGaleria8 = require('../../assets/galeria/IMG-20200127-WA0024.webp');
const photoGaleria9 = require('../../assets/galeria/79940395_1181805522022154_6924459176416509952_n.webp');

interface MasonryPhoto {
  id: string;
  image: any;
  height: number;
  caption?: string;
}

const allGalleryPhotos = [
  { id: 'm1', image: photoGaleria1, caption: 'Encontro comunitário e oficinas no território' },
  { id: 'm4', image: photoGaleria2, caption: 'Vivência prática e preservação das águas' },
  { id: 'm7', image: photoGaleria3, caption: 'Mutirão e apoio às famílias ribeirinhas' },
  { id: 'm2', image: photoGaleria4, caption: 'Capacitação técnica e escuta ativa de lideranças' },
  { id: 'm5', image: photoGaleria5, caption: 'Atividades comunitárias no manguezal e igarapés' },
  { id: 'm8', image: photoGaleria6, caption: 'Biblioteca do Chaú e incentivo à alfabetização viva' },
  { id: 'm3', image: photoGaleria7, caption: 'Trabalho coletivo e agricultura agroecológica' },
  { id: 'm6', image: photoGaleria8, caption: 'Apoio técnico nas frentes de conservação' },
  { id: 'm9', image: photoGaleria9, caption: 'Mobilização popular e juventude conectada à floresta' },
];

const col1Photos: MasonryPhoto[] = [
  { id: 'm1', image: photoGaleria1, height: 380, caption: 'Encontro comunitário e oficinas no território' },
  { id: 'm2', image: photoGaleria4, height: 300, caption: 'Capacitação técnica e escuta ativa de lideranças' },
  { id: 'm3', image: photoGaleria7, height: 340, caption: 'Trabalho coletivo e agricultura agroecológica' },
];

const col2Photos: MasonryPhoto[] = [
  { id: 'm4', image: photoGaleria2, height: 320, caption: 'Vivência prática e preservação das águas' },
  { id: 'm5', image: photoGaleria5, height: 400, caption: 'Atividades comunitárias no manguezal e igarapés' },
  { id: 'm6', image: photoGaleria8, height: 280, caption: 'Apoio técnico nas frentes de conservação' },
];

const col3Photos: MasonryPhoto[] = [
  { id: 'm7', image: photoGaleria3, height: 350, caption: 'Mutirão e apoio às famílias ribeirinhas' },
  { id: 'm8', image: photoGaleria6, height: 320, caption: 'Biblioteca do Chaú e incentivo à alfabetização viva' },
  { id: 'm9', image: photoGaleria9, height: 360, caption: 'Mobilização popular e juventude conectada à floresta' },
];

export function PeopleScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;
  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Volunteer form state
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volArea, setVolArea] = useState('Educação e Oficinas');
  const [volMessage, setVolMessage] = useState('');
  const [volSuccess, setVolSuccess] = useState(false);

  // Gallery Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (id: string) => {
    const idx = allGalleryPhotos.findIndex((p) => p.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : allGalleryPhotos.length - 1) : 0
    );
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev < allGalleryPhotos.length - 1 ? prev + 1 : 0) : 0
    );
  };

  // Keyboard navigation on web
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleVolunteerSubmit = () => {
    if (volName && volEmail) {
      setVolSuccess(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Banner with Larger Punchy Typography */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.pillLabel}>
          <Text style={styles.pillLabelText}>REDE DE VOLUNTARIADO</Text>
        </View>

        <Text style={styles.heroTitle}>
          A transformação da Amazônia precisa de braços, escuta e corações presentes.
        </Text>

        <Text style={styles.heroLead}>
          Não acreditamos em soluções de gabinete. Conectamos profissionais e pesquisadores
          às demandas reais de quem vive e protege a floresta todos os dias.
        </Text>

        {/* Big Key Statements Bento */}
        <View style={[styles.punchyCardsRow, !isDesktop && styles.punchyCardsRowMobile]}>
          <View style={[styles.punchyCard, { backgroundColor: '#164b35' }]}>
            <Text style={styles.punchyNum}>+120</Text>
            <Text style={styles.punchyTitleWhite}>Mãos e mentes unidas no território</Text>
            <Text style={styles.punchyDescWhite}>
              Apoiando agricultura familiar, piscicultura e educação nas comunidades ribeirinhas.
            </Text>
          </View>

          <View style={[styles.punchyCard, { backgroundColor: '#8D9F6F' }]}>
            <Text style={[styles.punchyNum, { color: '#08281c' }]}>100%</Text>
            <Text style={styles.punchyTitleDark}>Construção dialógica e respeito</Text>
            <Text style={styles.punchyDescDark}>
              Cada voluntário atua a partir do que a comunidade define como prioridade e necessidade.
            </Text>
          </View>

          <View style={[styles.punchyCard, { backgroundColor: '#526635' }]}>
            <Text style={[styles.punchyNum, { color: '#ffffff' }]}>Híbrido</Text>
            <Text style={styles.punchyTitleWhite}>No chão da floresta ou remoto</Text>
            <Text style={styles.punchyDescWhite}>
              Da assistência técnica à pedagogia, da comunicação ao apoio jurídico e financeiro.
            </Text>
          </View>
        </View>

        {/* Large Editorial Quote */}
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            “Ser voluntário no INÃ é ter a humildade de aprender com quem cuida da floresta há
            gerações e somar ferramentas para multiplicar a autonomia do território.”
          </Text>
          <Text style={styles.quoteAuthor}>— Princípio do Coletivo de Voluntários do INÃ</Text>
        </View>
      </View>

      {/* Photo Gallery - Masonry Style (ONLY PHOTOS) */}
      <View style={[styles.gallerySection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionKicker}>O Território em Imagens</Text>
          <Text style={styles.sectionTitle}>Vivências e Presença no Chão da Amazônia</Text>
          <Text style={styles.sectionSub}>
            Sem filtros: a rotina prática de quem se dedica a construir o futuro lado a lado com os povos da floresta.
          </Text>
        </View>

        {/* Masonry Columns Grid */}
        <View style={[styles.masonryContainer, !isDesktop && styles.masonryContainerMobile]}>
          {/* Column 1 */}
          <View style={styles.masonryCol}>
            {col1Photos.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.92}
                onPress={() => openLightbox(item.id)}
                style={[styles.masonryItem, { height: item.height }]}
                accessibilityRole="button"
                accessibilityLabel="Ampliar foto da galeria"
              >
                <Image source={item.image} style={styles.masonryPhoto} resizeMode="cover" />
                <View style={styles.photoZoomIndicator}>
                  <Text style={styles.photoZoomIcon}>🔍</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Column 2 */}
          <View style={styles.masonryCol}>
            {col2Photos.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.92}
                onPress={() => openLightbox(item.id)}
                style={[styles.masonryItem, { height: item.height }]}
                accessibilityRole="button"
                accessibilityLabel="Ampliar foto da galeria"
              >
                <Image source={item.image} style={styles.masonryPhoto} resizeMode="cover" />
                <View style={styles.photoZoomIndicator}>
                  <Text style={styles.photoZoomIcon}>🔍</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Column 3 (desktop) */}
          {isDesktop && (
            <View style={styles.masonryCol}>
              {col3Photos.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.92}
                  onPress={() => openLightbox(item.id)}
                  style={[styles.masonryItem, { height: item.height }]}
                  accessibilityRole="button"
                  accessibilityLabel="Ampliar foto da galeria"
                >
                  <Image source={item.image} style={styles.masonryPhoto} resizeMode="cover" />
                  <View style={styles.photoZoomIndicator}>
                    <Text style={styles.photoZoomIcon}>🔍</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Volunteer Registration Form */}
      <View style={[styles.volunteerSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.volunteerCard}>
          <View style={styles.volHeader}>
            <Text style={styles.volKicker}>Faça Parte</Text>
            <Text style={styles.volTitle}>Inscreva-se como Voluntário</Text>
            <Text style={styles.volSubtitle}>
              Doe suas habilidades presenciais ou remotas para apoiar oficinas, materiais
              didáticos, projetos técnicos ou comunicação.
            </Text>
          </View>

          {volSuccess ? (
            <View style={styles.successBox}>
              <Text style={styles.successEmoji}>🎉</Text>
              <Text style={styles.successTitle}>Inscrição enviada com sucesso!</Text>
              <Text style={styles.successDesc}>
                Obrigado, <Text style={styles.bold}>{volName}</Text>. Nossa equipe entrará em contato
                pelo e-mail informado para conversar sobre as próximas turmas e áreas de atuação.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVolSuccess(false);
                  setVolName('');
                  setVolEmail('');
                  setVolMessage('');
                }}
                style={styles.newVolBtn}
              >
                <Text style={styles.newVolBtnText}>Cadastrar outro voluntário</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formGrid}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Seu nome completo *</Text>
                <TextInput
                  placeholder="Nome e sobrenome"
                  placeholderTextColor="#8a9c92"
                  value={volName}
                  onChangeText={setVolName}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Seu e-mail de contato *</Text>
                <TextInput
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor="#8a9c92"
                  keyboardType="email-address"
                  value={volEmail}
                  onChangeText={setVolEmail}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Área de interesse e contribuição:</Text>
                <View style={styles.areaOptionsRow}>
                  {[
                    'Educação e Oficinas',
                    'Comunicação e Audiovisual',
                    'Agroecologia e Manejo',
                    'Apoio Jurídico e Gestão',
                  ].map((area) => (
                    <TouchableOpacity
                      key={area}
                      onPress={() => setVolArea(area)}
                      style={[styles.areaChip, volArea === area && styles.areaChipActive]}
                    >
                      <Text
                        style={[
                          styles.areaChipText,
                          volArea === area && styles.areaChipTextActive,
                        ]}
                      >
                        {area}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Conte um pouco sobre suas habilidades e disponibilidade:</Text>
                <TextInput
                  placeholder="Fale sobre suas experiências profissionais ou comunitárias e disponibilidade semanal..."
                  placeholderTextColor="#8a9c92"
                  multiline
                  numberOfLines={4}
                  value={volMessage}
                  onChangeText={setVolMessage}
                  style={[styles.input, styles.textArea]}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleVolunteerSubmit}
                style={styles.submitBtn}
                accessibilityRole="button"
                accessibilityLabel="Enviar inscrição de voluntário"
              >
                <Text style={styles.submitBtnText}>Quero ser voluntário</Text>
                <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Lightbox Popup Modal */}
      {lightboxIndex !== null && (
        <Modal
          visible={lightboxIndex !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setLightboxIndex(null)}
        >
          <View style={styles.lightboxBackdrop}>
            {/* Top Bar with Counter and Close Button */}
            <View style={styles.lightboxTopBar}>
              <View style={styles.lightboxCounterBadge}>
                <Text style={styles.lightboxCounterText}>
                  0{lightboxIndex + 1} / 0{allGalleryPhotos.length}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setLightboxIndex(null)}
                style={styles.lightboxCloseBtn}
                accessibilityRole="button"
                accessibilityLabel="Fechar visualização da foto"
              >
                <Text style={styles.lightboxCloseBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Main Image Display with Left/Right Navigation */}
            <View style={styles.lightboxImageRow}>
              {/* Prev Button (mouse click) */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handlePrevPhoto}
                style={styles.lightboxNavBtn}
                accessibilityRole="button"
                accessibilityLabel="Foto anterior"
              >
                <Text style={styles.lightboxNavArrow}>‹</Text>
              </TouchableOpacity>

              {/* Main Photo Container */}
              <View style={styles.lightboxMainPhotoBox}>
                <Image
                  source={allGalleryPhotos[lightboxIndex].image}
                  style={styles.lightboxMainPhoto}
                  resizeMode="contain"
                />
                <View style={styles.lightboxCaptionBox}>
                  <Text style={styles.lightboxCaptionText}>
                    {allGalleryPhotos[lightboxIndex].caption}
                  </Text>
                </View>
              </View>

              {/* Next Button (mouse click) */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleNextPhoto}
                style={styles.lightboxNavBtn}
                accessibilityRole="button"
                accessibilityLabel="Próxima foto"
              >
                <Text style={styles.lightboxNavArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    paddingVertical: 56,
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  pillLabel: {
    backgroundColor: 'rgba(20, 61, 43, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  pillLabelText: {
    fontFamily: fonts.sansBold,
    fontSize: 10.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 50,
    lineHeight: 54,
    color: colors.primary,
    letterSpacing: -1.4,
    maxWidth: 960,
    marginBottom: 18,
  },
  heroLead: {
    fontFamily: fonts.sans,
    fontSize: 18,
    lineHeight: 28,
    color: colors.subtleText,
    maxWidth: 780,
    marginBottom: 40,
  },
  punchyCardsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 36,
  },
  punchyCardsRowMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  punchyCard: {
    flex: 1,
    borderRadius: 20,
    padding: 30,
    minHeight: 180,
    justifyContent: 'space-between',
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(0,0,0,0.06)' },
    }),
  },
  punchyNum: {
    fontFamily: fonts.sansBold,
    fontSize: 32,
    letterSpacing: -0.5,
    color: colors.accent,
    marginBottom: 12,
  },
  punchyTitleWhite: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.white,
    marginBottom: 8,
  },
  punchyDescWhite: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.88)',
  },
  punchyTitleDark: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: colors.accentDarkText,
    marginBottom: 8,
  },
  punchyDescDark: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.accentDarkText,
  },
  punchyTitleOrange: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    color: '#ffffff',
    marginBottom: 8,
  },
  punchyDescOrange: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  quoteBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 32,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    marginBottom: 20,
  },
  quoteText: {
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: 20,
    lineHeight: 30,
    color: colors.primary,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.subtleText,
  },
  gallerySection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: 70,
  },
  sectionHeading: {
    marginBottom: 36,
  },
  sectionKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 36,
    lineHeight: 40,
    color: colors.primary,
    marginBottom: 10,
  },
  sectionSub: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.subtleText,
    maxWidth: 720,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  masonryContainerMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  masonryCol: {
    flex: 1,
    gap: 20,
  },
  masonryItem: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1b3b2c',
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease',
      },
    }),
  },
  photoZoomIndicator: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(4, 29, 19, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  photoZoomIcon: {
    fontSize: 14,
  },
  lightboxBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(4, 29, 19, 0.95)',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 20,
    zIndex: 9999,
  },
  lightboxTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    zIndex: 10,
    paddingHorizontal: 12,
  },
  lightboxCounterBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  lightboxCounterText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 1.2,
  },
  lightboxCloseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  lightboxCloseBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  lightboxImageRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 1300,
    alignSelf: 'center',
  },
  lightboxNavBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  lightboxNavArrow: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.white,
    fontWeight: '300',
    marginTop: -2,
  },
  lightboxMainPhotoBox: {
    flex: 1,
    height: '84%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lightboxMainPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  lightboxCaptionBox: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: 'rgba(4, 29, 19, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  lightboxCaptionText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.92)',
  },
  masonryPhoto: {
    width: '100%',
    height: '100%',
  },
  volunteerSection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  volunteerCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 44,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.1)',
    ...Platform.select({
      web: { boxShadow: '0 8px 30px rgba(0,0,0,0.05)' },
    }),
  },
  volHeader: {
    marginBottom: 32,
  },
  volKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 8,
  },
  volTitle: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 38,
    color: colors.primary,
    marginBottom: 10,
  },
  volSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.subtleText,
    maxWidth: 680,
  },
  formGrid: {
    gap: 22,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
  },
  input: {
    backgroundColor: '#fbf9f4',
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.primary,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  areaOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  areaChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#f3efe6',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  areaChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  areaChipText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.primary,
  },
  areaChipTextActive: {
    color: colors.white,
  },
  submitBtn: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
    ...Platform.select({
      web: { cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' },
    }),
  },
  submitBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  successBox: {
    padding: 30,
    backgroundColor: '#f1f8ed',
    borderRadius: 16,
    alignItems: 'center',
    textAlign: 'center',
    gap: 12,
  },
  successEmoji: {
    fontSize: 36,
  },
  successTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.primary,
  },
  successDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.subtleText,
    textAlign: 'center',
    maxWidth: 520,
  },
  bold: {
    fontWeight: '700',
    color: colors.primary,
  },
  newVolBtn: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  newVolBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.white,
  },
});
