import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

const brand = Colors.brand;

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.headerBadge}>Cuenta</Text>
          <Text style={styles.title}>Perfil autenticado</Text>
          <Text style={styles.copy}>Mantenemos la misma identidad del panel: claro, denso lo justo y con foco operativo.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos de sesion</Text>
          <Text style={styles.line}>Nombre: {user?.name || '-'}</Text>
          <Text style={styles.line}>Email: {user?.email || '-'}</Text>
          <Text style={styles.line}>Rol: {user?.roleType || '-'}</Text>
        </View>

        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesion</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: brand.surface,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 14,
  },
  headerCard: {
    borderRadius: 24,
    backgroundColor: brand.surfaceLow,
    borderWidth: 1,
    borderColor: brand.border,
    padding: 18,
  },
  headerBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(0,51,102,0.08)',
    color: brand.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: '800',
    color: brand.primaryStrong,
    fontFamily: Fonts.display,
  },
  copy: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: brand.textMuted,
  },
  card: {
    borderWidth: 1,
    borderColor: brand.border,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: Fonts.display,
    color: brand.primaryStrong,
    marginBottom: 6,
  },
  line: {
    fontSize: 14,
    color: brand.textMuted,
  },
  button: {
    marginTop: 2,
    alignItems: 'center',
    backgroundColor: brand.primaryStrong,
    borderRadius: 18,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
