import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Business Profile</Text>
        </View>

        {/* Business Card */}
        <View style={styles.businessCard}>
          <Text style={styles.cardTitle}>Business Name</Text>
          <Text style={styles.cardSubtitle}>Service, Computer Equipments & Softwares</Text>
          <Text style={styles.cardText}>1234567890, 0987654321</Text>
          <Text style={styles.cardText}>
            Xyz 1st floor, Indialand Global Park, Behind Grand Highstreet Mall, Hinjewadi, Pune
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.link}>xyz</Text>@business.com
          </Text>
          <Text style={styles.shareBtn}>Share Card</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>Profile 91% Complete.</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Business Details */}
        <Text style={styles.sectionTitle}>Business Details</Text>
        <View style={styles.inputBox}><Text style={styles.placeholder}>Business Name</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>Phone Number 1</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>Phone Number 2</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>Email ID</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>Business Address</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>PIN Code</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>Business Description</Text></View>
        <View style={styles.inputBox}><Text style={styles.placeholder}>GSTIN</Text></View>

        {/* Signature Section */}
        <Text style={styles.sectionTitle}>Signature</Text>
        <View style={styles.signatureBox}>
          <Text style={styles.signaturePlaceholder}>Create your signature here</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <View style={styles.cancelBtn}><Text style={styles.cancelText}>Cancel</Text></View>
          <View style={styles.submitBtn}><Text style={styles.submitText}>Submit</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d3e4f4" },
  scrollContent: { padding: 16 },
  header: { alignItems: "center", marginBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#000" },

  businessCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4, color: "#000" },
  cardSubtitle: { fontSize: 12, color: "#666", marginBottom: 8 },
  cardText: { fontSize: 12, color: "#000", marginBottom: 4 },
  link: { textDecorationLine: "underline" },
  shareBtn: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#c92323",
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },

  progressSection: { marginTop: 16, marginBottom: 20 },
  progressText: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#000" },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#d9d9d9",
    overflow: "hidden",
  },
  progressBarFill: {
    width: "91%",
    height: "100%",
    backgroundColor: "#385dff",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#c92323",
    marginVertical: 12,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    opacity: 0.8,
  },
  placeholder: { fontSize: 14, color: "#555" },

  signatureBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 15,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeeded",
    opacity: 0.8,
    marginBottom: 20,
  },
  signaturePlaceholder: { fontSize: 12, color: "#777" },

  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  cancelText: { fontSize: 16, fontWeight: "700", color: "#000" },
  submitBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 10,
    backgroundColor: "#c92323",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  submitText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});

export default Profile;
