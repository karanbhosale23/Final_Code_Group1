
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
import LogIn from '../Authentication/LogIn';
import SignUp from '../Authentication/SignUp';
import Transaction from '../User_Dashboard/Transaction';
import SaleReport from '../SaleReport/Components/SaleReportMain';

export type RootStackParamList = {
  "login": undefined;
  "signUp": undefined;
  "transaction": undefined;
  "saleReport": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabIndex() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="login" component={LogIn} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="transaction" component={Transaction} />
      <Stack.Screen name="saleReport" component={SaleReport} />
    </Stack.Navigator>
  );
}