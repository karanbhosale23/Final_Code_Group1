import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { isAuthenticated } from '../utils/auth';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        // User is already logged in, go to Transaction page
        router.replace('/User_Dashboard/Transaction');
      } else {
        // User not logged in, go to Login page
        router.replace('/Authentication/LogIn');
      }
    } catch (error) {
      // If error checking auth, default to login
      router.replace('/Authentication/LogIn');
    }
  };

  // Show loading while checking authentication
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}
