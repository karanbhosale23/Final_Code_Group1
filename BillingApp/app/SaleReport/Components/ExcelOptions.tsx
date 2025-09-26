import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ExcelOptions = () => {
  const navigation = useNavigation();
  
  // Sample data
  const transaction = {
    id: 'SALE 1',
    customer: 'Harshal Thakare',
    date: '04 SEP, 25',
    amount: '₹ 100.00',
    balance: '₹ 0.00',
    transactionCount: '1'
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sale Report</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        {/* Date Range */}
        <View style={styles.dateRangeContainer}>
          <Text style={styles.dateRangeText}>01/09/2025       TO      30/09/2025</Text>
        </View>
        
        {/* Quick Filters */}
        <View style={styles.quickFilters}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={[styles.filterButtonText, styles.activeFilterText]}>This Month</Text>
          </TouchableOpacity>
        </View>
        
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>No of Txns</Text>
            <Text style={styles.summaryValue}>{transaction.transactionCount}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sale</Text>
            <Text style={styles.summaryValue}>{transaction.amount}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Balance Due</Text>
            <Text style={styles.summaryValue}>{transaction.balance}</Text>
          </View>
        </View>
        
        {/* Transaction Item */}
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionId}>{transaction.id}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text style={styles.customerName}>{transaction.customer}</Text>
          <View style={styles.amountRow}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount</Text>
              <Text style={styles.amountValue}>{transaction.amount}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Balance</Text>
              <Text style={styles.amountValue}>{transaction.balance}</Text>
            </View>
            <MaterialIcons name="more-vert" size={24} color="#666" />
          </View>
        </View>
        
        {/* Filters Applied */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersAppliedText}>Filters Applied:</Text>
          <View style={styles.filterTags}>
            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>Txns Type - Sale & Cr. Note</Text>
            </View>
            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>Party - All Party</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={20} color="#4A90E2" />
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90a4',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    marginRight: 24,
  },
  headerRight: {
    width: 24,
  },
  
  // Date Range
  dateRangeContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateRangeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  
  // Quick Filters
  quickFilters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#4a90a4',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  
  // Summary Container
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  
  // Transaction Card
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionId: {
    fontSize: 14,
    color: '#4a90a4',
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  customerName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  
  // Filters
  filtersContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  filtersAppliedText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterTag: {
    backgroundColor: '#f0f7fa',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filterTagText: {
    fontSize: 12,
    color: '#4a90a4',
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#666',
  },
});

export default ExcelOptions;
