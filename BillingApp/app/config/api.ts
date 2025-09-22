// app/config/api.ts
// Centralized, platform-aware API base URL
import { Platform } from 'react-native';

// Helper to detect if we're running on the web
const isWeb = Platform.OS === 'web';

// You can tweak these for your environment
// - Web & iOS simulator work well with localhost
// - Android emulator needs 10.0.2.2 to reach host machine's localhost
// - Physical devices on same Wi-Fi should use your machine's LAN IP
const BASE_URL = (() => {
  if (isWeb) return 'http://localhost:8080';
  if (Platform.OS === 'android') return 'http://10.0.2.2:8080';
  // iOS simulator or others
  return 'http://localhost:8080';
})();

export { BASE_URL };
