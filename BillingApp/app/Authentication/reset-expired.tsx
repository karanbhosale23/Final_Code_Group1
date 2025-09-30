import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ResetExpired() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Link Expired</Text>
      <Text style={styles.subtitle}>
        Your password reset link has expired. For security reasons, reset links are valid for only 1 minute.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('../Authentication/LogIn')}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2576e0',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});