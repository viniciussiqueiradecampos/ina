import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts } from '../constants/theme';
import { DonationHeartIcon } from './icons/DonationHeartIcon';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from './icons/SocialIcons';

const inaLogoWhite = require('../../assets/ina-logo-white.png');

export function Footer() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 720 && width < 1024;

  const horizontalPadding = isDesktop ? 76.8 : isTablet ? 40 : 20;

  const handleNav = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={[styles.footer, { paddingHorizontal: horizontalPadding }]}>
      <View style={styles.container}>
        {/* Top Footer Row */}
        <View style={[styles.topRow, !isDesktop && styles.topRowMobile]}>
          {/* Brand & Mission */}
          <View style={styles.brandCol}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleNav('/')}
              style={styles.brandRow}
              accessibilityRole="button"
              accessibilityLabel="INÃ — página inicial"
            >
              <Image
                source={inaLogoWhite}
                style={{ width: 88, height: 49 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.missionText}>
              Construindo caminhos para o desenvolvimento sustentável, econômico e
              igualitário de comunidades tradicionais na Amazônia.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/doacao')}
              style={styles.donateFooterButton}
              accessibilityRole="button"
              accessibilityLabel="Fazer doação"
            >
              <DonationHeartIcon size={18} color={colors.accentDarkText} />
              <Text style={styles.donateFooterText}>Fazer doação</Text>
            </TouchableOpacity>
          </View>

          {/* Links Columns */}
          <View style={[styles.linksGrid, !isDesktop && styles.linksGridMobile]}>
            {/* Column 1 - Header Navigation Labels */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>Navegação</Text>
              <TouchableOpacity onPress={() => handleNav('/')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Home">
                <Text style={styles.linkItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/quem-somos')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Quem Somos">
                <Text style={styles.linkItemText}>Quem Somos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/projetos')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Projetos">
                <Text style={styles.linkItemText}>Projetos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/voluntarios')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Voluntários">
                <Text style={styles.linkItemText}>Voluntários</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/transparencia')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Transparência">
                <Text style={styles.linkItemText}>Transparência</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/contato')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Contato">
                <Text style={styles.linkItemText}>Contato</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/blog')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Blog">
                <Text style={styles.linkItemText}>Blog</Text>
              </TouchableOpacity>
            </View>

            {/* Column 2 - Projetos */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>Projetos</Text>
              <TouchableOpacity onPress={() => handleNav('/projetos?id=1')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver projeto Piscicultura Artesanal">
                <Text style={styles.linkItemText}>Piscicultura Artesanal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/projetos?id=2')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver projeto Catadores e Reciclagem">
                <Text style={styles.linkItemText}>Catadores e Reciclagem</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/projetos?id=3')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver projeto Paneiro do Mangal">
                <Text style={styles.linkItemText}>Paneiro do Mangal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/projetos?id=4')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver projeto Biblioteca do Chaú">
                <Text style={styles.linkItemText}>Biblioteca do Chaú</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/projetos')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver todas as iniciativas">
                <Text style={styles.linkItemText}>Ver todas iniciativas</Text>
              </TouchableOpacity>
            </View>

            {/* Column 3 - Institucional & Imprensa (Novas páginas exclusivas do menu do footer) */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>Institucional & Mídia</Text>
              <TouchableOpacity onPress={() => handleNav('/na-midia')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Na Mídia">
                <Text style={styles.linkItemText}>Na Mídia</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/marketing')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ir para Marketing e Marca">
                <Text style={styles.linkItemText}>Marketing & Marca</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/transparencia')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver Relatórios Anuais na página de Transparência">
                <Text style={styles.linkItemText}>Relatórios Anuais</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNav('/quem-somos')} style={styles.linkItem} accessibilityRole="link" accessibilityLabel="Ver Governança e Estatuto na página Quem Somos">
                <Text style={styles.linkItemText}>Governança & Estatuto</Text>
              </TouchableOpacity>
            </View>

            {/* Column 4 - Contato & Redes */}
            <View style={styles.linkCol}>
              <Text style={styles.linkColTitle}>Contato</Text>
              <TouchableOpacity onPress={() => handleNav('/contato')} style={styles.linkItem}>
                <Text style={styles.contactItemText}>Fale com a gente</Text>
              </TouchableOpacity>
              <Text style={styles.contactItemText}>contato@institutoina.org</Text>
              <Text style={styles.contactItemText}>WhatsApp: (91) 98804-9033</Text>
              <Text style={styles.contactItemText}>Belém, Pará — Amazônia, Brasil</Text>

              <View style={styles.socialRow}>
                <TouchableOpacity
                  style={styles.socialBadge}
                  accessibilityRole="button"
                  accessibilityLabel="Instagram do Instituto INÃ"
                >
                  <InstagramIcon size={16} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialBadge}
                  accessibilityRole="button"
                  accessibilityLabel="LinkedIn do Instituto INÃ"
                >
                  <LinkedInIcon size={16} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialBadge}
                  accessibilityRole="button"
                  accessibilityLabel="YouTube do Instituto INÃ"
                >
                  <YouTubeIcon size={16} color={colors.white} />
                </TouchableOpacity>
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
  linkItemTextHighlighted: {
    fontFamily: fonts.sansBold,
    fontSize: 13.5,
    color: colors.accent,
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
