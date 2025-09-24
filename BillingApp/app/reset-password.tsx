import React from 'react';
import { Redirect, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

// Alias route so /reset-password works from email links
export default function ResetPasswordAlias() {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const rootNavigationState = useRootNavigationState();
  // Wait until the Root Layout mounts before navigating to avoid errors on web
  if (!rootNavigationState?.key) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Preparing...</Text>
      </View>
    );
  }

  // When ready, render a Redirect with typed href to avoid 404 flicker and type errors
  return (
    <Redirect
      href={{
        pathname: '/reset-password',
        params: typeof token === 'string' && token ? { token } : undefined,
      }}
    />
  );
}

