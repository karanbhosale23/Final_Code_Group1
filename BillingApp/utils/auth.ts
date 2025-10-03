import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';

const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'user_data';

export interface UserData {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  role: string;

  // Merchant Profile Fields
  gstin?: string;
  phoneNumber2?: string;
  businessAddress?: string;
  pincode?: string;
  businessDescription?: string;
  state?: string;
  businessType?: string;
  businessCategory?: string;
  signatureBase64?: string;
  signatureUrl?: string;
}

// Store JWT token
export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Get JWT token
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Remove JWT token (logout)
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Store user data
export const storeUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Get user data
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Check if user is authenticated (simple token check for initial load)
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    const userData = await getUserData();

    // For initial app load, just check if both token and user data exist
    if (token && userData) {
      console.log('Token and user data found, assuming authenticated');
      return true;
    } else {
      console.log('No token or user data found, not authenticated');
      return false;
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Validate token against server (used for more thorough checks)
export const validateTokenWithServer = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    if (!token) {
      return false;
    }

    console.log('Validating token with server...');
    const response = await authenticatedFetch(`${BASE_URL}/api/v1/auth/validate`);

    if (response.ok) {
      console.log('Token validation successful');
      return true;
    } else if (response.status === 401 || response.status === 403) {
      console.log('Token validation failed - token invalid/expired');
      // Token is invalid/expired, remove it
      await removeToken();
      return false;
    } else {
      console.log('Server error during token validation:', response.status);
      // Server error, but token exists - assume authenticated for now
      return true;
    }
  } catch (error) {
    console.error('Error validating token with server:', error);
    // Network error - if we have a token and user data, assume authenticated
    const userData = await getUserData();
    return !!(await getToken() && userData);
  }
};

// Create authenticated fetch with JWT token
export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};