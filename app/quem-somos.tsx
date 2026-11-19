import React from 'react';
import { useRouter } from 'expo-router';
import { InstituteScreen } from '../src/screens/InstituteScreen';
import { tabToRoute } from '../src/lib/navigation';

export default function QuemSomosRoute() {
  const router = useRouter();

  const navigate = (tab: string, projectId?: string) => {
    router.push(tabToRoute(tab, projectId) as any);
  };

  return <InstituteScreen onNavigate={navigate} />;
}

