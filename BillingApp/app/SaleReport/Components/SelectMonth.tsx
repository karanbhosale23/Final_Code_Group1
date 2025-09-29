import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const ThisMonth = () => {
  const navigation = useNavigation();
  
  // Mock data for transactions
  const transactions = [
    { id: 1, customer: 'Harshal Thakare', type: 'SALE 1', date: '04 SEP, 25', amount: '₹ 100.00', balance: '₹ 0.00' },
    // Add more transactions as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4a90a4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sale Report</Text>
        <TouchableOpacity style={styles.codeButton}>
          <Feather name="code" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Date Filter */}
      <View style={styles.dateFilterContainer}>
        <View style={styles.dateRangeContainer}>
          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>From</Text>
            <Text style={styles.dateText}>01/09/2025</Text>
          </View>
          <View style={styles.dateDivider} />
          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>To</Text>
            <Text style={styles.dateText}>30/09/2025</Text>
          </View>
          <MaterialIcons name="event" size={20} color="#4a90a4" />
        </View>
        
        <View style={styles.monthSelector}>
          <Text style={styles.monthText}>This Month</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#4a90a4" />
        </View>
      </View>

      {/* Quick Filters */}
      <View style={styles.quickFilters}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={[styles.filterButtonText, styles.activeFilterText]}>This Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Last Month</Text>
        </TouchableOpacity>
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
          <MaterialCommunityIcons name="filter-outline" size={20} color="#4a90a4" />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
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
          <Text style={[styles.summaryValue, styles.positiveBalance]}>₹ 0.00</Text>
        </View>
      </View>
      

      {/* Transaction List */}
      <ScrollView style={styles.transactionList}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.customerName}>{transaction.customer}</Text>
              <View>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
            <View style={styles.transactionFooter}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Amount</Text>
                <Text style={[styles.amountValue, transaction.amount.startsWith('-') ? null : styles.positiveAmount]}>
                  {transaction.amount}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Balance</Text>
                <Text style={[styles.amountValue, transaction.balance.startsWith('-') ? null : styles.positiveAmount]}>
                  {transaction.balance}
                </Text>
              </View>
              <TouchableOpacity style={{ padding: 8, marginLeft: 8 }}>
                <MaterialIcons name="more-vert" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontFamily: 'Inter-SemiBold',
  },
  codeButton: {
    padding: 8,
  },
  codeIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  
  // Date Filter Styles
  dateFilterContainer: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  dateInput: {
    flex: 1,
    padding: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  dateDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
  },
  monthText: {
    fontSize: 14,
    color: '#000',
    marginRight: 4,
  },
  downArrow: {
    width: 16,
    height: 16,
  },
  
  // Quick Filters
  quickFilters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#4a90a4',
    borderColor: '#4a90a4',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  
  // Filters Applied
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  filtersAppliedText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  filterTags: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  filterTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  filterTagText: {
    fontSize: 12,
    color: '#666',
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  
  // Summary Cards
  summaryContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
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
    fontWeight: '600',
    color: '#000',
  },
  positiveBalance: {
    color: '#4CAF50',
  },
  // Transaction List
  transactionList: {
    flex: 1,
    padding: 16,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
  customerName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  transactionType: {
    fontSize: 11,
    color: '#666',
  },
  transactionDate: {
    fontSize: 11,
    color: '#666',
    textAlign: 'right',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  positiveAmount: {
    color: '#4CAF50',
  },
});

export default ThisMonth;
