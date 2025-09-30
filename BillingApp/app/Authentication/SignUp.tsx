import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Pressable,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { storeToken, storeUserData, isAuthenticated, UserData } from "../../utils/auth";

const passwordRules = [
  { rule: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { rule: "At least 1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { rule: "At least 1 lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { rule: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
  { rule: "At least 1 special character (@$!%*?&)", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const getApiBase = () => {
  // This works in Expo Go and development mode
  const debuggerHost = Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const ip = debuggerHost.split(":")[0];
    return `http://${ip}:8080/api/v1/auth`;
  }
  // Fallback for production or if not available
  return "http://localhost:8080/api/v1/auth";
};

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusinessname] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [loading, setLoading] = useState(true);
  const passwordInputRef = useRef<TextInput>(null);

  const validatePassword = (pass: string) => {
    return passwordRules.every(rule => rule.test(pass));
  };

  const API_BASE = getApiBase();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        // User is already logged in, redirect to Transaction page
        router.replace("/User_Dashboard/Transaction");
        return;
      }
    } catch (error) {
      console.log("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]} >
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSignUp = async () => {
    if (!validatePassword(password)) {
      setShowPasswordRules(true);
      passwordInputRef.current?.focus();
      return;
    }

    if (!username || !email || !phone || !password || !business) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          phoneNumber: phone.trim(),
          password: password.trim(),
          businessName: business.trim(),
        }),
      });

      // Get the response text first
      const responseText = await response.text();
      console.log('Raw response:', responseText); // Log the raw response for debugging
      
      // Try to parse as JSON, but don't fail if it's not valid JSON
      let data = null;
      try {
        data = responseText ? JSON.parse(responseText) : null;
        console.log('Parsed data:', data); // Log parsed data for debugging
      } catch (e) {
        console.log('Response is not valid JSON, checking for token in response text');
        // Try to extract token from response text if it's not valid JSON
        const tokenMatch = responseText.match(/token[:=]\s*['"]([^'"]+)['"]/);
        if (tokenMatch && tokenMatch[1]) {
          data = { token: tokenMatch[1] };
          console.log('Extracted token from response text');
        }
      }

      if (response.ok) {
        // Clear form fields
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
        setBusinessname('');
        
        try {
          // If we have a token (from JSON or extracted from text), store it
          if (data?.token) {
            await storeToken(data.token);
            console.log('Token stored successfully');
            
            // Create user data object with available information
            const userData: UserData = {
              id: data.id || 0,
              username: data.username || username.trim(),
              email: data.email || email.trim(),
              phoneNumber: data.phoneNumber || phone.trim(),
              businessName: data.businessName || business.trim(),
              role: data.role || "MERCHANT"
            };
            await storeUserData(userData);
            console.log('User data stored successfully');
          } else {
            console.log('No token found in response');
          }
          
          // Redirect to Transaction page on successful signup
          console.log('Redirecting to Transaction page');
          router.replace("/User_Dashboard/Transaction");
          return; // Exit the function after successful redirect
          
        } catch (error) {
          console.error("Error during post-registration:", error);
          // Even if there's an error with token storage, we can still redirect to login
          // as the registration was successful
          router.replace("/Authentication/LogIn");
          return;
        }
      } else {
        const errorText = await response.text();
        Alert.alert("Error", `Status ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "An error occurred during signup. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View>
                <Pressable 
                  onPress={() => {
                    setShowPasswordRules(true);
                    passwordInputRef.current?.focus();
                  }}
                >
                  <TextInput
                    ref={passwordInputRef}
                    style={styles.input}
                    placeholder="Create a strong password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                    showSoftInputOnFocus={false}
                  />
                </Pressable>
              </View>
            </View>


            <View style={styles.inputContainer}>
              <Text style={styles.label}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your business name"
                value={business}
                onChangeText={setBusinessname}
                placeholderTextColor="#999"
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.button, !(username && email && phone && password && business) && styles.buttonDisabled]} 
              onPress={handleSignUp}
              disabled={!(username && email && phone && password && business)}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/Authentication/LogIn")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle="dark-content" backgroundColor="#c6040a" />

      {/* Password Rules Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPasswordRules}
        onRequestClose={() => setShowPasswordRules(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowPasswordRules(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Password Requirements</Text>
            {passwordRules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <Text style={[
                  styles.ruleText,
                  rule.test(password) ? styles.ruleSatisfied : styles.ruleNotSatisfied
                ]}>
                  {rule.test(password) ? '✓ ' : '• '}{rule.rule}
                </Text>
              </View>
            ))}
            <TouchableOpacity 
              style={styles.okButton}
              onPress={() => setShowPasswordRules(false)}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    height: 60,
    backgroundColor: '#c6040a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#333',
    width: '100%',
  },
  button: {
    height: 52,
    backgroundColor: '#c6040a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#c6040a',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    color: '#666',
  },
  ruleSatisfied: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  ruleNotSatisfied: {
    color: '#666',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#c6040a',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: '#c6040a',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  okButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SignUp;
