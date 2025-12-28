import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  StatusBar, 
  Switch, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // --- STATE FOR PROFILE SETTINGS ---
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isPreciseLocation, setIsPreciseLocation] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out of Smart Home Alerts?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>User Profile</Text>
        
        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={50} color="white" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>j.doe@smarthome.io</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* SETTINGS SECTION */}
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.settingsGroup}>
          <SettingToggle 
            icon="dark-mode" 
            label="Dark Mode" 
            value={isDarkMode} 
            onValueChange={setIsDarkMode} 
          />
          <SettingToggle 
            icon="fingerprint" 
            label="Biometric Login" 
            value={isBiometricEnabled} 
            onValueChange={setIsBiometricEnabled} 
          />
          <SettingToggle 
            icon="location-on" 
            label="Precise Location" 
            value={isPreciseLocation} 
            onValueChange={setIsPreciseLocation} 
          />
        </View>

        {/* SYSTEM INFORMATION SECTION */}
        <Text style={styles.sectionTitle}>System Info</Text>
        <View style={styles.settingsGroup}>
          <InfoRow label="System ID" value="SH-882-991" />
          <InfoRow label="Home Location" value="Main Residence" />
          <InfoRow label="App Version" value="2.4.0 (Stable)" />
        </View>

        {/* ACCOUNT ACTIONS */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const SettingToggle = ({ icon, label, value, onValueChange }: any) => (
  <View style={styles.settingRow}>
    <View style={styles.settingLabelGroup}>
      <MaterialIcons name={icon} size={22} color="#94a3b8" style={{ marginRight: 12 }} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Switch 
      value={value} 
      onValueChange={onValueChange} 
      trackColor={{ false: "#334155", true: "#3b82f6" }}
      thumbColor={value ? "#fff" : "#94a3b8"}
    />
  </View>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  
  // Header
  profileHeader: { alignItems: 'center', marginBottom: 30, backgroundColor: '#1e293b', padding: 25, borderRadius: 20 },
  avatar: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 50, marginBottom: 12 },
  userName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  userEmail: { color: '#94a3b8', fontSize: 14, marginBottom: 15 },
  editBtn: { backgroundColor: 'rgba(59, 130, 246, 0.1)', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: '#3b82f6' },
  editBtnText: { color: '#3b82f6', fontWeight: 'bold', fontSize: 14 },

  // Sections
  sectionTitle: { color: '#3b82f6', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginLeft: 5 },
  settingsGroup: { backgroundColor: '#1e293b', borderRadius: 15, marginBottom: 25, overflow: 'hidden' },
  
  // Toggle Row
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#334155' 
  },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { color: 'white', fontSize: 16 },

  // Info Row
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#334155' 
  },
  infoLabel: { color: '#94a3b8', fontSize: 15 },
  infoValue: { color: 'white', fontSize: 15, fontWeight: '500' },

  // Logout
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
    padding: 16, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#ef4444' 
  },
  logoutText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});