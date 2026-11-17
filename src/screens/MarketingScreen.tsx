import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TextInput,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { DownloadIcon } from '../components/icons/DownloadIcon';

interface BrandAsset {
  id: string;
  category: string;
  title: string;
  description: string;
  format: string;
  size: string;
}

const assetsList: BrandAsset[] = [
  {
    id: 'b1',
    category: 'Identidade Visual',
    title: 'Brandbook Oficial INÃ 2026',
    description: 'Manual de aplicação de cores, tipografia, malha de construção do logo e regras de uso institucional.',
    format: 'PDF',
    size: '14.2 MB',
  },
  {
    id: 'b2',
    category: 'Logotipos',
    title: 'Kit de Logos Vetoriais (SVG, EPS, AI)',
    description: 'Versões principal, simplificada, monocromática preta e monocromática branca em alta fidelidade.',
    format: 'ZIP',
    size: '28.5 MB',
  },
  {
    id: 'b3',
    category: 'Logotipos',
    title: 'Logotipos em PNG com Fundo Transparente',
    description: 'Imagens exportadas em 1x, 2x e 4x para uso direto na web, apresentações e mídias digitais.',
    format: 'ZIP',
    size: '8.4 MB',
  },
  {
    id: 'b4',
    category: 'Imprensa & Mídia',
    title: 'Press Kit Institucional 2026',
    description: 'Dados consolidados de impacto, histórico das fundadoras, ficha técnica da ONG e contatos oficiais.',
    format: 'PDF',
    size: '6.1 MB',
  },
  {
    id: 'b5',
    category: 'Fotografia & Imagens',
    title: 'Banco de Fotos em Alta Resolução (Uso Editorial)',
    description: 'Seleção curada de fotos de projetos no território, oficinas comunitárias e lideranças com direitos liberados.',
    format: 'ZIP',
    size: '190 MB',
  },
  {
    id: 'b6',
    category: 'Tipografia & Elementos',
    title: 'Texturas Gráficas & Elementos de Suporte',
    description: 'Padrões orgânicos de linhas e ondas da Amazônia para composições gráficas de parceiros.',
    format: 'ZIP',
    size: '12.0 MB',
  },
];

