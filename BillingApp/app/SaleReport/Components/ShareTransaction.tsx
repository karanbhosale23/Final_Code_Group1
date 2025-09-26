import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

type RootStackParamList = {
  ShareTransaction: undefined;
};

type ShareTransactionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShareTransaction'>;

const ShareTransaction = () => {
  const navigation = useNavigation<ShareTransactionScreenNavigationProp>();

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
        <Text style={styles.headerTitle}>Share Transaction</Text>
        <View style={styles.headerIcons}>
          <MaterialIcons name="more-vert" size={24} color="#000" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Transaction Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Invoice Number</Text>
              <Text style={styles.detailValue}>INV-001</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>04/09/2025</Text>
            </View>
          </View>

          {/* Customer Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name</Text>
              <Text style={styles.detailValue}>Harshal Thakare</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>+91 1234567890</Text>
            </View>
          </View>

          {/* Amount Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount Details</Text>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Total Amount</Text>
              <Text style={styles.amountValue}>₹ 100.00</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Received</Text>
              <Text style={styles.amountValue}>₹ 100.00</Text>
            </View>
            <View style={[styles.amountRow, { marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 }]}>
              <Text style={[styles.amountLabel, { fontWeight: '600' }]}>Balance Due</Text>
              <Text style={[styles.amountValue, { color: '#028a06' }]}>₹ 0.00</Text>
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Type</Text>
              <View style={styles.paymentTypeContainer}>
                <Text style={styles.paymentTypeText}>Cash</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>State of Supply</Text>
              <View style={styles.stateContainer}>
                <Text style={styles.stateText}>Select State</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
              </View>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesPlaceholder}>Add Note</Text>
              <Feather name="edit-2" size={20} color="#666" />
            </View>
          </View>

          {/* Documents */}
          <View style={styles.section}>
            <View style={styles.documentsHeader}>
              <Text style={styles.sectionTitle}>Documents</Text>
              <Text style={styles.internetNote}>Internet is required to upload</Text>
            </View>
            <View style={styles.documentsContainer}>
              <MaterialCommunityIcons name="file-document-outline" size={40} color="#666" />
              <Text style={styles.uploadText}>Add Document</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.shareButton]}
          onPress={() => {}}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 100, // Space for action buttons
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTypeText: {
    fontSize: 14,
    color: '#000',
    marginRight: 8,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    minHeight: 100,
    justifyContent: 'center',
  },
  notesPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  notesIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 20,
    height: 20,
  },
  documentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  internetNote: {
    fontSize: 10,
    color: '#999',
  },
  documentsContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  uploadText: {
    color: '#999',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  shareButton: {
    backgroundColor: '#4a90a4',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ShareTransaction;
