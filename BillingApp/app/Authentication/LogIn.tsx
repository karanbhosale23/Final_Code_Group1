import ForgetPass from "../Authentication/ForgetPass";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { storeToken, storeUserData, isAuthenticated, UserData } from "../../utils/auth";

const getApiBase = () => {
  const debuggerHost =
    Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const ip = debuggerHost.split(":")[0];
    return `http://${ip}:8080/api/v1/auth`;
  }
  return "http://localhost:8080/api/v1/auth";
};

const LogIn = () => {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_BASE = getApiBase();
  const router = useRouter();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        // User is already logged in, redirect to Transaction page
        router.replace("../User_Dashboard/Transaction");
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
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    if (username.trim() === "admin" && password.trim() === "adminpassword") {
      Alert.alert("Admin Login", "Welcome, Admin!");
      router.push("../User_Dashboard/AdminPage");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store JWT token and user data
        if (data.token) {
          await storeToken(data.token);
          
          // Store user data if available
          const userData: UserData = {
            id: data.id || 0,
            username: data.username || username.trim(),
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            businessName: data.businessName || "",
            role: data.role || "MERCHANT"
          };
          await storeUserData(userData);
          
          Alert.alert("Welcome", `Hello, ${username.trim()}!`);
          console.log("Login successful! Token stored:", data.token);
          
          // Navigate to Transaction page
          router.replace("../User_Dashboard/Transaction");
        } else {
          Alert.alert("Error", "No authentication token received");
        }
      } else {
        // ✅ Custom error handling
        if (response.status === 401) {
          Alert.alert("Login Failed", "Wrong password. Please try again.");
        } else if (response.status === 404) {
          Alert.alert("Login Failed", "User not found.");
        } else {
          const errorText = await response.text();
          Alert.alert("Login Failed", errorText || `Status ${response.status}`);
        }
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
        <View style={styles.header}>
          <Text style={styles.headerText}>ThynkTech India</Text>
        </View>

        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          {/* Password input with Eye Icon */}
          <View
            style={[
              styles.input,
              { flexDirection: "row", alignItems: "center", paddingHorizontal: 10 },
            ]}
          >
            <TextInput
              style={{ flex: 1, height: 45 }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#c6040a"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => setShowForgotModal(true)}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <ForgetPass
              visible={showForgotModal}
              onClose={() => setShowForgotModal(false)}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("../Authentication/SignUp")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 85,
    backgroundColor: "#c6040a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  loginCard: {
    marginTop: 80,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#c6040a",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  eyeIcon: {
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  forgotPassword: {
    color: "#c6040a",
    fontSize: 12,
  },
  loginButton: {
    height: 45,
    backgroundColor: "#c6040a",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    fontSize: 12,
    color: "#000",
  },
  signUpText: {
    fontSize: 12,
    color: "#c6040a",
    fontWeight: "500",
  },
});

export default LogIn;
