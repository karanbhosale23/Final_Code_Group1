import React, { useEffect, useRef, useState } from "react";
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

interface ConfirmPasswordProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (newPassword: string) => void;
}

const passwordRules = [
  { rule: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { rule: "At least 1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { rule: "At least 1 lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { rule: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
  { rule: "At least 1 special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ visible, onClose, onConfirm }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRules, setShowRules] = useState(false);
  const newPassRef = useRef<TextInput | null>(null);

  // Move focus to the new password field when modal opens (web a11y)
  useEffect(() => {
    if (visible && newPassRef.current) {
      const id = setTimeout(() => newPassRef.current?.focus?.(), 50);
      return () => clearTimeout(id);
    }
  }, [visible]);

  const validatePassword = (password: string) => {
    return passwordRules.every(rule => rule.test(password));
  };

  const handleConfirm = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!validatePassword(newPassword)) {
      setShowRules(true);
      Alert.alert("Error", "Password does not meet the rules");
      return;
    }
    onConfirm(newPassword);
    Alert.alert("Success", "Password changed successfully!");
    setNewPassword("");
    setConfirmPassword("");
    setShowRules(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Set New Password</Text>
          <Text style={styles.text}>Enter and confirm your new password below.</Text>

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            ref={newPassRef}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {showRules && (
            <View style={styles.rulesBox}>
              <Text style={styles.rulesTitle}>Password must contain:</Text>
              {passwordRules.map((rule, idx) => (
                <Text key={idx} style={styles.ruleText}>• {rule.rule}</Text>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>CONFIRM PASSWORD</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Text style={styles.backText}>Back</Text>
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
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2576e0",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  rulesBox: {
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  rulesTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#c6040a",
  },
  ruleText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 2,
  },
  confirmButton: {
    backgroundColor: "#2576e0",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  backBtn: {
    marginTop: 5,
  },
  backText: {
    color: "#2576e0",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ConfirmPassword;
