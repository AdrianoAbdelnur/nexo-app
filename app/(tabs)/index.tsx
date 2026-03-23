import { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { OperationalPalette } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { apiRequest } from '@/lib/api';

type SessionPayload = {
  user: {
    id: string;
    name: string;
    email: string;
    roleType: string;
  };
};

export default function AgendaScreen() {
  const { user, token } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const refreshSession = async () => {
    if (!token) return;
    setRefreshing(true);
    try {
      const { response, data } = await apiRequest<SessionPayload>('/api/auth/me', { token });
      if (!response.ok || !data.ok) {
        setStatusMessage(data.message || 'No se pudo validar la sesion');
        return;
      }
      setStatusMessage('Sesion activa y valida.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void refreshSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshSession} />}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>Agenda</Text>
          <Text style={styles.title}>Centro tecnico</Text>
          <Text style={styles.subtitle}>Vista operativa autenticada.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sesion</Text>
          <Text style={styles.line}>Usuario: {user?.name || '-'}</Text>
          <Text style={styles.line}>Email: {user?.email || '-'}</Text>
          <Text style={styles.line}>Rol: {user?.roleType || '-'}</Text>
          <Text style={styles.status}>{statusMessage}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: OperationalPalette.surface,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  headerCard: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 16,
    backgroundColor: OperationalPalette.primary,
  },
  eyebrow: {
    color: '#d9e8ff',
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  title: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: '#d9e8ff',
  },
  card: {
    borderWidth: 1,
    borderColor: OperationalPalette.border,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  cardTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontWeight: '700',
    color: OperationalPalette.textMuted,
  },
  line: {
    fontSize: 14,
    color: OperationalPalette.textMain,
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    color: OperationalPalette.primarySoft,
  },
});
