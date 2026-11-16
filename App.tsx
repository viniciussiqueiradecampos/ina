import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';

import { colors } from './src/constants/theme';
import { Header } from './src/components/Header';
import { Footer } from './src/components/Footer';
import { DonationModal } from './src/components/DonationModal';

import { HomeScreen } from './src/screens/HomeScreen';
import { InstituteScreen } from './src/screens/InstituteScreen';
import { ProjectsScreen } from './src/screens/ProjectsScreen';
import { PeopleScreen } from './src/screens/PeopleScreen';
import { BlogScreen } from './src/screens/BlogScreen';
import { TransparencyScreen } from './src/screens/TransparencyScreen';
import { ContactScreen } from './src/screens/ContactScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const [currentTab, setCurrentTab] = useState<string>('Início');
  const [donateOpen, setDonateOpen] = useState<boolean>(false);
  const scrollRef = useRef<any>(null);

  // Navigate and scroll to top
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // Inject web fonts and dynamic CSS micro-interactions / marquee animation
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const fontId = 'google-fonts-ina';
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;600;700&display=swap';
        document.head.appendChild(link);
      }

      // Add reset/global styles with smooth animations & dynamic marquee
      const styleId = 'global-styles-ina';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: ${colors.background};
          scroll-behavior: smooth;
        }

        /* Subtle interactive transitions on buttons & links */
        [role="button"], button, a {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, filter 0.2s ease !important;
        }
        [role="button"]:hover, button:hover {
          filter: brightness(1.05);
          transform: translateY(-2px);
        }
        [role="button"]:active, button:active {
          transform: translateY(0px) scale(0.98);
        }

        /* Card interactive hover elevate */
        div[role="button"]:hover, .ina-hoverable:hover {
          transform: translateY(-3px) scale(1.008);
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        /* Continuous Infinite Logo Marquee Animation */
        @keyframes inaMarqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ina-marquee {
          display: flex !important;
          animation: inaMarqueeLoop 32s linear infinite !important;
          will-change: transform;
        }
        .ina-marquee:hover {
          animation-play-state: paused !important;
        }
      `;
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'O Instituto':
        return <InstituteScreen onNavigate={handleNavigate} />;
      case 'Projetos':
        return <ProjectsScreen onSelectDonate={() => setDonateOpen(true)} />;
      case 'Pessoas':
        return <PeopleScreen />;
      case 'Blog':
        return <BlogScreen />;
      case 'Transparência':
        return <TransparencyScreen />;
      case 'Contato':
        return <ContactScreen />;
      case 'Início':
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenDonate={() => setDonateOpen(true)}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Navigation Header */}
        <Header
          activeTab={currentTab}
          onNavigate={handleNavigate}
          onOpenDonate={() => setDonateOpen(true)}
        />

        {/* Dynamic Screen View */}
        {renderActiveScreen()}

        {/* Global Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenDonate={() => setDonateOpen(true)}
        />
      </ScrollView>

      {/* Interactive Donation Modal */}
      <DonationModal
        visible={donateOpen}
        onClose={() => setDonateOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
