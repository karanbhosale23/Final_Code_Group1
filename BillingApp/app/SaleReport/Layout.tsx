import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your components
import DuplicateCredit from "./Components/DuplicateCredit";
import ExcelOptions from "./Components/ExcelOptions";
import FiltersByParty from "./Components/FiltersByParty";
import FiltersByTxns from "./Components/FiltersByTxns";
import PdfOptions from "./Components/PdfOptions";
import SaleDetails from "./Components/SaleDetails";
import SaleDetailsEdit from "./Components/SaleDetailsEdit";
import SaleReportMain from "./Components/SaleReportMain";
import SelectMonth from "./Components/SelectMonth";
import ShareTransaction from "./Components/ShareTransaction";

// Define the type for your stack parameters
export type RootStackParamList = {
  SaleReportMain: undefined;
  SaleDetails: { id: string }; // Example with params
  SaleDetailsEdit: { id: string };
  DuplicateCredit: undefined;
  ExcelOptions: undefined;
  FiltersByParty: undefined;
  FiltersByTxns: undefined;
  PdfOptions: undefined;
  SelectMonth: undefined;
  ShareTransaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Layout = () => {
  return (
    <Stack.Navigator
      initialRouteName="SaleReportMain"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="SaleReportMain" component={SaleReportMain} options={{ title: "Sales Report" }} />
      <Stack.Screen name="SaleDetails"component={SaleDetails} options={{ title: "Sale Details" }} />
      <Stack.Screen name="SaleDetailsEdit" component={SaleDetailsEdit} options={{ title: "Edit Sale" }}/>
      <Stack.Screen name="DuplicateCredit" component={DuplicateCredit} options={{ title: "Duplicate Credit" }}/>
      <Stack.Screen name="ExcelOptions" component={ExcelOptions} options={{ title: "Export to Excel" }}/>
      <Stack.Screen name="FiltersByParty" component={FiltersByParty} options={{ title: "Filter by Party" }}/>
      <Stack.Screen name="FiltersByTxns" component={FiltersByTxns} options={{ title: "Filter Transactions" }}/>
      <Stack.Screen name="PdfOptions" component={PdfOptions} options={{ title: "PDF Options" }}/>
      <Stack.Screen name="SelectMonth" component={SelectMonth} options={{ title: "Select Month" }}/>
      <Stack.Screen name="ShareTransaction" component={ShareTransaction} options={{ title: "Share Transaction" }}/>
    </Stack.Navigator>
  );
};

export default Layout;
