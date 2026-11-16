import React from 'react';
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

interface ReportFile {
  title: string;
  year: string;
  size: string;
  type: string;
}

const reports: ReportFile[] = [
  {
    title: 'Relatório Anual de Atividades & Impacto Territorial',
    year: '2025',
    size: '8.4 MB',
    type: 'PDF Completo',
  },
  {
    title: 'Demonstrações Contábeis & Parecer de Auditoria Independente',
    year: '2025',
    size: '3.1 MB',
    type: 'PDF Auditado',
  },
  {
    title: 'Relatório Anual de Atividades & Prestação de Contas',
    year: '2024',
    size: '7.8 MB',
    type: 'PDF Completo',
  },
  {
    title: 'Balanço Patrimonial & Relatório Financeiro',
    year: '2024',
    size: '2.9 MB',
    type: 'PDF Auditado',
  },
  {
    title: 'Estatuto Social Atualizado e Registrado',
    year: 'Institucional',
    size: '1.4 MB',
    type: 'Documento Oficial',
  },
  {
    title: 'Certidão de Regularidade Fiscal e Previdenciária (CND)',
    year: 'Vigente',
    size: '420 KB',
    type: 'Certidão Oficial',
  },
];

export function TransparencyScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.headerBanner, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.pillLabel}>
          <Text style={styles.pillLabelText}>Prestação de Contas Aberta</Text>
        </View>
        <Text style={styles.title}>Transparência e Ética Institucional</Text>
        <Text style={styles.subtitle}>
          Cada centavo investido no INÃ é auditado, documentado e disponibilizado
          publicamente. Nosso compromisso primeiro é com as comunidades e com nossos
          apoiadores.
        </Text>
      </View>

      {/* Highlights Bento */}
      <View style={[styles.highlightsContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.highlightsGrid, !isDesktop && styles.highlightsGridMobile]}>
          <View style={[styles.hCard, { backgroundColor: '#164b35' }]}>
            <Text style={styles.hCardNumber}>100%</Text>
            <Text style={styles.hCardTitleWhite}>Auditoria Externa Independente</Text>
            <Text style={styles.hCardDescWhite}>
              Contas aprovadas sem ressalvas desde a fundação por empresas independentes de
              auditoria contábil.
            </Text>
          </View>

          <View style={[styles.hCard, { backgroundColor: '#c9f36b' }]}>
            <Text style={[styles.hCardNumber, { color: '#08281c' }]}>87%</Text>
            <Text style={styles.hCardTitleDark}>Aplicação Direta no Território</Text>
            <Text style={styles.hCardDescDark}>
              Da receita total, 87% é revertida diretamente em ações de campo, materiais,
              bolsas comunitárias e assistência técnica.
            </Text>
          </View>

          <View style={[styles.hCard, { backgroundColor: '#fffdf8', borderWidth: 1, borderColor: 'rgba(20,61,43,0.15)' }]}>
            <Text style={[styles.hCardNumber, { color: colors.primary }]}>Zero</Text>
            <Text style={styles.hCardTitleDark}>Débitos ou Pendências Fiscais</Text>
            <Text style={styles.hCardDescDark}>
              Certidões negativas atualizadas junto à Receita Federal, Ministério Público e
              órgãos estaduais do Pará.
            </Text>
          </View>
        </View>
      </View>

      {/* Reports Downloads List */}
      <View style={[styles.reportsSection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documentos & Relatórios para Download</Text>
          <Text style={styles.sectionDesc}>
            Acesse as versões na íntegra de nossos relatórios anuais e certidões oficiais.
          </Text>
        </View>

        <View style={styles.reportsList}>
          {reports.map((doc, idx) => (
            <View key={idx} style={styles.reportRow}>
              <View style={styles.docIconBox}>
                <Text style={styles.docIconText}>PDF</Text>
              </View>

              <View style={styles.docInfoCol}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                <Text style={styles.docMeta}>
                  Ano: {doc.year} • Tamanho: {doc.size} • {doc.type}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.downloadBtn}
                accessibilityRole="button"
                accessibilityLabel={`Baixar ${doc.title}`}
              >
                <Text style={styles.downloadBtnText}>Baixar</Text>
                <ArrowUpRight size={15} color={colors.primary} strokeWidth={1.5} />
              </TouchableOpacity>
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
  pillLabel: {
    backgroundColor: 'rgba(20, 61, 43, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  pillLabelText: {
    fontFamily: fonts.sansBold,
    fontSize: 10.5,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.primary,
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
    maxWidth: 760,
  },
  highlightsContainer: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 60,
  },
  highlightsGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  highlightsGridMobile: {
    flexDirection: 'column',
  },
  hCard: {
    flex: 1,
    borderRadius: 20,
    padding: 32,
    minHeight: 240,
    justifyContent: 'space-between',
  },
  hCardNumber: {
    fontFamily: fonts.serif,
    fontSize: 56,
    lineHeight: 58,
    color: colors.white,
    marginBottom: 12,
  },
  hCardTitleWhite: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    color: colors.white,
    marginBottom: 8,
  },
  hCardDescWhite: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  hCardTitleDark: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    color: '#08281c',
    marginBottom: 8,
  },
  hCardDescDark: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 21,
    color: '#08281c',
  },
  reportsSection: {
    maxWidth: 1382.4,
    alignSelf: 'center',
    width: '100%',
  },
  sectionHeader: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 32,
    color: colors.primary,
    marginBottom: 6,
  },
  sectionDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.subtleText,
  },
  reportsList: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: 'rgba(20, 61, 43, 0.1)',
    overflow: 'hidden',
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(20, 61, 43, 0.08)',
    gap: 18,
    flexWrap: 'wrap',
  },
  docIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(20, 61, 43, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docIconText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.primary,
  },
  docInfoCol: {
    flex: 1,
    minWidth: 220,
  },
  docTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.primary,
    marginBottom: 4,
  },
  docMeta: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtleText,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.primary,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  downloadBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.primary,
  },
});
