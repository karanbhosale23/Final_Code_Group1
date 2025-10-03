import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { isAuthenticated } from '../utils/auth';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('Checking authentication...');

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      setStatus('Checking authentication...');
      const authenticated = await isAuthenticated();

      if (authenticated) {
        setStatus('Authenticated! Redirecting to homepage...');
        // User is already logged in, go to Transaction page
        router.replace('/User_Dashboard/Transaction');
      } else {
        setStatus('Not authenticated. Redirecting to login...');
        // User not logged in, go to Login page
        router.replace('/Authentication/LogIn');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setStatus('Authentication check failed. Redirecting to login...');
      // If error checking auth, default to login
      router.replace('/Authentication/LogIn');
    } finally {
      // Add a small delay to show the status message
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // Show loading while checking authentication
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#c6040a" />
      <Text style={styles.loadingText}>{status}</Text>
      <Text style={styles.appName}>Retail Billing System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  appName: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c6040a',
  },
});
