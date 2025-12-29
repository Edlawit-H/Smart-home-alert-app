import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function HistoryScreen() {
  const { theme } = useTheme(); // Get theme from context

  // Mock data for alerts
  const logs = [
    { id: '1', type: 'Gas Detector', msg: 'Gas Level Normal', date: 'Dec 27, 2025', time: '14:20:05' },
    { id: '2', type: 'Doorbell', msg: 'Motion Detected', date: 'Dec 27, 2025', time: '12:10:32' },
    { id: '3', type: 'Smoke Detector', msg: 'Weekly Self-Check OK', date: 'Dec 26, 2025', time: '09:00:00' },
    { id: '4', type: 'System', msg: 'Server Connection Lost', date: 'Dec 25, 2025', time: '23:45:12' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.text }]}>Alert History</Text>
        
        {logs.map((log) => (
          <View
            key={log.id}
            style={[
              styles.logCard,
              { backgroundColor: theme.card, borderLeftColor: theme.primary }
            ]}
          >
            <View style={styles.logHeader}>
              <Text style={[styles.logType, { color: theme.primary }]}>{log.type}</Text>
              <Text style={[styles.logTimestamp, { color: theme.subtext }]}>
                {log.date} | {log.time}
              </Text>
            </View>
            <Text style={[styles.logMsg, { color: theme.text }]}>{log.msg}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  logCard: { 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    borderLeftWidth: 4
  },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  logType: { fontWeight: 'bold', fontSize: 14 },
  logTimestamp: { fontSize: 11, fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier' },
  logMsg: { fontSize: 16 }
});
