import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

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

const RegistrationPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusinessname] = useState("");

  const API_BASE = getApiBase();

  const handleSignUp = async () => {
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

      if (response.ok) {
        const msg = await response.text();
        Alert.alert("Success", msg || "Registration completed!");
        // Redirect to Transaction page after successful signup, pass username
        router.push({ pathname: "../(tabs)/Transaction", params: { username: username.trim() } });
      } else {
        const errorText = await response.text();
        Alert.alert("Error", `Status ${response.status}: ${errorText}`);
      }
    } catch (err) {
      Alert.alert("Error", "Could not connect to backend");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ThynkTech India</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={business}
              onChangeText={setBusinessname}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={() => router.push("../LogIn")}> 
              <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5ff",
  },
  header: {
    height: 85,
    backgroundColor: "#2576e0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  form: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
  input: {
    height: 45,
    borderColor: "#2576e0",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    height: 45,
    backgroundColor: "#2576e0",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginText: {
    marginTop: 15,
    textAlign: "center",
    color: "#2576e0",
    fontWeight: "600",
  },
});

export default RegistrationPage;
