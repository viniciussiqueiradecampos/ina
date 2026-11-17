import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { DonationHeartIcon } from '../components/icons/DonationHeartIcon';
import { SupportersSection } from '../components/SupportersSection';
import { ArrowRight } from '../components/icons/ArrowRight';

export function DonationScreen({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;
  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Donation Mode: 'financial' | 'physical'
  const [donateMode, setDonateMode] = useState<'financial' | 'physical'>('financial');

  // Financial State
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [copiedPix, setCopiedPix] = useState(false);

  // Physical Donation State
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [itemCategory, setItemCategory] = useState('Livros e Materiais Escolares');
  const [itemDesc, setItemDesc] = useState('');
  const [physicalSuccess, setPhysicalSuccess] = useState(false);

  const presetAmounts = [35, 60, 100, 250, 500];

  const handleCopyPix = () => {
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handlePhysicalSubmit = () => {
    if (donorName && donorEmail && itemDesc) {
      setPhysicalSuccess(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.kickerRow}>
          <DonationHeartIcon size={20} color={colors.primary} />
          <Text style={styles.kickerText}>Faça Parte da Mudança</Text>
        </View>

        <Text style={styles.title}>
          Sua generosidade vira autonomia, floresta viva e futuro.
        </Text>

        <Text style={styles.subtitle}>
          Você pode apoiar o Instituto INÃ de duas maneiras práticas: investindo
          recursos financeiros diretos em nossas frentes de campo ou doando materiais e
          equipamentos físicos essenciais para as comunidades.
        </Text>

        {/* Mode Selector Tabs */}
        <View style={styles.modeTabs}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => setDonateMode('financial')}
            style={[styles.modeTab, donateMode === 'financial' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, donateMode === 'financial' && styles.modeTabTextActive]}>
              💰 Doação Financeira (PIX / Cartão)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => setDonateMode('physical')}
            style={[styles.modeTab, donateMode === 'physical' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, donateMode === 'physical' && styles.modeTabTextActive]}>
              📦 Doação de Itens Físicos & Materiais
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Donation Container */}
      <View style={[styles.donationWrapper, { paddingHorizontal: horizontalPadding }]}>
        {donateMode === 'financial' ? (
          <View style={[styles.cardGrid, !isDesktop && styles.cardGridMobile]}>
            {/* Left: Donation Configuration */}
            <View style={styles.configCard}>
              <Text style={styles.cardHeaderTitle}>Escolha como prefere apoiar</Text>

              {/* Frequency Selector */}
              <View style={styles.frequencyRow}>
                <TouchableOpacity
                  onPress={() => setFrequency('monthly')}
                  style={[styles.freqBtn, frequency === 'monthly' && styles.freqBtnActive]}
                >
                  <Text style={[styles.freqBtnText, frequency === 'monthly' && styles.freqBtnTextActive]}>
                    Mensal (Impacto Contínuo)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFrequency('once')}
                  style={[styles.freqBtn, frequency === 'once' && styles.freqBtnActive]}
                >
                  <Text style={[styles.freqBtnText, frequency === 'once' && styles.freqBtnTextActive]}>
                    Única vez
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Presets */}
              <Text style={styles.label}>Selecione um valor:</Text>
              <View style={styles.presetsRow}>
                {presetAmounts.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <TouchableOpacity
                      key={amt}
                      onPress={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      style={[styles.presetChip, isSelected && styles.presetChipActive]}
                    >
                      <Text style={[styles.presetText, isSelected && styles.presetTextActive]}>
                        R$ {amt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Custom amount */}
              <View style={styles.customAmountGroup}>
                <Text style={styles.label}>Ou digite outro valor:</Text>
                <TextInput
                  placeholder="R$ Outro valor"
                  placeholderTextColor="#8a9c92"
                  keyboardType="numeric"
                  value={customAmount}
                  onChangeText={(val) => {
                    setCustomAmount(val);
                    setSelectedAmount(null);
                  }}
                  style={styles.customInput}
                />
              </View>

              {/* PIX Direct Box */}
              <View style={styles.pixBox}>
                <View style={styles.pixTopRow}>
                  <Text style={styles.pixTitle}>Chave Oficial PIX do INÃ</Text>
                  <TouchableOpacity onPress={handleCopyPix} style={styles.copyBtn}>
                    <Text style={styles.copyBtnText}>
                      {copiedPix ? 'Copiado! ✓' : 'Copiar Chave'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.pixKeyText}>contato@institutoina.org.br</Text>
                <Text style={styles.pixSub}>
                  CNPJ / E-mail verificado • Instituto Nova Amazônia
                </Text>
              </View>
            </View>

            {/* Right: Where your money goes */}
            <View style={styles.impactCard}>
              <Text style={styles.impactTitle}>Para onde vai sua doação?</Text>

              <View style={styles.impactItem}>
                <Text style={styles.impactIcon}>🌱</Text>
                <View style={styles.impactTextCol}>
                  <Text style={styles.impactHeading}>R$ 35 / mês</Text>
                  <Text style={styles.impactDesc}>
                    Garante insumos e sementes nativas para restauração produtiva de quintais agroecológicos.
                  </Text>
                </View>
              </View>

              <View style={styles.impactItem}>
                <Text style={styles.impactIcon}>📚</Text>
                <View style={styles.impactTextCol}>
                  <Text style={styles.impactHeading}>R$ 60 / mês</Text>
                  <Text style={styles.impactDesc}>
                    Financia kits de reforço escolar e leitura viva para duas crianças na Biblioteca do Chaú.
                  </Text>
                </View>
              </View>

              <View style={styles.impactItem}>
                <Text style={styles.impactIcon}>🐟</Text>
                <View style={styles.impactTextCol}>
                  <Text style={styles.impactHeading}>R$ 100 / mês</Text>
                  <Text style={styles.impactDesc}>
                    Capacita agricultoras ribeirinhas na formulação própria de ração artesanal sustentável.
                  </Text>
                </View>
              </View>

              <View style={styles.impactItem}>
                <Text style={styles.impactIcon}>🛶</Text>
                <View style={styles.impactTextCol}>
                  <Text style={styles.impactHeading}>R$ 250 / mês</Text>
                  <Text style={styles.impactDesc}>
                    Cobre combustível e logística fluvial para escoamento direto de mariscos da reserva sem atravessadores.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* Physical Items Donation */
          <View style={styles.physicalCard}>
            <View style={styles.physicalHeader}>
              <Text style={styles.physicalTitle}>Doação de Itens Físicos & Equipamentos</Text>
              <Text style={styles.physicalSub}>
                Aceitamos doações de itens novos ou em excelente estado para estruturar bibliotecas
                comunitárias, oficinas produtivas, laboratórios de campo e cooperativas.
              </Text>
            </View>

            {physicalSuccess ? (
              <View style={styles.successBox}>
                <Text style={styles.successEmoji}>📦</Text>
                <Text style={styles.successTitle}>Registro de doação recebido!</Text>
                <Text style={styles.successDesc}>
                  Muito obrigado, <Text style={styles.bold}>{donorName}</Text>. Nossa equipe de logística entrará em contato
                  pelo e-mail <Text style={styles.bold}>{donorEmail}</Text> para alinhar o ponto de coleta em Belém ou envio postal.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPhysicalSuccess(false);
                    setDonorName('');
                    setDonorEmail('');
                    setItemDesc('');
                  }}
                  style={styles.newVolBtn}
                >
                  <Text style={styles.newVolBtnText}>Registrar outra doação</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formGrid}>
                {/* Needs categories tags */}
                <View style={styles.needsBox}>
                  <Text style={styles.needsTitle}>O que as comunidades mais necessitam agora:</Text>
                  <View style={styles.needsRow}>
                    <Text style={styles.needTag}>• Livros infanto-juvenis e dicionários</Text>
                    <Text style={styles.needTag}>• Computadores / notebooks revisados</Text>
                    <Text style={styles.needTag}>• Caixas térmicas e freezers solares</Text>
                    <Text style={styles.needTag}>• Coleletes salva-vidas e lanternas</Text>
                    <Text style={styles.needTag}>• Microscópios e lupas escolares</Text>
                    <Text style={styles.needTag}>• Moedores manuais de grãos e sementes</Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Seu nome completo ou da organização *</Text>
                  <TextInput
                    placeholder="Nome completo ou Razão Social"
                    placeholderTextColor="#8a9c92"
                    value={donorName}
                    onChangeText={setDonorName}
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Seu e-mail para combinarmos a entrega *</Text>
                  <TextInput
                    placeholder="seuemail@exemplo.com"
                    placeholderTextColor="#8a9c92"
                    keyboardType="email-address"
                    value={donorEmail}
                    onChangeText={setDonorEmail}
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Categoria dos itens:</Text>
                  <View style={styles.categoryChipsRow}>
                    {[
                      'Livros e Materiais Escolares',
                      'Tecnologia / Informática',
                      'Equipamentos Produtivos / Cozinha',
                      'Náutica / Segurança Fluvial',
                      'Outro',
                    ].map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        onPress={() => setItemCategory(cat)}
                        style={[styles.catChip, itemCategory === cat && styles.catChipActive]}
                      >
                        <Text style={[styles.catChipText, itemCategory === cat && styles.catChipTextActive]}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descrição detalhada dos itens e estado de conservação *</Text>
                  <TextInput
                    placeholder="Descreva quantidade, especificações, estado dos produtos e cidade onde se encontram..."
                    placeholderTextColor="#8a9c92"
                    multiline
                    numberOfLines={4}
                    value={itemDesc}
                    onChangeText={setItemDesc}
                    style={[styles.input, styles.textArea]}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={handlePhysicalSubmit}
                  style={styles.submitBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Confirmar intenção de doação física"
                >
                  <Text style={styles.submitBtnText}>Enviar proposta de doação</Text>
                  <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Apoiadores Passando na Página de Doação */}
      <View style={styles.supportersSectionWrapper}>
        <SupportersSection onBecomeSupporter={() => onNavigate && onNavigate('Contato')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  headerBanner: {
    paddingVertical: 60,
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  kickerText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.primary,
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
    maxWidth: 780,
    marginBottom: 36,
  },
  modeTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modeTab: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  modeTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeTabText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.primary,
  },
  modeTabTextActive: {
    color: colors.white,
  },
  donationWrapper: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 60,
  },
  cardGrid: {
    flexDirection: 'row',
    gap: 28,
  },
  cardGridMobile: {
    flexDirection: 'column',
    gap: 28,
  },
  configCard: {
    flex: 1.2,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 38,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({
      web: { boxShadow: '0 8px 30px rgba(0,0,0,0.05)' },
    }),
  },
  cardHeaderTitle: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.primary,
    marginBottom: 20,
  },
  frequencyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 26,
  },
  freqBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    backgroundColor: '#fbf9f4',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  freqBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  freqBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    color: colors.primary,
  },
  freqBtnTextActive: {
    color: colors.white,
  },
  label: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    marginBottom: 10,
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  presetChip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: '#f3efe6',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  presetChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  presetText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.primary,
  },
  presetTextActive: {
    color: colors.accentDarkText,
  },
  customAmountGroup: {
    marginBottom: 26,
  },
  customInput: {
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
  pixBox: {
    backgroundColor: '#f4f8f0',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.12)',
  },
  pixTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pixTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  copyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  copyBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.white,
  },
  pixKeyText: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.primary,
    marginVertical: 4,
  },
  pixSub: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
  },
  impactCard: {
    flex: 1,
    backgroundColor: '#143d2b',
    borderRadius: 24,
    padding: 38,
    gap: 20,
    justifyContent: 'center',
  },
  impactTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.accent,
    marginBottom: 8,
  },
  impactItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  impactIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  impactTextCol: {
    flex: 1,
  },
  impactHeading: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.white,
    marginBottom: 4,
  },
  impactDesc: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.82)',
  },

  // Physical card styles
  physicalCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 44,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.08)',
    ...Platform.select({
      web: { boxShadow: '0 8px 30px rgba(0,0,0,0.05)' },
    }),
  },
  physicalHeader: {
    marginBottom: 28,
  },
  physicalTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    color: colors.primary,
    marginBottom: 8,
  },
  physicalSub: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.subtleText,
    maxWidth: 760,
  },
  needsBox: {
    backgroundColor: '#f6fbf3',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.1)',
    marginBottom: 10,
  },
  needsTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    marginBottom: 10,
  },
  needsRow: {
    gap: 6,
  },
  needTag: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: '#2a553c',
  },
  formGrid: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
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
    minHeight: 110,
    textAlignVertical: 'top',
  },
  categoryChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#f3efe6',
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  catChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catChipText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.primary,
  },
  catChipTextActive: {
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
  supportersSectionWrapper: {
    width: '100%',
  },
});
