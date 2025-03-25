export const ROUTES_NORMALIZER = {
  weltweit: 'worldwide',
  worldwide: 'worldwide',
  'pelo-mundo': 'worldwide',
  lokal: 'local',
  local: 'local',
} as const;

export type RouteKey = keyof typeof ROUTES_NORMALIZER;
export type NormalizedRoute = (typeof ROUTES_NORMALIZER)[RouteKey];
