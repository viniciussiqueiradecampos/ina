/**
 * Helpers to map legacy tab-name strings (used throughout the existing
 * screen components) to Expo Router path strings, and vice-versa.
 */

export type TabName =
  | 'Home'
  | 'Início'
  | 'Quem Somos'
  | 'O Instituto'
  | 'Projetos'
  | 'Voluntários'
  | 'Pessoas'
  | 'Transparência'
  | 'Contato'
  | 'Doação'
  | 'Fazer doação'
  | 'Blog'
  | 'Na Mídia'
  | 'Mídia'
  | 'Marketing'
  | 'Marketing & Marca';

const TAB_TO_ROUTE: Record<string, string> = {
  'Home': '/',
  'Início': '/',
  'Quem Somos': '/quem-somos',
  'O Instituto': '/quem-somos',
  'Projetos': '/projetos',
  'Voluntários': '/voluntarios',
  'Pessoas': '/voluntarios',
  'Transparência': '/transparencia',
  'Contato': '/contato',
  'Doação': '/doacao',
  'Fazer doação': '/doacao',
  'Blog': '/blog',
  'Na Mídia': '/na-midia',
  'Mídia': '/na-midia',
  'Marketing': '/marketing',
  'Marketing & Marca': '/marketing',
};

const ROUTE_TO_TAB: Record<string, string> = {
  '/': 'Home',
  '/quem-somos': 'Quem Somos',
  '/projetos': 'Projetos',
  '/voluntarios': 'Voluntários',
  '/transparencia': 'Transparência',
  '/contato': 'Contato',
  '/doacao': 'Doação',
  '/blog': 'Blog',
  '/na-midia': 'Na Mídia',
  '/marketing': 'Marketing',
};

/** Convert a legacy tab name to an Expo Router href. */
export function tabToRoute(tab: string, projectId?: string): string {
  const route = TAB_TO_ROUTE[tab] ?? '/';
  if (route === '/projetos' && projectId) {
    return `/projetos?id=${projectId}`;
  }
  return route;
}

/** Convert an Expo Router pathname to the matching nav label. */
export function routeToTab(pathname: string): string {
  // Strip query string just in case
  const clean = pathname.split('?')[0];
  return ROUTE_TO_TAB[clean] ?? 'Home';
}
