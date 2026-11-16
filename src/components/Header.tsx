import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Modal,
  Platform,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { InaLogo } from './InaLogo';
import { ArrowUpRight } from './icons/ArrowUpRight';

export const navItems = [
  'Início',
  'O Instituto',
  'Projetos',
  'Pessoas',
  'Blog',
  'Transparência',
  'Contato',
];

interface HeaderProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenDonate?: () => void;
}

export function Header({
  activeTab = 'Início',
  onNavigate,
  onOpenDonate,
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 990;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={[styles.header, { paddingHorizontal: isDesktop ? 61.44 : 20 }]}>
        {/* Brand / Official Logo */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSelectTab('Início')}
          style={styles.brandContainer}
          accessibilityRole="button"
          accessibilityLabel="INÃ — página inicial"
        >
          <InaLogo height={isDesktop ? 42 : 36} variant="original" />
        </TouchableOpacity>

        {/* Desktop Navigation */}
        {isDesktop ? (
          <View style={styles.navRow}>
            {navItems.filter((i) => i !== 'Início').map((item) => {
              const isActive = activeTab === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.7}
                  onPress={() => handleSelectTab(item)}
                  style={styles.navLink}
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
            onPress={onOpenDonate}
            style={styles.donateButton}
            accessibilityRole="button"
            accessibilityLabel="Quero doar"
          >
            <Text style={styles.donateText}>Quero doar</Text>
            <View style={styles.donateArrow}>
              <ArrowUpRight size={17} color={colors.white} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>

          {!isDesktop && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMobileMenuOpen(true)}
              style={styles.hamburgerButton}
              accessibilityLabel="Abrir menu"
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
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.mobileMenuContent}>
              <View style={styles.mobileMenuHeader}>
                <TouchableOpacity
                  onPress={() => handleSelectTab('Início')}
                  style={styles.brandContainer}
                >
                  <InaLogo height={34} variant="original" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMobileMenuOpen(false)}
                  style={styles.closeButton}
                  accessibilityLabel="Fechar menu"
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mobileNavList}>
                {navItems.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => handleSelectTab(item)}
                    style={styles.mobileNavItem}
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
                  if (onOpenDonate) onOpenDonate();
                }}
              >
                <Text style={styles.donateText}>Quero doar</Text>
                <View style={styles.donateArrow}>
                  <ArrowUpRight size={17} color={colors.white} strokeWidth={1.5} />
                </View>
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
    gap: 28,
  },
  navLink: {
    paddingVertical: 6,
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  navText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    lineHeight: 18,
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
    gap: 14,
    paddingLeft: 23,
    paddingRight: 18,
    paddingVertical: 13,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  donateText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.white,
    fontWeight: '700',
  },
  donateArrow: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
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