export function MarketingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;
  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [need, setNeed] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && email && need) {
      setSubmitted(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hero Header */}
      <View style={[styles.heroSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.kickerRow}>
          <View style={styles.kickerDot} />
          <Text style={styles.kickerText}>ATIVOS INSTITUCIONAIS & MARCA</Text>
        </View>

        <Text style={styles.heroTitle}>Marketing & Ativos da Marca</Text>
        <Text style={styles.heroSub}>
          Espaço dedicado para parceiros, organizadores de eventos, veículos de imprensa e pesquisadores
          fazerem download dos recursos gráficos oficiais do Instituto Nova Amazônia.
        </Text>
      </View>

      {/* Downloads Grid */}
      <View style={[styles.contentSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeadingTitle}>Arquivos Disponíveis para Download</Text>
          <Text style={styles.sectionHeadingSub}>
            Uso liberado para fins institucionais, jornalísticos e parcerias homologadas.
          </Text>
        </View>

        <View style={[styles.assetsGrid, !isDesktop && styles.assetsGridMobile]}>
          {assetsList.map((asset) => (
            <View key={asset.id} style={styles.assetCard}>
              <View style={styles.assetCardTop}>
                <View style={styles.iconBox}>
                  <DownloadIcon size={22} color={colors.primary} />
                </View>
                <View style={styles.badgePill}>
                  <Text style={styles.badgeText}>{asset.format} • {asset.size}</Text>
                </View>
              </View>

              <View style={styles.assetInfoBlock}>
                <Text style={styles.assetCategory}>{asset.category}</Text>
                <Text style={styles.assetTitle}>{asset.title}</Text>
                <Text style={styles.assetDesc}>{asset.description}</Text>
              </View>

              <TouchableOpacity
                style={styles.downloadBtn}
                activeOpacity={0.88}
                accessibilityRole="button"
                accessibilityLabel={`Baixar ${asset.title}`}
              >
                <Text style={styles.downloadBtnText}>Baixar Arquivo</Text>
                <DownloadIcon size={16} color={colors.accentDarkText} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Custom Asset Request Form */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formKicker}>SOLICITAÇÃO SOB MEDIDA</Text>
            <Text style={styles.formTitle}>Não encontrou o que precisava?</Text>
            <Text style={styles.formSub}>
              Precisa de arquivos em formatos especiais (vetor aberto, proporções personalizadas), vídeos em 4K
              ou autorização prévia de uso de imagem para projetos acadêmicos ou comerciais?
              Preencha o formulário abaixo que nossa equipe de comunicação retornará em até 24 horas.
            </Text>
          </View>

          {submitted ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Solicitação enviada com sucesso!</Text>
              <Text style={styles.successSub}>
                Recebemos sua mensagem e entraremos em contato através do e-mail informado com os arquivos solicitados.
              </Text>
            </View>
          ) : (
            <View style={styles.formGrid}>
              <View style={[styles.formRow, !isDesktop && styles.formRowMobile]}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Seu Nome Completo *</Text>
                  <TextInput
                    placeholder="ex: Mariana Silva"
                    placeholderTextColor="#8a9990"
                    value={name}
                    onChangeText={setName}
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Seu E-mail Profissional *</Text>
                  <TextInput
                    placeholder="ex: mariana@empresa.com"
                    placeholderTextColor="#8a9990"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Empresa, Veículo ou Instituição</Text>
                <TextInput
                  placeholder="ex: Jornal / Universidade / ONG Parceira"
                  placeholderTextColor="#8a9990"
                  value={organization}
                  onChangeText={setOrganization}
                  style={styles.textInput}
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Descreva exatamente o material de que você precisa *</Text>
                <TextInput
                  placeholder="Descreva dimensões, extensões desejadas, contexto de veiculação e prazo..."
                  placeholderTextColor="#8a9990"
                  value={need}
                  onChangeText={setNeed}
                  multiline
                  numberOfLines={4}
                  style={[styles.textInput, styles.textArea]}
                />
              </View>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                activeOpacity={0.88}
                accessibilityRole="button"
                accessibilityLabel="Enviar solicitação de material"
              >
                <Text style={styles.submitBtnText}>Enviar Solicitação de Material</Text>
              </TouchableOpacity>
            </View>
          )}
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
  },
  contentSection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 20,
  },
  sectionHeadingRow: {
    marginBottom: 32,
    gap: 6,
  },
  sectionHeadingTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    lineHeight: 36,
    color: colors.primary,
  },
  sectionHeadingSub: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.subtleText,
  },
  assetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 70,
  },
  assetsGridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  assetCard: {
    flex: 1,
    minWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    justifyContent: 'space-between',
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  assetCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(20, 61, 43, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePill: {
    backgroundColor: '#f2eee3',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.primary,
  },
  assetInfoBlock: {
    gap: 6,
  },
  assetCategory: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.subtleText,
  },
  assetTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 25,
    color: colors.primary,
  },
  assetDesc: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 20,
    color: '#4f6559',
  },
  downloadBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  downloadBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.accentDarkText,
    fontWeight: '700',
  },

  /* Form Section */
  formContainer: {
    backgroundColor: '#164b35',
    borderRadius: 24,
    padding: 44,
    gap: 32,
  },
  formHeader: {
    maxWidth: 780,
    gap: 8,
  },
  formKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '700',
  },
  formTitle: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 38,
    color: colors.white,
  },
  formSub: {
    fontFamily: fonts.sans,
    fontSize: 14.5,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  formGrid: {
    gap: 18,
  },
  formRow: {
    flexDirection: 'row',
    gap: 18,
  },
  formRowMobile: {
    flexDirection: 'column',
    gap: 18,
  },
  formField: {
    flex: 1,
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.sans,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    ...Platform.select({
      web: { outlineStyle: 'none' } as any,
    }),
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 32,
    marginTop: 8,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  submitBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  successBox: {
    backgroundColor: 'rgba(201, 243, 107, 0.15)',
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 6,
  },
  successTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    color: colors.accent,
  },
  successSub: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 22,
  },
});
