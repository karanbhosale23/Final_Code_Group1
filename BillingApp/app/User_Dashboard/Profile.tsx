import * as React from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Constants from "expo-constants";

const getApiBase = () => {
  const debuggerHost = Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const ip = debuggerHost.split(":")[0];
    return `http://${ip}:8080/api/v1`;
  }
  return "http://localhost:8080/api/v1";
};

const Profile = () => {
  const { username } = useLocalSearchParams<{ username?: string }>();
  const displayName = Array.isArray(username) ? username[0] : username;
  const API_BASE = getApiBase();

  // User details from signup
  const [currentUsername, setCurrentUsername] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPhoneNumber, setUserPhoneNumber] = React.useState("");
  const [userBusinessName, setUserBusinessName] = React.useState("");
  const [userId, setUserId] = React.useState<number | null>(null);

  // Profile form state
  const [phoneNumber2, setPhoneNumber2] = React.useState("");
  const [businessAddress, setBusinessAddress] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [businessDescription, setBusinessDescription] = React.useState("");
  const [gstin, setGstin] = React.useState("");
  const [state, setState] = React.useState("");
  const [businessType, setBusinessType] = React.useState("");
  const [businessCategory, setBusinessCategory] = React.useState("");
  const [signatureBase64, setSignatureBase64] = React.useState("");
  const [signatureUrl, setSignatureUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [profileId, setProfileId] = React.useState<number | null>(null);
  const [activeTab, setActiveTab] = React.useState("basic");

  // Load user and profile data on component mount
  React.useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (!displayName) return;
    
    setLoading(true);
    try {
      // First, get user details from signup
      const userResponse = await fetch(`${API_BASE}/auth/user/${displayName}`);
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        // Populate user fields
        setCurrentUsername(userData.username || "");
        setUserEmail(userData.email || "");
        setUserPhoneNumber(userData.phoneNumber || "");
        setUserBusinessName(userData.businessName || "");
        setUserId(userData.id);
        
        // Now try to get merchant profile data
        if (userData.id) {
          const profileResponse = await fetch(`${API_BASE}/merchant-profile/user/${userData.id}`);
          
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            // Populate profile fields
            setPhoneNumber2(profileData.phoneNumber2 || "");
            setBusinessAddress(profileData.businessAddress || "");
            setPincode(profileData.pincode || "");
            setBusinessDescription(profileData.businessDescription || "");
            setGstin(profileData.gstin || "");
            setState(profileData.state || "");
            setBusinessType(profileData.businessType || "");
            setBusinessCategory(profileData.businessCategory || "");
            setSignatureBase64(profileData.signatureBase64 || "");
            setSignatureUrl(profileData.signatureUrl || "");
            setProfileId(profileData.id);
          } else if (profileResponse.status === 404) {
            // Profile doesn't exist yet, that's okay
            console.log("Profile not found, will create new one");
          }
        }
      } else {
        throw new Error(`Failed to load user data: ${userResponse.status}`);
      }
    } catch (error) {
      console.log("Error loading data:", error);
      Alert.alert("Error", "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userBusinessName.trim()) {
      Alert.alert("Error", "Business name is required");
      return;
    }

    setLoading(true);
    try {
      // First, update user details
      const userUpdates = {
        email: userEmail.trim(),
        phoneNumber: userPhoneNumber.trim(),
        businessName: userBusinessName.trim()
      };

      const userResponse = await fetch(`${API_BASE}/auth/user/${currentUsername}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdates)
      });

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        Alert.alert("Error", `Failed to update user details: ${errorText}`);
        return;
      }

      // Then, update or create merchant profile
      const profileData = {
        user: { id: userId },
        gstin: gstin.trim(),
        phoneNumber2: phoneNumber2.trim(),
        pincode: pincode.trim(),
        businessDescription: businessDescription.trim(),
        businessAddress: businessAddress.trim(),
        state: state.trim(),
        businessType: businessType.trim(),
        businessCategory: businessCategory.trim(),
        signatureBase64: signatureBase64.trim(),
        signatureUrl: signatureUrl.trim()
      };

      let profileResponse;
      if (profileId) {
        // Update existing profile
        profileResponse = await fetch(`${API_BASE}/merchant-profile/${profileId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData)
        });
      } else {
        // Create new profile
        profileResponse = await fetch(`${API_BASE}/merchant-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData)
        });
      }

      if (profileResponse.ok) {
        const savedProfile = await profileResponse.json();
        setProfileId(savedProfile.id);
        Alert.alert("Success", "Profile saved successfully!");
      } else {
        const errorText = await profileResponse.text();
        Alert.alert("Error", `Failed to save profile: ${errorText}`);
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    loadUserData(); // Reset form to original values
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.businessProfile}>Business Profile</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Business Card */}
        <View style={styles.businessCard}>
          <View style={styles.cardContent}>
            <Text style={styles.businessName}>{userBusinessName || "Business Name"}</Text>
            <Text style={styles.serviceDescription}>{businessDescription || "Service, Computer Equipments & Softwares"}</Text>
            <Text style={styles.phoneNumbers}>{userPhoneNumber || "1234567890"}{phoneNumber2 ? `, ${phoneNumber2}` : ""}</Text>
            <Text style={styles.address}>
              {businessAddress || "Business Address"}
            </Text>
            <Text style={styles.email}>
              <Text style={styles.emailLink}>{userEmail?.split('@')[0] || "xyz"}</Text>@{userEmail?.split('@')[1] || "business.com"}
            </Text>
          </View>
          <TouchableOpacity style={styles.shareCardButton}>
            <Text style={styles.shareCardText}>Share Card</Text>
          </TouchableOpacity>
          <View style={styles.redStripe} />
        </View>
        
        {/* Business Growth Message */}
        <Text style={styles.businessGrowthText}>
          67% businessmen saw their business increase after sharing their visiting card
        </Text>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>Profile 91% Complete.</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "basic" && styles.activeTab]}
            onPress={() => setActiveTab("basic")}
          >
            <Text style={[styles.tabText, activeTab === "basic" && styles.activeTabText]}>Basic Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "business" && styles.activeTab]}
            onPress={() => setActiveTab("business")}
          >
            <Text style={[styles.tabText, activeTab === "business" && styles.activeTabText]}>Business Details</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tab Content */}
        {activeTab === "basic" && (
          <View>
            {/* Basic Details Form */}
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Business Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={userBusinessName}
                onChangeText={setUserBusinessName}
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>GSTIN</Text>
              <View style={styles.gstinContainer}>
                <TextInput
                  style={styles.fieldInput}
                  value={gstin}
                  onChangeText={setGstin}
                  autoCapitalize="characters"
                  maxLength={15}
                  editable={!loading}
                />
                <Text style={styles.showOnCard}>Show on Card</Text>
              </View>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Phone Number 1</Text>
              <TextInput
                style={styles.fieldInput}
                value={userPhoneNumber}
                onChangeText={setUserPhoneNumber}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Phone Number 2</Text>
              <TextInput
                style={styles.fieldInput}
                value={phoneNumber2}
                onChangeText={setPhoneNumber2}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Email ID</Text>
              <TextInput
                style={styles.fieldInput}
                value={userEmail}
                onChangeText={setUserEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Business Address</Text>
              <TextInput
                style={[styles.fieldInput, styles.multilineInput]}
                value={businessAddress}
                onChangeText={setBusinessAddress}
                multiline
                numberOfLines={2}
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>PIN Code</Text>
              <TextInput
                style={styles.fieldInput}
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
                maxLength={6}
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Business Description</Text>
              <TextInput
                style={[styles.fieldInput, styles.multilineInput]}
                value={businessDescription}
                onChangeText={setBusinessDescription}
                multiline
                numberOfLines={3}
                editable={!loading}
              />
            </View>
          </View>
        )}
        
        {activeTab === "business" && (
          <View>
            {/* Business Details Form */}
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>State</Text>
              <TextInput
                style={styles.fieldInput}
                value={state}
                onChangeText={setState}
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Business Type</Text>
              <TextInput
                style={styles.fieldInput}
                value={businessType}
                onChangeText={setBusinessType}
                editable={!loading}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Business Category</Text>
              <TextInput
                style={styles.fieldInput}
                value={businessCategory}
                onChangeText={setBusinessCategory}
                editable={!loading}
              />
            </View>
          </View>
        )}

        {/* Signature Section */}
        <Text style={styles.signatureTitle}>Signature</Text>
        
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.createSignatureText}>Create your signature here</Text>
          </View>
          
          <View style={styles.signatureOptions}>
            <TouchableOpacity style={styles.signatureButton}>
              <Text style={styles.signatureButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signatureButton}>
              <Text style={styles.signatureButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Hidden inputs for signature data */}
        <TextInput
          style={styles.hiddenInput}
          value={signatureUrl}
          onChangeText={setSignatureUrl}
          editable={!loading}
        />
        
        <TextInput
          style={styles.hiddenInput}
          value={signatureBase64}
          onChangeText={setSignatureBase64}
          multiline
          editable={!loading}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.cancelButton, loading && styles.disabledBtn]} 
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledBtn]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>{loading ? "Saving..." : "Submit"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3e4f4"
  },
  scrollContent: {
    paddingBottom: 20
  },
  
  // Header
  header: {
    height: 73,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  backArrow: {
    fontSize: 24,
    color: "#000"
  },
  businessProfile: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: "#000"
  },
  headerRight: {
    width: 40,
    height: 40
  },
  
  // Business Card
  businessCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 21,
    marginBottom: 20,
    height: 177,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
    paddingLeft: 50
  },
  businessName: {
    fontSize: 15,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    color: "#000",
    marginBottom: 4
  },
  serviceDescription: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginBottom: 8
  },
  phoneNumbers: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginBottom: 4
  },
  address: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginBottom: 4,
    lineHeight: 12
  },
  email: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#000"
  },
  emailLink: {
    textDecorationLine: "underline"
  },
  shareCardButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#c92323",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    left: 145,
    width: 138,
    height: 57,
    justifyContent: "center",
    alignItems: "center"
  },
  shareCardText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    fontWeight: "500"
  },
  redStripe: {
    position: "absolute",
    left: 55,
    top: 40,
    width: 3,
    height: 77,
    backgroundColor: "#fb2a2a",
    borderRadius: 5
  },
  
  // Business Growth Message
  businessGrowthText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#000",
    opacity: 0.5,
    textAlign: "center",
    marginHorizontal: 36,
    marginBottom: 20,
    lineHeight: 15
  },
  
  // Progress Section
  progressSection: {
    marginHorizontal: 12,
    marginBottom: 20
  },
  progressText: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: "#000",
    marginBottom: 6
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    width: "91%",
    backgroundColor: "#385dff",
    borderRadius: 10
  },
  
  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 0,
    marginBottom: 20
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent"
  },
  activeTab: {
    borderBottomColor: "#d93b3b"
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    color: "#999"
  },
  activeTabText: {
    color: "#d93b3b"
  },
  
  // Form Fields
  formField: {
    marginBottom: 20,
    marginHorizontal: 23
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    opacity: 0.5,
    marginBottom: 8,
    marginLeft: 2
  },
  fieldInput: {
    height: 66,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    opacity: 0.6
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top"
  },
  gstinContainer: {
    position: "relative"
  },
  showOnCard: {
    position: "absolute",
    right: 16,
    top: 22,
    fontSize: 12,
    color: "#666",
    opacity: 0.7
  },
  
  // Signature Section
  signatureTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    opacity: 0.8,
    marginLeft: 23,
    marginBottom: 10
  },
  signatureContainer: {
    marginHorizontal: 23,
    marginBottom: 20
  },
  signatureBox: {
    height: 151,
    backgroundColor: "#eeeded",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0)",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  createSignatureText: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#000"
  },
  signatureOptions: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  signatureButton: {
    width: 115,
    height: 25,
    backgroundColor: "#d3e4f4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  signatureButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    opacity: 0.8
  },
  
  // Hidden inputs for signature data
  hiddenInput: {
    height: 0,
    opacity: 0
  },
  
  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 0,
    marginTop: 20
  },
  cancelButton: {
    flex: 1,
    height: 57,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    color: "#000"
  },
  submitButton: {
    flex: 1,
    height: 57,
    backgroundColor: "#c92323",
    justifyContent: "center",
    alignItems: "center"
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    color: "#fff"
  },
  disabledBtn: {
    opacity: 0.6
  }
});

export default Profile;
