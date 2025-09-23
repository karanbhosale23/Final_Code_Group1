import { NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabParamList> | undefined;
  '+not-found': undefined;
  'SaleReport': undefined;
};

type TabParamList = {
  index: undefined;
  explore: undefined;
  Transaction: undefined;
  SaleReport: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type { RootStackParamList, TabParamList };
