import React from 'react';
import { useRouter } from 'expo-router';
import { DonationScreen } from '../src/screens/DonationScreen';
import { tabToRoute } from '../src/lib/navigation';

export default function DoacaoRoute() {
  const router = useRouter();

  const navigate = (tab: string, projectId?: string) => {
    router.push(tabToRoute(tab, projectId) as any);
  };

  return <DonationScreen onNavigate={navigate} />;
}

