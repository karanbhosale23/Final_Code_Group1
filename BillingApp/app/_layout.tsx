import React from 'react';
import { Stack } from 'expo-router';

export type RootStackParamList = {
  index: undefined;
  '(tabs)': undefined;
  'Authentication': undefined;
  'Authentication/LogIn': undefined;
  'User_Dashboard': undefined;
  'User_Dashboard/Profile': undefined;
  'User_Dashboard/Transaction': undefined;
  'SaleReportMain': undefined;
  // Add other routes as needed
};

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="Authentication" />
      <Stack.Screen name="User_Dashboard" />
      <Stack.Screen 
        name="SaleReportMain" 
        options={{
          title: 'Sales Report',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}
