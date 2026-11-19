import React from 'react';
import { useRouter } from 'expo-router';
import { HomeScreen } from '../src/screens/HomeScreen';
import { tabToRoute } from '../src/lib/navigation';

export default function HomeRoute() {
  const router = useRouter();

  const navigate = (tab: string, projectId?: string) => {
    router.push(tabToRoute(tab, projectId) as any);
  };

  return (
    <HomeScreen
      onNavigate={navigate}
      onOpenDonate={() => router.push('/doacao')}
    />
  );
}

