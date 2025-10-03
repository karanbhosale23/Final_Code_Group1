// config/api.ts
// Centralized, platform-aware API base URL (kept outside app/ to avoid being treated as a route)
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const BASE_URL = (() => {
  if (isWeb) return 'http://localhost:8080';
  if (Platform.OS === 'android') return 'http://10.0.2.2:8080';
  return 'http://localhost:8080';
})();


