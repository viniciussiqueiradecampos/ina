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

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  tag: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dandara Guajajara',
    role: 'Coordenação Territorial & Relações Indígenas',
    bio: 'Antropóloga e pesquisadora com 12 anos de atuação na defesa de terras indígenas e projetos de soberania alimentar na Amazônia.',
    tag: 'Coordenação',
  },
  {
    name: 'Marcos Silveira',
    role: 'Direção Executiva & Sustentabilidade',
    bio: 'Engenheiro florestal, mestre em ecologia aplicada, dedicado à estruturação de cadeias de valor da sociobiodiversidade.',
    tag: 'Direção',
  },
  {
    name: 'Dona Maria do Socorro',
    role: 'Liderança Comunitária & Mestra Artesã',
    bio: 'Coordenadora do grupo de mulheres da piscicultura e guardiã dos saberes tradicionais da comunidade do Caeté.',
    tag: 'Liderança Local',
  },
  {
    name: 'Lucas Mendonça',
    role: 'Gestão de Projetos & Inclusão Produtiva',
    bio: 'Economista socioambiental, facilitador das cooperativas de reciclagem e projetos de economia circular na região bragantina.',
    tag: 'Projetos',
  },
  {
    name: 'Tereza Baía',
    role: 'Educação Comunitária & Biblioteca do Chaú',
    bio: 'Pedagoga ribeirinha, idealizadora do reforço escolar e mobilizadora da juventude para preservação dos mangais.',
    tag: 'Educação',
  },
  {
    name: 'Dr. Fernando Barata',
    role: 'Conselheiro Científico & Biólogo',
    bio: 'Professor universitário e pesquisador especialista em ictiofauna e conservação de ecossistemas costeiros amazônicos.',
    tag: 'Conselho',
  },
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

  const handleVolunteerSubmit = () => {
    if (volName && volEmail) {
      setVolSuccess(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.kicker}>Pessoas & Coletivo</Text>
        <Text style={styles.title}>
          Quem transforma o território com afeto, técnica e coragem.
        </Text>
        <Text style={styles.subtitle}>
          O INÃ é feito por mãos ribeirinhas, indígenas, cientistas e voluntários unidos
          pelo respeito incondicional à Amazônia e a seu povo.
        </Text>
      </View>

      {/* Team Grid */}
      <View style={[styles.teamContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Equipe e Lideranças</Text>
        </View>

        <View style={[styles.teamGrid, !isDesktop && styles.teamGridMobile]}>
          {teamMembers.map((member) => (
            <View key={member.name} style={styles.memberCard}>
              <View style={styles.memberAvatarCircle}>
                <Text style={styles.memberInitials}>
                  {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </Text>
              </View>

              <View style={styles.memberBadge}>
                <Text style={styles.memberBadgeText}>{member.tag}</Text>
              </View>

              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
              <Text style={styles.memberBio}>{member.bio}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Volunteer Program Box */}
      <View style={[styles.volunteerSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.volunteerCard}>
          <View style={styles.volHeader}>
            <Text style={styles.volKicker}>Faça Parte</Text>
            <Text style={styles.volTitle}>Programa de Voluntariado INÃ</Text>
            <Text style={styles.volSubtitle}>
              Doe seu tempo e habilidades para apoiar formações, materiais pedagógicos,
              comunicação ou apoio técnico em campo.
            </Text>
          </View>

          {volSuccess ? (
            <View style={styles.successBox}>
              <Text style={styles.successEmoji}>🎉</Text>
              <Text style={styles.successTitle}>Inscrição enviada com carinho!</Text>
              <Text style={styles.successDesc}>
                Obrigado, <Text style={styles.bold}>{volName}</Text>. Nossa coordenação
                entrará em contato pelo e-mail informado para agendar uma conversa.
              </Text>
            </View>
          ) : (
            <View style={styles.formGrid}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Seu nome completo:</Text>
                <TextInput
                  placeholder="Ex: Ana Maria da Silva"
                  placeholderTextColor="#8a9c92"
                  value={volName}
                  onChangeText={setVolName}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Seu e-mail:</Text>
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
                <Text style={styles.label}>Área de interesse:</Text>
                <View style={styles.areaOptionsRow}>
                  {['Educação e Oficinas', 'Comunicação e Design', 'Apoio Técnico / Agroecologia', 'Gestão / Jurídico'].map((area) => (
                    <TouchableOpacity
                      key={area}
                      onPress={() => setVolArea(area)}
                      style={[styles.areaChip, volArea === area && styles.areaChipActive]}
                    >
                      <Text style={[styles.areaChipText, volArea === area && styles.areaChipTextActive]}>
                        {area}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Conte um pouco sobre você e disponibilidade:</Text>
                <TextInput
                  placeholder="Fale sobre sua experiência, motivação e quantas horas semanais gostaria de dedicar..."
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
              >
                <Text style={styles.submitBtnText}>Quero ser voluntário</Text>
                <ArrowRight size={18} color={colors.accentDarkText} strokeWidth={1.5} />
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
  teamContainer: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: 60,
  },
  sectionHeading: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: colors.primary,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  teamGridMobile: {
    flexDirection: 'column',
  },
  memberCard: {
    width: '31.5%',
    minWidth: 260,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 28,
    borderWidth: 0.8,
    borderColor: 'rgba(20, 61, 43, 0.1)',
    alignItems: 'flex-start',
  },
  memberAvatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#164b35',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  memberInitials: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    color: colors.accent,
  },
  memberBadge: {
    backgroundColor: 'rgba(201, 243, 107, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 12,
  },
  memberBadgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 9.5,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  memberName: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 4,
  },
  memberRole: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.primaryButton,
    marginBottom: 12,
  },
  memberBio: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.subtleText,
  },
  volunteerSection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  volunteerCard: {
    backgroundColor: '#f2eee3',
    borderRadius: 24,
    padding: 40,
    gap: 24,
  },
  volHeader: {
    maxWidth: 680,
  },
  volKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 8,
  },
  volTitle: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: colors.primary,
    marginBottom: 10,
  },
  volSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 14.5,
    lineHeight: 23,
    color: colors.subtleText,
  },
  formGrid: {
    gap: 16,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  areaOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  areaChip: {
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(20, 61, 43, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  areaChipActive: {
    backgroundColor: colors.primaryButton,
    borderColor: colors.primaryButton,
  },
  areaChipText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  areaChipTextActive: {
    color: colors.white,
    fontFamily: fonts.sansBold,
  },
  submitBtn: {
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
  submitBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  successBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  successEmoji: {
    fontSize: 40,
  },
  successTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.primary,
  },
  successDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.subtleText,
    textAlign: 'center',
  },
  bold: {
    fontFamily: fonts.sansBold,
  },
});
