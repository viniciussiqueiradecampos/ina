import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';

import { colors, fonts } from '../src/constants/theme';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const scrollRef = useRef<any>(null);
  const pathname = usePathname();

  // Scroll to top whenever the route changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [pathname]);

  // Inject web fonts + global CSS micro-interactions (web only)
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
        ::-webkit-scrollbar { width: 8px; height: 0px; }
        * { scrollbar-width: thin; }

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

        :focus-visible {
          outline: 3px solid #143d2b !important;
          outline-offset: 3px !important;
        }
        [role="button"]:focus-visible, button:focus-visible, a:focus-visible,
        [tabindex]:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 3px solid #143d2b !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 5px rgba(20, 61, 43, 0.22) !important;
        }

        .ina-skip-link {
          position: absolute; top: -100px; left: 16px;
          background: #143d2b; color: #ffffff;
          padding: 12px 22px; z-index: 999999;
          font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 14px;
          border-radius: 8px; text-decoration: none;
          transition: top 0.2s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .ina-skip-link:focus { top: 16px; outline: 3px solid #ffffff !important; }

        div[role="button"]:hover, .ina-hoverable:hover {
          transform: translateY(-3px) scale(1.008);
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @keyframes inaMarqueeLoop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ina-marquee {
          display: flex !important;
          animation: inaMarqueeLoop 32s linear infinite !important;
          will-change: transform;
        }
        .ina-marquee:hover { animation-play-state: paused !important; }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .ina-marquee { animation: none !important; }
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Skip to content — accessibility (WCAG 2.4.1) */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => scrollRef.current?.scrollTo({ y: 90, animated: true })}
        style={styles.skipLink}
        accessibilityRole="link"
        accessibilityLabel="Pular para o conteúdo principal"
      >
        <Text style={styles.skipLinkText}>Pular para o conteúdo principal</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Global Navigation Header */}
        <Header />

        {/* Active Route Content */}
        <View nativeID="main-content" accessibilityRole="main">
          <Slot />
        </View>

        {/* Global Footer */}
        <Footer />
      </ScrollView>
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
  skipLink: {
    position: 'absolute',
    top: -100,
    left: 20,
    zIndex: 99999,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    ...Platform.select({
      web: { transition: 'top 0.2s ease' } as any,
    }),
  },
  skipLinkText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.white,
    fontWeight: '700',
  },
});

