import React from 'react';
import { useRouter } from 'expo-router';
import { MediaScreen } from '../src/screens/MediaScreen';
import { tabToRoute } from '../src/lib/navigation';

export default function NaMidiaRoute() {
  const router = useRouter();

  const navigate = (tab: string, projectId?: string) => {
    router.push(tabToRoute(tab, projectId) as any);
  };

  return <MediaScreen onNavigate={navigate} />;
}

