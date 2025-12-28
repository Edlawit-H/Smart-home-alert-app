import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>User Profile</Text>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={50} color="white" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>j.doe@smarthome.io</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoRow label="System ID" value="SH-882-991" />
          <InfoRow label="Location" value="Main Residence" />
          <InfoRow label="Status" value="Primary Admin" />
          <InfoRow label="App Version" value="2.4.0-build" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { padding: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30, backgroundColor: '#1e293b', padding: 20, borderRadius: 20 },
  avatar: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 50, marginBottom: 10 },
  userName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  userEmail: { color: '#94a3b8', fontSize: 14 },
  infoSection: { marginTop: 10 },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#334155' 
  },
  infoLabel: { color: '#94a3b8', fontSize: 16 },
  infoValue: { color: 'white', fontSize: 16, fontWeight: '500' }
});