import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { ArrowUpRight } from './icons/ArrowUpRight';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: '1',
    number: '01',
    question: 'Como as doações são utilizadas?',
    answer:
      'As contribuições apoiam a continuidade dos projetos, formações, materiais, mobilização territorial e estrutura necessária às ações do INÃ.',
  },
  {
    id: '2',
    number: '02',
    question: 'Posso escolher um projeto para apoiar?',
    answer:
      'Sim. Entre em contato com a equipe para conhecer as necessidades atuais e direcionar sua contribuição a uma iniciativa específica.',
  },
  {
    id: '3',
    number: '03',
    question: 'Como faço para ser voluntário?',
    answer:
      'Acesse a página Pessoas e Voluntariado, conheça as possibilidades de participação e envie uma mensagem com suas habilidades e disponibilidade.',
  },
  {
    id: '4',
    number: '04',
    question: 'Onde posso acompanhar a prestação de contas?',
    answer:
      'Relatórios, documentos institucionais e prestações de contas ficam disponíveis na página Transparência.',
  },
  {
    id: '5',
    number: '05',
    question: 'Empresas podem apoiar o INÃ?',
    answer:
      'Sim. Construímos parcerias institucionais, apoio a projetos e ações conjuntas alinhadas aos princípios socioambientais do Instituto.',
  },
];

export function FAQSection() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const headingFontSize = isDesktop ? 72 : isTablet ? 48 : 34;
  const headingLineHeight = isDesktop ? 74 : isTablet ? 52 : 38;

  // Track open items (default 1 open)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '1': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
      <View style={styles.container}>
        <View style={[styles.layoutRow, !isDesktop && styles.layoutRowMobile]}>
          {/* Left Column: Heading and Contact */}
          <View style={[styles.leftCol, !isDesktop && styles.fullWidth]}>
            <Text style={styles.tagText}>Perguntas frequentes</Text>

            <Text
              style={[
                styles.heading,
                {
                  fontSize: headingFontSize,
                  lineHeight: headingLineHeight,
                },
              ]}
            >
              Antes de perguntar,{'\n'}talvez a resposta{'\n'}esteja aqui.
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.contactLink}
              accessibilityRole="button"
              accessibilityLabel="Ainda tem dúvidas? Fale com a gente"
            >
              <Text style={styles.contactLinkText}>Ainda tem dúvidas? Fale com a gente</Text>
              <ArrowUpRight size={17} color={colors.primary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Right Column: Accordion List */}
          <View style={[styles.rightCol, !isDesktop && styles.fullWidth]}>
            <View style={styles.accordionContainer}>
              {faqList.map((item) => {
                const isOpen = !!openItems[item.id];
                return (
                  <View key={item.id} style={styles.accordionItem}>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => toggleItem(item.id)}
                      style={styles.summaryRow}
                      accessibilityRole="button"
                      accessibilityLabel={item.question}
                    >
                      <Text style={styles.itemNumber}>{item.number}</Text>
                      <Text style={styles.questionText}>{item.question}</Text>
                      <Text style={styles.toggleIcon}>{isOpen ? '−' : '+'}</Text>
                    </TouchableOpacity>

                    {isOpen && (
                      <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 100,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 1382.4,
  },
  layoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 60,
  },
  layoutRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  leftCol: {
    flex: 1,
    maxWidth: 480,
  },
  rightCol: {
    flex: 1.5,
    maxWidth: 768,
  },
  fullWidth: {
    maxWidth: '100%',
  },
  tagText: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.primaryButton,
    fontWeight: '700',
    marginBottom: 20,
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -2.2,
    fontWeight: '400',
    marginBottom: 40,
  },
  contactLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 4,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.primary,
    alignSelf: 'flex-start',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  contactLinkText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  accordionContainer: {
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(20,61,43,0.2)',
    width: '100%',
  },
  accordionItem: {
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(20,61,43,0.2)',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 26,
    gap: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  itemNumber: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    color: '#687c70',
    width: 32,
  },
  questionText: {
    flex: 1,
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    lineHeight: 23,
    color: colors.primary,
    fontWeight: '600',
  },
  toggleIcon: {
    fontFamily: fonts.sans,
    fontSize: 22,
    color: colors.primary,
    paddingHorizontal: 8,
  },
  answerContainer: {
    paddingLeft: 48,
    paddingRight: 20,
    paddingBottom: 26,
  },
  answerText: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 22,
    color: '#52685b',
  },
});
