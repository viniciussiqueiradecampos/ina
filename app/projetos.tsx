import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ProjectsScreen } from '../src/screens/ProjectsScreen';
import { tabToRoute } from '../src/lib/navigation';

export default function ProjetosRoute() {
  const router = useRouter();
  // Support /projetos?id=1 for linking directly to a project detail
  const { id } = useLocalSearchParams<{ id?: string }>();

  const navigate = (tab: string, projectId?: string) => {
    router.push(tabToRoute(tab, projectId) as any);
  };

  return (
    <ProjectsScreen
      initialProjectId={id ?? null}
      onSelectDonate={() => router.push('/doacao')}
      onNavigate={navigate}
    />
  );
}

