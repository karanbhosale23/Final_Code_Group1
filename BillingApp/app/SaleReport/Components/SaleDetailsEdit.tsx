import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

const SaleDetailsEdit = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Sale</Text>
        <View style={styles.headerIcons}>
          <Feather name="more-vertical" size={24} color="#000" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Invoice Number</Text>
            <Text style={[styles.inputField, {color: '#000'}]}>1</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.inputField, {flex: 1, color: '#000'}]}>04/09/2025</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Customer Name *</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.inputField, {flex: 1, color: '#000'}]}>Harshal Thakare</Text>
              <MaterialCommunityIcons name="account-edit" size={24} color="#4a90a4" style={{marginLeft: 8}} />
            </View>
            <Text style={{fontSize: 12, color: '#666', marginTop: 4}}>Party Balance: <Text style={{color: '#c92323'}}>₹ 0.00</Text></Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.inputField, {flex: 1, color: '#000'}]}>+91 1234567890</Text>
            </View>
          </View>
          
          <View style={{marginTop: 16}}>
            <Text style={styles.sectionTitle}>Amount Details</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
              <Text style={{color: '#666'}}>Total Amount</Text>
              <Text style={{fontWeight: '600'}}>₹ 100.00</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
              <Text style={{color: '#666'}}>Received</Text>
              <Text style={{fontWeight: '600'}}>₹ 100.00</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
              <Text style={{color: '#028a06', fontWeight: '600'}}>Balance Due</Text>
              <Text style={{color: '#028a06', fontWeight: '600'}}>₹ 0.00</Text>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Payment Type</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.inputField, {flex: 1, color: '#000'}]}>Cash</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>State of Supply</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.inputField, {flex: 1, color: '#666'}]}>Select State</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <View style={[styles.inputField, {height: 100, justifyContent: 'center'}]}>
              <Text style={{color: '#999'}}>Add Note</Text>
              <MaterialIcons name="note-add" size={24} color="#4a90a4" style={{position: 'absolute', right: 12, top: 12}} />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
              <Text style={styles.inputLabel}>Documents</Text>
              <Text style={{fontSize: 10, color: '#999'}}>Internet is required to upload</Text>
            </View>
            <View style={[styles.inputField, {height: 100, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed'}]}>
              <Feather name="upload" size={32} color="#4a90a4" style={{marginBottom: 8}} />
              <Text style={{color: '#999'}}>Add Document</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
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
    marginBottom: 80, // Space for action buttons
    padding: 16,
  },
  // Content styles
  contentContainer: {
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  // Action buttons
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
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#4a90a4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#333',
  },
  saveButtonText: {
    color: '#fff',
  }
});

export default SaleDetailsEdit;
