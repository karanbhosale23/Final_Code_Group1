import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const DuplicateCredit = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        {/* Header */}
        <View style={styles.childPosition3} />
        <Text style={styles.sale}>Sale</Text>
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.childPosition3} />
        
        {/* Icons */}
        <MaterialIcons name="receipt" size={32} color="#4CAF50" style={[styles.icon, styles.iconLayout]} />
        <View style={[styles.duplicateCredit, styles.iconLayout, { justifyContent: 'center', alignItems: 'center' }]}>
          <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="#2196F3" />
        </View>
        
        {/* Date and Invoice */}
        <Text style={[styles.text, styles.textTypo]}>04/09/2025</Text>
        <View style={[styles.lineView, styles.child5Border]} />
        <Text style={[styles.invoiceNo, styles.dateTypo]}>Invoice No.</Text>
        <Text style={[styles.date, styles.dateTypo]}>Date</Text>
        <Text style={[styles.duplicateCredit, styles.textTypo]}>2</Text>
        
        {/* Customer Info */}
        <View style={[styles.duplicateCredit, styles.childLayout1]} />
        <Text style={[styles.customerName, styles.dateTypo]}>Customer Name *</Text>
        <View style={[styles.child2, styles.childLayout1]} />
        <Text style={[styles.harshalThakare, styles.phoneNumberPosition]}>Harshal Thakare</Text>
        
        {/* Amount Details */}
        <Text style={[styles.totalAmount, styles.textTypo]}>Total Amount</Text>
        <Text style={[styles.balanceDue, styles.textTypo]}>Balance Due</Text>
        <Text style={[styles.text2, styles.textTypo]}>₹ 100.00</Text>
        <Text style={[styles.text3, styles.textTypo]}>₹ </Text>
        <Text style={[styles.text4, styles.textTypo]}>
          <Text style={styles.text5}>₹</Text>
          <Text style={styles.text6}> 100.00</Text>
        </Text>
        
        {/* Divider */}
        <Text style={[styles.dividerLine1, styles.addClr]}>-----------------</Text>
        <Text style={[styles.dividerLine2, styles.textPosition]}>-----------------</Text>
        
        <Text style={[styles.received, styles.textTypo]}>Received</Text>
        
        {/* Phone Number */}
        <Text style={[styles.phoneNumber, styles.optionalFlexBox]}>Phone Number</Text>
        
        {/* Payment Type */}
        <View style={[styles.child3, styles.childPosition3]} />
        <View style={[styles.child4, styles.childPosition3]} />
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" style={[styles.icon, styles.iconPosition]} />
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" style={[styles.icon, styles.iconPosition, {marginLeft: 20}]} />
        
        <Text style={[styles.selectState, styles.dateTypo]}>Select State</Text>
        <View style={[styles.child5, styles.childLayout1]} />
        <Text style={[styles.paymentType, styles.cashTypo]}>Payment Type</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" style={styles.rectangleIcon} />
        <Text style={[styles.cash, styles.cashTypo]}>Cash</Text>
        
        {/* Add Payment Type */}
        <TouchableOpacity style={styles.addPaymentButton}>
          <Text style={[styles.addPaymentType, styles.addClr]}>Add Payment Type</Text>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
        
        {/* State of Supply */}
        <Text style={[styles.stateOfSupply, styles.dateTypo]}>State of Supply</Text>
        
        {/* Description */}
        <View style={[styles.child6, styles.childPosition3]} />
        <View style={[styles.child7, styles.childBorder]}>
          <Text style={[styles.addNote, styles.childPosition3]}>Add Note</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" style={[styles.child9, styles.childPosition3]} />
        </View>
        
        <Text style={[styles.description, styles.dateTypo]}>Description</Text>
        
        {/* Documents */}
        <View style={[styles.child8, styles.childBorder]}>
          <Text style={styles.addDocument}>Add Document</Text>
          <MaterialIcons name="attach-file" size={24} color="#666" style={[styles.child11, styles.childLayout1]} />
          <Text style={styles.internetIsRequired}>Internet is required to upload</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
            <Text style={[styles.buttonText, styles.saveButtonText]}>Save & New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
            <Text style={[styles.buttonText, styles.editButtonText]}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Payment Type Toggle */}
        <View style={styles.paymentTypeToggle}>
          <View style={[styles.toggleButton, styles.cashToggle]}>
            <Text style={[styles.toggleText, styles.cashText]}>Cash</Text>
          </View>
          <View style={[styles.toggleButton, styles.creditToggle]}>
            <Text style={[styles.toggleText, styles.creditText]}>Credit</Text>
          </View>
          <MaterialIcons name="toggle-on" size={48} color="#4CAF50" style={styles.toggleIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Add useNavigation hook
const useNavigation = () => {
  return {
    goBack: () => {}
  };
};

const styles = StyleSheet.create<{[key: string]: ViewStyle | any}>({
  // Text styles
  text: {
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    left: 50,
    top: 100
  },
  text2: {
    position: 'absolute',
    left: 200,
    top: 280,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  text3: {
    position: 'absolute',
    left: 200,
    top: 320,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  text4: {
    position: 'absolute',
    left: 200,
    top: 360,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  text5: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  text6: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  dividerLine1: {
    position: 'absolute',
    left: 50,
    top: 220,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  dividerLine2: {
    position: 'absolute',
    left: 200,
    top: 220,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  textTypo: {
    fontSize: 14,
    top: 99,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  dateTypo: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  totalAmount: {
    position: 'absolute',
    left: 20,
    top: 280,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  balanceDue: {
    position: 'absolute',
    left: 20,
    top: 320,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  childBorder: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 6,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  child6: {
    position: 'absolute',
    left: 20,
    top: 535,
    width: 373,
    height: 60,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    borderStyle: 'solid',
    backgroundColor: '#fff',
  },
  child7: {
    position: 'absolute',
    left: 20,
    top: 535,
    width: 373,
    height: 60,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  child8: {
    position: 'absolute',
    left: 20,
    top: 600,
    width: 373,
    height: 80,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  child11: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
  },
  addDocument: {
    position: 'absolute',
    left: 20,
    top: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  internetIsRequired: {
    position: 'absolute',
    left: 20,
    top: 30,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  child2: {
    position: 'absolute',
    left: 20,
    top: 155,
    width: 373,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    borderStyle: 'solid',
    backgroundColor: '#fff',
  },
  child3: {
    position: 'absolute',
    left: 20,
    top: 480,
    width: 373,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    borderStyle: 'solid',
    backgroundColor: '#fff',
  },
  child4: {
    position: 'absolute',
    left: 20,
    top: 440,
    width: 373,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    borderStyle: 'solid',
    backgroundColor: '#fff',
  },
  child5: {
    position: 'absolute',
    left: 20,
    top: 415,
    width: 373,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    borderStyle: 'solid',
    backgroundColor: '#fff',
  },
  child5Border: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderStyle: 'solid',
  },
  lineView: {
    position: 'absolute',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    top: 140,
  },
  icon: {
    left: 24,
    width: 24,
    height: 24,
    position: 'absolute',
  },
  iconLayout: {
    height: 8,
    maxWidth: "100%",
    top: "50%",
    width: "3.4%",
    marginTop: -342.5,
    position: "absolute",
    overflow: "hidden"
  },
  invoiceNo: {
    position: 'absolute',
    left: 20,
    top: 80,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    color: '#000',
  },
  customerName: {
    position: 'absolute',
    left: 20,
    top: 140,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    color: '#000',
  },
  harshalThakare: {
    position: 'absolute',
    left: 30,
    top: 155,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#4a90a4',
  },
  editButton: {
    backgroundColor: '#2576e0',
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
  },
  editButtonText: {
    color: '#fff',
  },
  // Payment Type Toggle
  paymentTypeToggle: {
    position: 'absolute',
    top: 24,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cashToggle: {
    backgroundColor: '#21cb26',
  },
  creditToggle: {
    backgroundColor: 'transparent',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  cashText: {
    color: '#fff',
  },
  creditText: {
    color: '#000',
  },
  toggleIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 16,
    height: 16,
  },
  // Add Payment Button
  addPaymentButton: {
    position: 'absolute',
    top: 533,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 20,
    color: '#165ffc',
    marginRight: 8,
  },
  text7: {
    position: 'absolute',
    left: 20,
    top: 340,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  textPosition: {
    position: 'absolute',
    left: 20,
    top: 355,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  received: {
    position: 'absolute',
    left: 20,
    top: 360,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  container: {
    backgroundColor: '#d3e4f4',
    flex: 1,
  },
  view: {
    width: '100%',
    height: 895,
    overflow: 'hidden',
    backgroundColor: '#d3e4f4',
    flex: 1,
  },
  childPosition3: {
    width: 412,
    backgroundColor: '#fff',
    left: 0,
    position: 'absolute',
  },
  date: {
    position: 'absolute',
    left: 150,
    top: 80,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    color: '#000',
  },
  childLayout1: {
    width: 373,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    height: 36,
    left: 20,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    position: 'absolute',
  },
});

export default DuplicateCredit;
