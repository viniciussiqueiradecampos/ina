import React from 'react';
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
import { ArrowUpRight } from './icons/ArrowUpRight';
import { FadeInUp } from './FadeInUp';
import { AmazonTexture } from './AmazonTexture';

const project1Img = require('../../assets/project-1.png');
const project2Img = require('../../assets/project-2.png');
const project3Img = require('../../assets/project-3.png');
const project4Img = require('../../assets/project-4.png');

interface ProjectItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  image: any;
  cardBg: string;
  textColor?: string;
  descColor?: string;
}

const projects: ProjectItem[] = [
  {
    id: '1',
    number: '01',
    tag: 'Renda e igualdade de gênero',
    title: 'Ração artesanal para piscicultura',
    description:
      'Produção de ração a partir de frutos da comunidade, realizada principalmente por mulheres agricultoras.',
    image: project1Img,
    cardBg: '#c9f36b',
    textColor: '#143d2b',
    descColor: '#08281c',
  },
  {
    id: '2',
    number: '02',
    tag: 'Inclusão e reciclagem',
    title: 'Inclusão social e produtiva dos catadores',
    description:
      'Produção de sabão artesanal com óleo de cozinha para fortalecer a Coomarca e valorizar seus trabalhadores.',
    image: project2Img,
    cardBg: '#f2eee3',
    textColor: '#143d2b',
    descColor: '#4f6559',
  },
  {
    id: '3',
    number: '03',
    tag: 'Economia extrativista',
    title: 'Paneiro do Mangal',
    description:
      'Apoio ao transporte e à comercialização direta de produtos da reserva Caeté-Taperaçu.',
    image: project3Img,
    cardBg: '#f07a4f',
    textColor: '#143d2b',
    descColor: '#08281c',
  },
  {
    id: '4',
    number: '04',
    tag: 'Educação comunitária',
    title: 'Biblioteca comunitária do Chaú',
    description:
      'Mobilização por materiais e estrutura para o reforço escolar voluntário das crianças do Chaú.',
    image: project4Img,
    cardBg: '#f2eee3',
    textColor: '#143d2b',
    descColor: '#4f6559',
  },
];

export function ProjectsSection() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;
  const headingFontSize = isDesktop ? 80 : isTablet ? 52 : 36;
  const headingLineHeight = isDesktop ? 80 : isTablet ? 54 : 40;

  const col1Projects = [projects[0], projects[2]];
  const col2Projects = [projects[1], projects[3]];

  const renderProjectCard = (item: ProjectItem, index: number) => (
    <FadeInUp key={item.id} delay={140 + index * 120} distance={26} style={styles.projectCard}>
      {/* Top Image Container */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.projectImage} resizeMode="cover" />
        <View style={styles.tagBadge}>
          <Text style={styles.tagBadgeText}>{item.tag}</Text>
        </View>
      </View>

      {/* Bottom Content Box */}
      <View style={[styles.cardContent, { backgroundColor: item.cardBg }]}>
        <Text style={[styles.projectNumber, { color: item.textColor || colors.primary }]}>
          {item.number}
        </Text>

        <Text style={[styles.projectTitle, { color: item.textColor || colors.primary }]}>
          {item.title}
        </Text>

        <Text style={[styles.projectDesc, { color: item.descColor || '#4f6559' }]}>
          {item.description}
        </Text>

        {/* Circular Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.circleButton}
          accessibilityRole="button"
          accessibilityLabel={`Ver projeto ${item.title}`}
        >
          <ArrowUpRight size={18} color={colors.primary} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </FadeInUp>
  );

  return (
    <View style={[styles.section, { paddingHorizontal: horizontalPadding }]}>
      {/* Amazonian organic texture */}
      <AmazonTexture variant="foliage" color={colors.primary} opacity={0.035} />

      <View style={styles.container}>
        {/* Top Header Row */}
        <View style={[styles.headerRow, !isDesktop && styles.headerRowMobile]}>
          <View style={styles.headerLeft}>
            <Text
              style={[
                styles.heading,
                {
                  fontSize: headingFontSize,
                  lineHeight: headingLineHeight,
                },
              ]}
            >
              Projetos que nascem da escuta e ganham vida no território.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.viewAllTopLink}
            accessibilityRole="button"
            accessibilityLabel="Ver todos os projetos"
          >
            <Text style={styles.viewAllTopText}>Ver todos os projetos</Text>
            <ArrowUpRight size={17} color={colors.primary} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* 2-Column Gallery Grid */}
        {isDesktop ? (
          <View style={styles.galleryGrid}>
            <View style={styles.galleryCol}>{col1Projects.map(renderProjectCard)}</View>
            <View style={[styles.galleryCol, styles.galleryColOffset]}>
              {col2Projects.map(renderProjectCard)}
            </View>
          </View>
        ) : (
          <View style={styles.galleryMobile}>{projects.map(renderProjectCard)}</View>
        )}

        {/* Bottom Initiatives Banner */}
        <View style={[styles.bottomBar, !isDesktop && styles.bottomBarMobile]}>
          <Text style={styles.bottomBarText}>
            São dez iniciativas em educação, cultura, renda, ciência e justiça ambiental.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.bottomButton}
            accessibilityRole="button"
            accessibilityLabel="Conhecer todos os projetos"
          >
            <Text style={styles.bottomButtonText}>Conhecer todos os projetos</Text>
            <ArrowUpRight size={17} color={colors.white} strokeWidth={1.5} />
          </TouchableOpacity>
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
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: 1382.4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 60,
    gap: 40,
  },
  headerRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  headerLeft: {
    flex: 1,
    maxWidth: 950,
  },
  heading: {
    fontFamily: fonts.serif,
    color: colors.primary,
    letterSpacing: -2.8,
    fontWeight: '400',
  },
  viewAllTopLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 4,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.primary,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  viewAllTopText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  galleryGrid: {
    flexDirection: 'row',
    gap: 18,
    width: '100%',
  },
  galleryCol: {
    flex: 1,
    gap: 24,
  },
  galleryColOffset: {
    paddingTop: 75,
  },
  galleryMobile: {
    flexDirection: 'column',
    gap: 24,
  },
  projectCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f2eee3',
    width: '100%',
  },
  imageContainer: {
    height: 380,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1b3b2c',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fffdf8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    zIndex: 2,
  },
  tagBadgeText: {
    fontFamily: fonts.sansBold,
    fontSize: 9.5,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    color: '#08281c',
    fontWeight: '700',
  },
  cardContent: {
    padding: 28,
    minHeight: 220,
    position: 'relative',
    justifyContent: 'space-between',
  },
  projectNumber: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 12,
  },
  projectTitle: {
    fontFamily: fonts.serif,
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.2,
    fontWeight: '400',
    marginBottom: 12,
    maxWidth: '85%',
  },
  projectDesc: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 21,
    maxWidth: '85%',
  },
  circleButton: {
    position: 'absolute',
    right: 28,
    bottom: 28,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 0.8,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
      },
    }),
  },
  bottomBar: {
    marginTop: 60,
    paddingTop: 35,
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(20,61,43,0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  bottomBarMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bottomBarText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: '#52685b',
    maxWidth: 560,
  },
  bottomButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 100,
    minHeight: 56,
    paddingLeft: 28,
    paddingRight: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  bottomButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.white,
    fontWeight: '700',
  },
});
