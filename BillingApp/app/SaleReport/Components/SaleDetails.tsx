import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const SaleDetails = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sale</Text>
        <View style={styles.headerIcons}>
          <MaterialIcons name="more-vert" size={24} color="#fff" />
          <Text style={styles.headerIconText}>...</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Invoice Info */}
        <View style={styles.invoiceInfo}>
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.invoiceLabel}>Invoice No.</Text>
              <Text style={styles.invoiceValue}>1</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.invoiceLabel}>Date</Text>
              <Text style={styles.invoiceValue}>04/09/2025</Text>
            </View>
          </View>

          {/* Customer Info */}
          <View style={styles.customerInfo}>
            <Text style={styles.customerLabel}>Customer Name *</Text>
            <View style={styles.customerField}>
              <Text style={styles.customerValue}>Harshal Thakare</Text>
              <Text style={styles.partyBalance}>
                Party Balance: <Text style={styles.balanceAmount}>₹ 0.00</Text>
              </Text>
            </View>

            <Text style={styles.phoneLabel}>Phone Number</Text>
            <View style={styles.phoneField}>
              <Text style={styles.phoneValue}>+91 1234567890</Text>
              <MaterialIcons name="phone" size={20} color="#4a90a4" />
            </View>
          </View>

          {/* Amount Details */}
          <View style={styles.amountDetails}>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Total Amount</Text>
              <Text style={styles.amountValue}>₹ 100.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Received</Text>
              <Text style={styles.amountValue}>₹ 100.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.amountRow}>
              <Text style={[styles.amountLabel, styles.balanceDue]}>Balance Due</Text>
              <Text style={[styles.amountValue, styles.balanceAmount]}>₹ 0.00</Text>
            </View>
          </View>

          {/* Payment Type */}
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Type</Text>
            <View style={styles.paymentTypeSelector}>
              <Text style={styles.paymentTypeText}>Cash</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
            </View>
            <TouchableOpacity style={styles.addPaymentButton}>
              <Text style={styles.plusIcon}>+</Text>
              <Text style={styles.addPaymentText}>Add Payment Type</Text>
            </TouchableOpacity>
          </View>

          {/* State of Supply */}
          <View style={styles.stateSection}>
            <Text style={styles.sectionTitle}>State of Supply</Text>
            <View style={styles.stateSelector}>
              <Text style={styles.stateText}>Select State</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
            </View>
          </View>

          {/* Notes */}
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.notesInput}>
              <Text style={styles.notesPlaceholder}>Add Note</Text>
              <MaterialIcons name="note-add" size={24} color="#4a90a4" />
            </View>
          </View>

          {/* Documents */}
          <View style={styles.documentsSection}>
            <View style={styles.documentsHeader}>
              <Text style={styles.sectionTitle}>Documents</Text>
              <Text style={styles.internetNote}>Internet is required to upload</Text>
            </View>
            <TouchableOpacity style={styles.addDocumentButton}>
              <MaterialIcons name="attach-file" size={24} color="#4a90a4" />
              <Text style={styles.addDocumentText}>Add Document</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color="#fff" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    marginBottom: 80, // Space for action buttons
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 8,
  },

  // Invoice Info
  invoiceInfo: {
    padding: 16,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  invoiceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  invoiceValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },

  // Customer Info
  customerInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  customerLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  customerField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  customerValue: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  partyBalance: {
    fontSize: 12,
    color: '#666',
  },
  balanceAmount: {
    color: '#c92323',
    fontWeight: '500',
  },
  phoneLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  phoneField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
  },
  phoneValue: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },

  // Amount Details
  amountDetails: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 15,
    color: '#666',
  },
  amountValue: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  balanceDue: {
    color: '#028a06',
  },

  // Payment Section
  paymentSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  paymentTypeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
  },
  paymentTypeText: {
    fontSize: 15,
    color: '#000',
  },
  dropdownIcon: {
    width: 14,
    height: 8,
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 20,
    color: '#2576e0',
    marginRight: 8,
    fontWeight: 'bold',
  },
  addPaymentText: {
    fontSize: 17,
    color: '#2576e0',
    fontWeight: '500',
  },

  // State Section
  stateSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  stateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
  },
  stateText: {
    fontSize: 15,
    color: '#666',
  },

  // Notes Section
  notesSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    height: 100,
    padding: 12,
    justifyContent: 'center',
  },
  notesPlaceholder: {
    fontSize: 15,
    color: '#ccc',
  },
  notesIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 20,
    height: 20,
  },

  // Documents Section
  documentsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  documentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  internetNote: {
    fontSize: 10,
    color: '#999',
  },
  addDocumentButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 6,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  addDocumentText: {
    fontSize: 15,
    color: '#999',
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2576e0',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#fff',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default SaleDetails;
