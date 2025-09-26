import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Authentication" options={{ headerShown: false }} />
      <Stack.Screen name="User_Dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
