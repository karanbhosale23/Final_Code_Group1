
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Authentication/LogIn';
import SignUp from '../Authentication/SignUp';
import Transaction from '../User_Dashboard/Transaction';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Transaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabIndex() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Transaction" component={Transaction} />
    </Stack.Navigator>
  );
}