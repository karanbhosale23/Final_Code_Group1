import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../config/api";

interface ForgetPassProps {
  visible: boolean;
  onClose: () => void;
}

const ForgetPass: React.FC<ForgetPassProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0); // in seconds
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabled(false); // re-enable button after countdown ends
    }

    return () => clearInterval(timer);
  }, [countdown]);

  // Move focus to the modal's email field when it opens (web a11y)
  useEffect(() => {
    if (visible && emailInputRef.current) {
      // slight delay to ensure modal is mounted
      const id = setTimeout(() => emailInputRef.current?.focus?.(), 50);
      return () => clearTimeout(id);
    }
  }, [visible]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      
      if (response.ok) {
        Alert.alert(
          "Success", 
          `Password reset link has been sent to ${email.trim().toLowerCase()}. Please check your email inbox and spam folder.`,
          [{ text: "OK", onPress: () => onClose() }]
        );
        setIsDisabled(true);
        setCountdown(60); // 1 minutes
      } else {
        const errorText = await response.text();
        if (response.status === 404) {
          Alert.alert("Error", "No account found with this email address. Please check your email or create a new account.");
        } else {
          Alert.alert("Error", errorText || `Failed to send reset link. Status: ${response.status}`);
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      Alert.alert(
        "Connection Error", 
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.text}>
            Provide the email address linked with your account to reset your
            password.
          </Text>

          <Text style={styles.emailLabel}>Email</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            ref={emailInputRef}
          />

          <TouchableOpacity
            style={[
              styles.closeButton,
              (isDisabled || isLoading) && { backgroundColor: "#ccc" },
            ]}
            onPress={handleSendResetLink}
            disabled={isDisabled || isLoading}
          >
            <Text style={styles.closeButtonText}>
              {isLoading
                ? "SENDING..."
                : isDisabled
                ? `Resend in ${Math.floor(countdown / 60)}:${String(
                    countdown % 60
                  ).padStart(2, "0")}`
                : "SEND RESET LINK"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.backToLoginBtn}>
            <Text style={styles.backToLog}>Back to log in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    width: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  emailLabel: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
  },
  emailInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2576e0",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#2576e0",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  backToLoginBtn: {
    marginTop: 5,
  },
  backToLog: {
    color: "#2576e0",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ForgetPass;
