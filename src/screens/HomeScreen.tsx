import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { colors } from '../constants/theme';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SupportersSection } from '../components/SupportersSection';
import { StatsSection } from '../components/StatsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { FAQSection } from '../components/FAQSection';
import { TransparencySection } from '../components/TransparencySection';
import { CTASection } from '../components/CTASection';

interface HomeScreenProps {
  onNavigate?: (tab: string, projectId?: string) => void;
  onOpenDonate?: () => void;
}

export function HomeScreen({ onNavigate, onOpenDonate }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} onOpenDonate={onOpenDonate} />

      {/* 2. About Section (with CTA inside the green banner & Amazonian texture) */}
      <AboutSection onNavigate={onNavigate} onOpenDonate={onOpenDonate} />

      {/* 3. Supporters / Partners Section (logos pass automatically) */}
      <SupportersSection onBecomeSupporter={() => onNavigate && onNavigate('Contato')} />

      {/* 4. Stats & Bento Grid (with subtle Amazonian texture) */}
      <StatsSection onOpenDonate={onOpenDonate} onNavigate={onNavigate} />

      {/* 5. Projects Section */}
      <ProjectsSection onNavigate={onNavigate} />

      {/* 6. Social Proof Section (carrossel de opiniões e CTAs) */}
      <SocialProofSection onOpenDonate={onOpenDonate} onNavigate={onNavigate} />

      {/* 7. FAQ Section */}
      <FAQSection />

      {/* 8. Transparency Section (compact, direct, without 04 column) */}
      <TransparencySection onNavigate={onNavigate} />

      {/* 9. Call To Action Impact Section */}
      <CTASection onOpenDonate={onOpenDonate} onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
  },
});
