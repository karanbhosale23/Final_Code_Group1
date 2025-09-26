
import React from 'react';
import { Stack } from 'expo-router';

export default function UserDashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Transaction" />
      <Stack.Screen name="Profile" />
      <Stack.Screen name="AdminPage" />
    </Stack>
  );
}