import React from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function ResetPasswordPage() {
  const { token } = useLocalSearchParams<{ token?: string }>();
  
  if (!token) {
    return <Redirect href="/" />;  // Redirect to home if no token
  }

  return (
    <Redirect
      href={{
        pathname: '/Authentication/ResetPasswordScreen',
        params: { token },
      }}
    />
  );
}

