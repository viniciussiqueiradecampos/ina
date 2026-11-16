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
import { InaLogo } from './InaLogo';
import { ArrowUpRight } from './icons/ArrowUpRight';
import { AmazonTexture } from './AmazonTexture';

interface FooterProps {
  onNavigate?: (tab: string) => void;
  onOpenDonate?: () => void;
}

export function Footer({ onNavigate, onOpenDonate }: FooterProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  const handleNav = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <View style={[styles.footer, { paddingHorizontal: horizontalPadding }]}>
      {/* Subtle organic Amazonian background texture */}
      <AmazonTexture variant="foliage" color="#c9f36b" opacity={0.035} />

      <View style={styles.container}>
        {/* Top Footer Row */}
        <View style={[styles.topRow, !isDesktop && styles.topRowMobile]}>
          {/* Brand & Mission */}
          <View style={styles.brandCol}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleNav('Início')}
              style={styles.brandRow}
            >
              <InaLogo height={42} variant="accent" />
            </TouchableOpacity>

            <Text style={styles.missionText}>
              Construindo caminhos para o desenvolvimento sustentável, econômico e
              igualitário de comunidades tradicionais na Amazônia.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onOpenDonate}
              style={styles.donateFooterButton}
              accessibilityRole="button"
              accessibilityLabel="Quero doar"
            >
              <Text style={styles.donateFooterText}>Quero doar</Text>
              <ArrowUpRight size={16} color={colors.accentDarkText} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Links Columns */}
          <View style={[styles.linksGrid, !isDesktop && styles.linksGridMobile]}>
            {/* Column 1 */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>O Instituto</Text>
              <TouchableOpacity onPress={() => handleNav('O Instituto')} style={styles.linkItem}><Text style={styles.linkItemText}>Sobre nós</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('O Instituto')} style={styles.linkItem}><Text style={styles.linkItemText}>História & Trajetória</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Pessoas')} style={styles.linkItem}><Text style={styles.linkItemText}>Pessoas e Equipe</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Pessoas')} style={styles.linkItem}><Text style={styles.linkItemText}>Voluntariado</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Transparência')} style={styles.linkItem}><Text style={styles.linkItemText}>Transparência & Contas</Text></TouchableOpacity>
            </View>

            {/* Column 2 */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>Projetos</Text>
              <TouchableOpacity onPress={() => handleNav('Projetos')} style={styles.linkItem}><Text style={styles.linkItemText}>Piscicultura Artesanal</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Projetos')} style={styles.linkItem}><Text style={styles.linkItemText}>Catadores e Reciclagem</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Projetos')} style={styles.linkItem}><Text style={styles.linkItemText}>Paneiro do Mangal</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Projetos')} style={styles.linkItem}><Text style={styles.linkItemText}>Biblioteca do Chaú</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('Projetos')} style={styles.linkItem}><Text style={styles.linkItemText}>Ver todas iniciativas</Text></TouchableOpacity>
            </View>

            {/* Column 3 */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>Contato</Text>
              <TouchableOpacity onPress={() => handleNav('Contato')} style={styles.linkItem}><Text style={styles.contactItemText}>Fale com a gente</Text></TouchableOpacity>
              <Text style={styles.contactItemText}>contato@institutoina.org.br</Text>
              <Text style={styles.contactItemText}>Belém, Pará — Amazônia, Brasil</Text>
              <Text style={styles.contactItemText}>Atendimento de Seg a Sex</Text>

              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBadge}><Text style={styles.socialText}>IG</Text></TouchableOpacity>
                <TouchableOpacity style={styles.socialBadge}><Text style={styles.socialText}>LI</Text></TouchableOpacity>
                <TouchableOpacity style={styles.socialBadge}><Text style={styles.socialText}>YT</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Divider & Copyright */}
        <View style={styles.bottomRow}>
          <Text style={styles.copyrightText}>
            © {new Date().getFullYear()} INÃ — Instituto Nova Amazônia. Todos os direitos reservados.
          </Text>
          <Text style={styles.territoryText}>
            Amazônia pensada por quem vive nela.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#051810',
    paddingVertical: 80,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 1382.4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 60,
    paddingBottom: 60,
  },
  topRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  brandCol: {
    maxWidth: 380,
    gap: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 26,
    letterSpacing: 2.24,
    color: colors.accent,
    fontWeight: '400',
  },
  brandSubtitle: {
    fontFamily: fonts.sansBold,
    fontSize: 7.5,
    letterSpacing: 1.12,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '700',
    marginTop: 2,
  },
  missionText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  donateFooterButton: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    paddingHorizontal: 22,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  donateFooterText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.accentDarkText,
    fontWeight: '700',
  },
  linksGrid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
  },
  linksGridMobile: {
    flexDirection: 'column',
    gap: 28,
  },
  linkCol: {
    gap: 12,
  },
  linkColTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '700',
    marginBottom: 8,
  },
  linkItem: {
    paddingVertical: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  linkItemText: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  contactItemText: {
    fontFamily: fonts.sans,
    fontSize: 13.5,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  socialBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  socialText: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    color: colors.white,
    fontWeight: '700',
  },
  bottomRow: {
    paddingTop: 30,
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  copyrightText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  territoryText: {
    fontFamily: fonts.serif,
    fontSize: 13,
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
