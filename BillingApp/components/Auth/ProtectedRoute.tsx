import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isAuthenticated } from '../../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = "../Authentication/LogIn" 
}) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const isAuth = await isAuthenticated();
      setAuthenticated(isAuth);
      
      if (!isAuth) {
        router.replace(redirectTo as any);
      }
    } catch (error) {
      console.log("Authentication check error:", error);
      router.replace(redirectTo as any);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!authenticated) {
    return null; // Will redirect, so don't render anything
  }

  return <>{children}</>;
};

export default ProtectedRoute;
