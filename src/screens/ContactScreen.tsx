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
import { ArrowRight } from '../components/icons/ArrowRight';

export function ContactScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Parceria Institucional');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (name && email && message) {
      setSent(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.kicker}>Fale com o INÃ</Text>
        <Text style={styles.title}>Estamos abertos para dialogar e construir pontes.</Text>
        <Text style={styles.subtitle}>
          Seja para propor uma parceria institucional, apoiar projetos em campo, tirar
          dúvidas de imprensa ou colaborar voluntariamente.
        </Text>
      </View>

      {/* Main Content Row */}
      <View style={[styles.contentRow, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.layoutGrid, !isDesktop && styles.layoutGridMobile]}>
          {/* Left: Contact Info */}
          <View style={styles.infoCol}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Sede e Atuação</Text>
              <Text style={styles.infoBoxText}>
                Instituto Nova Amazônia{'\n'}
                Av. Nazaré, Belém — Pará{'\n'}
                Amazônia, Brasil
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>E-mail Geral</Text>
              <Text style={styles.infoBoxText}>contato@institutoina.org.br</Text>
              <Text style={styles.infoBoxSub}>Respondemos em até 24h úteis.</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Parcerias & Captação</Text>
              <Text style={styles.infoBoxText}>parcerias@institutoina.org.br</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Imprensa & Mídia</Text>
              <Text style={styles.infoBoxText}>comunicacao@institutoina.org.br</Text>
            </View>
          </View>

          {/* Right: Contact Form */}
          <View style={styles.formCol}>
            <View style={styles.formCard}>
              {sent ? (
                <View style={styles.successState}>
                  <Text style={styles.successIcon}>✉️</Text>
                  <Text style={styles.successTitle}>Mensagem enviada com sucesso!</Text>
                  <Text style={styles.successDesc}>
                    Obrigado pelo contato, <Text style={styles.bold}>{name}</Text>. Nossa
                    equipe responderá no e-mail <Text style={styles.bold}>{email}</Text> em
                    breve.
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSent(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    style={styles.newMsgBtn}
                  >
                    <Text style={styles.newMsgBtnText}>Enviar outra mensagem</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.formFields}>
                  <Text style={styles.formHeaderTitle}>Envie uma mensagem direta</Text>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Seu nome completo *</Text>
                    <TextInput
                      placeholder="Nome e sobrenome"
                      placeholderTextColor="#8a9c92"
                      value={name}
                      onChangeText={setName}
                      style={styles.textInput}
                      accessibilityLabel="Seu nome completo (campo obrigatório)"
                    />
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Seu e-mail *</Text>
                    <TextInput
                      placeholder="seuemail@exemplo.com"
                      placeholderTextColor="#8a9c92"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={setEmail}
                      style={styles.textInput}
                      accessibilityLabel="Seu e-mail (campo obrigatório)"
                    />
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Assunto</Text>
                    <View style={styles.subjectRow} accessibilityRole="radiogroup">
                      {['Parceria Institucional', 'Doações & Apoio', 'Dúvidas / Imprensa', 'Outro'].map((subj) => (
                        <TouchableOpacity
                          key={subj}
                          onPress={() => setSubject(subj)}
                          style={[
                            styles.subjectChip,
                            subject === subj && styles.subjectChipActive,
                          ]}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: subject === subj }}
                          accessibilityLabel={`Assunto: ${subj}`}
                        >
                          <Text
                            style={[
                              styles.subjectChipText,
                              subject === subj && styles.subjectChipTextActive,
                            ]}
                          >
                            {subj}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Mensagem *</Text>
                    <TextInput
                      placeholder="Escreva sua mensagem com detalhes..."
                      placeholderTextColor="#8a9c92"
                      multiline
                      numberOfLines={5}
                      value={message}
                      onChangeText={setMessage}
                      style={[styles.textInput, styles.textAreaInput]}
                      accessibilityLabel="Mensagem (campo obrigatório)"
                    />
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.88}
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    accessibilityRole="button"
                    accessibilityLabel="Enviar Mensagem de contato"
                  >
                    <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
                    <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
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
  },
  contentRow: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  layoutGrid: {
    flexDirection: 'row',
    gap: 48,
  },
  layoutGridMobile: {
    flexDirection: 'column',
  },
  infoCol: {
    flex: 1,
    gap: 24,
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 24,
    borderWidth: 0.8,
    borderColor: 'rgba(20, 61, 43, 0.1)',
  },
  infoBoxTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 8,
  },
  infoBoxText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: '#284134',
  },
  infoBoxSub: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
    marginTop: 4,
  },
  formCol: {
    flex: 1.6,
  },
  formCard: {
    backgroundColor: '#f2eee3',
    borderRadius: 24,
    padding: 36,
  },
  formHeaderTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 20,
  },
  formFields: {
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    color: colors.primary,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.primary,
    outlineStyle: 'none' as any,
  },
  textAreaInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  subjectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.15)',
  },
  subjectChipActive: {
    backgroundColor: colors.primaryButton,
    borderColor: colors.primaryButton,
  },
  subjectChipText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  subjectChipTextActive: {
    color: colors.white,
    fontFamily: fonts.sansBold,
  },
  submitButton: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  submitButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  successState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  successIcon: {
    fontSize: 48,
  },
  successTitle: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.primary,
    textAlign: 'center',
  },
  successDesc: {
    fontFamily: fonts.sans,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.subtleText,
    textAlign: 'center',
    maxWidth: 400,
  },
  bold: {
    fontFamily: fonts.sansBold,
  },
  newMsgBtn: {
    backgroundColor: colors.primaryButton,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 12,
  },
  newMsgBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.white,
  },
});
