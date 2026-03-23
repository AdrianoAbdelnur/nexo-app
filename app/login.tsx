import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

const brand = Colors.brand;

export default function LoginScreen() {
  const router = useRouter();
  const { booting, isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!booting && isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      const result = await login(email.trim().toLowerCase(), password);
      if (!result.ok) {
        setErrorMessage(result.message || 'No se pudo iniciar sesion');
        return;
      }
      router.replace('/(tabs)');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundGlowLeft} />
      <View style={styles.backgroundGlowRight} />
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.badge}>Acceso tecnico</Text>
          <Text style={styles.title}>Nexo</Text>
          <Text style={styles.subtitle}>
            Agenda, estados y flujo operativo de campo con una interfaz clara y sobria.
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Sesion</Text>
              <Text style={styles.heroStatValue}>Segura</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Acceso</Text>
              <Text style={styles.heroStatValue}>Privado</Text>
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Iniciar sesion</Text>
          <Text style={styles.formCopy}>Usa tu cuenta para abrir la agenda del tecnico.</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="tecnico@nexo.com"
            placeholderTextColor="#7f8791"
          />

          <Text style={styles.label}>Contrasena</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            placeholder="******"
            placeholderTextColor="#7f8791"
          />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <Pressable style={[styles.button, submitting && styles.buttonDisabled]} onPress={handleLogin}>
            <Text style={styles.buttonText}>{submitting ? 'Ingresando...' : 'Ingresar al modulo'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: brand.surface,
  },
  backgroundGlowLeft: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(167,200,255,0.45)',
  },
  backgroundGlowRight: {
    position: 'absolute',
    bottom: 90,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(58,95,148,0.18)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  heroCard: {
    backgroundColor: brand.primaryStrong,
    borderRadius: 24,
    padding: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: 'rgba(255,255,255,0.76)',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 18,
    color: '#ffffff',
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    fontFamily: Fonts.display,
  },
  subtitle: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 22,
  },
  heroStats: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  heroStatCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 14,
  },
  heroStatLabel: {
    color: 'rgba(255,255,255,0.62)',
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
  },
  heroStatValue: {
    marginTop: 8,
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '800',
    fontFamily: Fonts.display,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: brand.border,
  },
  formTitle: {
    color: brand.primaryStrong,
    fontSize: 28,
    fontWeight: '800',
    fontFamily: Fonts.display,
  },
  formCopy: {
    marginTop: 8,
    color: brand.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    color: brand.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: brand.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: brand.textMain,
    backgroundColor: brand.surface,
  },
  button: {
    marginTop: 18,
    backgroundColor: brand.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#001e40',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  error: {
    marginTop: 12,
    color: brand.accentDanger,
    backgroundColor: 'rgba(255,220,195,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(186,26,26,0.14)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
});

