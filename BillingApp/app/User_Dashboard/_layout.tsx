
// import Items from '../Inventory/items';
// import Add_items from '../Inventory/add_items';


// export default function HomeScreen() {
//   return (
//     <Items />
//     // <Add_items />
//   );
// }

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import SaleReport from '../SaleReport/Components/SaleReportMain';
import TabsLayout from '../(tabs)/index';

// Define all possible screen names and their parameters
export type RootStackParamList = {
  saleReport: undefined;
  '(tabs)': undefined;
  '+not-found': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Simple not found component
function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page not found</Text>
    </View>
  );
}

export default function TabUserDashboard() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="saleReport" component={SaleReport} />
      <Stack.Screen name="(tabs)" component={TabsLayout} options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}