import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { RootStackParamList } from '../Layout';

type SaleReportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SaleReportMain'>;

const SaleReport = () => {
  const navigation = useNavigation<SaleReportScreenNavigationProp>();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity >
        <Text style={styles.headerTitle}>Sale Report</Text>
        <TouchableOpacity style={styles.codeButton} onPress={() => navigation.navigate('SaleReportMain')}>
          <Feather name="code" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Date Filter Section */}
        <View style={styles.dateFilterContainer}>
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Sale Report</Text>
            <View style={styles.dateRow}>
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateLabel}>From</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateText}>01/09/2025</Text>
                  <MaterialIcons name="event" size={20} color="#4a90a4" />
                </View>
              </View>
              
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateLabel}>To</Text>
                <View style={styles.dateInput}>
                  <Text style={styles.dateText}>30/09/2025</Text>
                  <MaterialIcons name="event" size={20} color="#4a90a4" />
                </View>
              </View>
            </View>
            
            <View style={styles.quickFilters}>
              <TouchableOpacity style={[styles.quickFilterButton, styles.activeFilter]} onPress={() => navigation.navigate('SelectMonth')}>
                <Text style={styles.quickFilterText}>This Month</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickFilterButton}>
                <Text style={styles.quickFilterTextInactive}>Last Month</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Filters Applied Section */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Filters Applied:</Text>
          <TouchableOpacity style={styles.filtersButton}>
            <Text style={styles.filtersButtonText}>Filters</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Filter Tags */}
        <View style={styles.filterTags}>
          <View style={styles.filterTag}>
            <Text style={styles.filterTagText}>Txns Type - Sale & Cr. Note</Text>
          </View>
          <View style={styles.filterTag}>
            <Text style={styles.filterTagText}>Party - All Party</Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>No of Txns</Text>
            <Text style={styles.summaryValue}>1</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sale</Text>
            <Text style={styles.summaryValue}>₹ 100.00</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Balance Due</Text>
            <Text style={[styles.summaryValue, styles.balanceValue]}>₹ 0.00</Text>
          </View>
        </View>

        {/* Transaction List */}
        <View style={styles.transactionContainer}>
          <View style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.customerName}>Harshal Thakare</Text>
              <Text style={styles.transactionId}>SALE 1</Text>
            </View>
            <Text style={styles.transactionDate}>04 SEP, 25</Text>
            <View style={styles.transactionFooter}>
              <View style={styles.amountSection}>
                <Text style={styles.amountLabel}>Amount</Text>
                <Text style={styles.amountValue}>₹ 100.00</Text>
              </View>
              <View style={styles.amountSection}>
                <Text style={styles.amountLabel}>Balance</Text>
                <Text style={styles.amountValue}>₹ 0.00</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
  header: {
    backgroundColor: '#4a90a4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  codeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
  dateFilterContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  quickFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  quickFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#4a90a4',
    borderColor: '#4a90a4',
  },
  quickFilterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  quickFilterTextInactive: {
    color: '#666',
    fontSize: 12,
  },
  filtersSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  filtersButtonText: {
    fontSize: 12,
    color: '#666',
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterTagText: {
    fontSize: 12,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  balanceValue: {
    color: '#4a90a4',
  },
  transactionContainer: {
    paddingHorizontal: 16,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionId: {
    fontSize: 12,
    color: '#666',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountSection: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default SaleReport;
