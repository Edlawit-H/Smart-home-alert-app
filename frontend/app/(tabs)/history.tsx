import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HistoryScreen() {
  // Mock data for alerts
  const logs = [
    { id: '1', type: 'Gas Detector', msg: 'Gas Level Normal', date: 'Dec 27, 2025', time: '14:20:05' },
    { id: '2', type: 'Doorbell', msg: 'Motion Detected', date: 'Dec 27, 2025', time: '12:10:32' },
    { id: '3', type: 'Smoke Detector', msg: 'Weekly Self-Check OK', date: 'Dec 26, 2025', time: '09:00:00' },
    { id: '4', type: 'System', msg: 'Server Connection Lost', date: 'Dec 25, 2025', time: '23:45:12' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Alert History</Text>
        
        {logs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logType}>{log.type}</Text>
              <Text style={styles.logTimestamp}>{log.date} | {log.time}</Text>
            </View>
            <Text style={styles.logMsg}>{log.msg}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { padding: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  logCard: { 
    backgroundColor: '#1e293b', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#3b82f6' 
  },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  logType: { color: '#3b82f6', fontWeight: 'bold', fontSize: 14 },
  logTimestamp: { color: '#94a3b8', fontSize: 11, fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier' },
  logMsg: { color: 'white', fontSize: 16 }
});