import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, useRootNavigationState } from 'expo-router';
import ConfirmPassword from './ConfirmPassword';
import { BASE_URL } from '../config/api';

export default function ResetPasswordPage() {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [submitting, setSubmitting] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const resetToken = useMemo(() => (typeof token === 'string' ? token : undefined), [token]);

  // Validate token on mount so users with expired links are redirected immediately
  useEffect(() => {
    if (!rootNavigationState?.key) return; // wait until navigation is ready
    const run = async () => {
      if (!resetToken) {
        setValidating(false);
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/v1/auth/validate-reset-token?token=${encodeURIComponent(resetToken)}`);
        if (res.ok) {
          setTokenValid(true);
        } else if (res.status === 410 || res.status === 400) {
          router.replace('../Authentication/reset-expired');
          return;
        } else {
          const text = await res.text();
          Alert.alert('Invalid Link', text || 'This reset link is invalid.');
        }
      } catch (e: any) {
        Alert.alert('Error', e?.message || 'Unable to validate reset link.');
      } finally {
        setValidating(false);
      }
    };
    run();
  }, [rootNavigationState?.key, resetToken]);

  const handleConfirm = async (newPassword: string) => {
    if (!resetToken) {
      Alert.alert('Invalid Link', 'Reset token is missing or invalid.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });

      if (!res.ok) {
        if (res.status === 410 || res.status === 400) {
          // Token expired -> navigate to expired page
          router.replace('../Authentication/reset-expired');
          return;
        }
        const text = await res.text();
        throw new Error(text || `Failed with status ${res.status}`);
      }

      Alert.alert('Success', 'Your password has been reset successfully.', [
        { text: 'OK', onPress: () => router.replace('../Authentication/LogIn') },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Unable to reset password.');
    } finally {
      setSubmitting(false);
    }
  };

  // Avoid rendering before the root navigator is ready on web
  if (!rootNavigationState?.key) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2576e0" />
        <Text style={{ marginTop: 10 }}>Preparing...</Text>
      </View>
    );
  }

  if (!resetToken) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Invalid or missing token</Text>
        <Text style={styles.subtitle}>Please use the latest reset link from your email.</Text>
      </View>
    );
  }

  if (validating) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2576e0" />
        <Text style={{ marginTop: 10 }}>Validating link...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {submitting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2576e0" />
        </View>
      )}
      <ConfirmPassword
        visible={true}
        onClose={() => router.replace('../Authentication/LogIn')}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});