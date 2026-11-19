import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Modal,
  Platform,
  Image,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors, fonts } from '../constants/theme';
import { tabToRoute, routeToTab } from '../lib/navigation';

const inaLogoNova = require('../../assets/logo-ina-nova.webp');
import { DonationHeartIcon } from './icons/DonationHeartIcon';

export const navItems = [
  'Home',
  'Quem Somos',
  'Projetos',
  'Voluntários',
  'Transparência',
  'Contato',
  'Blog',
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = routeToTab(pathname);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 990;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tab: string) => {
    router.push(tabToRoute(tab) as any);
    setMobileMenuOpen(false);
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={[styles.header, { paddingHorizontal: isDesktop ? 61.44 : 20 }]}>
        {/* Brand / Official Logo */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSelectTab('Home')}
          style={styles.brandContainer}
          accessibilityRole="button"
          accessibilityLabel="Instituto Nova Amazônia — Voltar para a página inicial"
        >
          <Image
            source={inaLogoNova}
            style={{ width: isDesktop ? 110 : 90, height: isDesktop ? 62 : 50 }}
            resizeMode="contain"
            accessible={false}
            importantForAccessibility="no"
          />
        </TouchableOpacity>

        {/* Desktop Navigation */}
        {isDesktop ? (
          <View style={styles.navRow} accessibilityRole="tablist">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.7}
                  onPress={() => handleSelectTab(item)}
                  style={styles.navLink}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`Aba ${item}${isActive ? ', página atual selecionada' : ''}`}
                >
                  <Text style={[styles.navText, isActive && styles.navTextActive]}>
                    {item}
                  </Text>
                  {isActive && <View style={styles.navActiveIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}

        {/* Actions (Donate Button + Mobile Hamburger) */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/doacao')}
            style={styles.donateButton}
            accessibilityRole="button"
            accessibilityLabel="Fazer doação"
          >
            <View style={styles.donateIcon}>
              <DonationHeartIcon size={18} color={colors.white} />
            </View>
            <Text style={styles.donateText}>Fazer doação</Text>
          </TouchableOpacity>

          {!isDesktop && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMobileMenuOpen(true)}
              style={styles.hamburgerButton}
              accessibilityRole="button"
              accessibilityLabel="Abrir menu de navegação"
              accessibilityState={{ expanded: mobileMenuOpen }}
            >
              <View style={styles.hamburgerBar} />
              <View style={styles.hamburgerBar} />
              <View style={styles.hamburgerBar} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Mobile Menu Modal */}
      {!isDesktop && (
        <Modal
          visible={mobileMenuOpen}
          animationType="fade"
          transparent
          accessibilityViewIsModal={true}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.mobileMenuContent}>
              <View style={styles.mobileMenuHeader}>
                <TouchableOpacity
                  onPress={() => handleSelectTab('Home')}
                  style={styles.brandContainer}
                  accessibilityRole="button"
                  accessibilityLabel="Voltar para início"
                >
                  <Image
                    source={inaLogoNova}
                    style={{ width: 61, height: 34 }}
                    resizeMode="contain"
                    accessible={false}
                    importantForAccessibility="no"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMobileMenuOpen(false)}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar menu de navegação"
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mobileNavList} accessibilityRole="menu">
                {navItems.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => handleSelectTab(item)}
                    style={styles.mobileNavItem}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: activeTab === item }}
                    accessibilityLabel={`${item}${activeTab === item ? ', selecionado' : ''}`}
                  >
                    <Text
                      style={[
                        styles.mobileNavText,
                        activeTab === item && styles.mobileNavTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.donateButton, styles.mobileDonateButton]}
                onPress={() => {
                  setMobileMenuOpen(false);
                  router.push('/doacao');
                }}
              >
                <View style={styles.donateIcon}>
                  <DonationHeartIcon size={18} color={colors.white} />
                </View>
                <Text style={styles.donateText}>Fazer doação</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    backgroundColor: colors.background,
    zIndex: 10,
  },
  header: {
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1536,
    alignSelf: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandTextColumn: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 25,
    letterSpacing: 2.24,
    color: colors.primary,
    fontWeight: '400',
  },
  brandSubtitle: {
    fontFamily: fonts.sansBold,
    fontSize: 7,
    lineHeight: 8,
    letterSpacing: 1.12,
    textTransform: 'uppercase',
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  navLink: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  navText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.15,
    color: colors.primary,
    fontWeight: '600',
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  navActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  donateButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 18,
    paddingRight: 20,
    paddingVertical: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  donateIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donateText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.white,
    fontWeight: '700',
  },
  hamburgerButton: {
    padding: 8,
    gap: 4,
  },
  hamburgerBar: {
    width: 22,
    height: 2.5,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  mobileMenuContent: {
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 56 : 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 20,
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.primary,
  },
  mobileNavList: {
    gap: 16,
    paddingVertical: 12,
  },
  mobileNavItem: {
    paddingVertical: 8,
  },
  mobileNavText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    color: colors.primary,
  },
  mobileNavTextActive: {
    fontFamily: fonts.sansBold,
    color: colors.primary,
  },
  mobileDonateButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 8,
  },
});
