import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  StatusBar, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Dynamic Status Bar */}
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER WITH SETTINGS ICON */}
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.text }]}>User Profile</Text>
          <TouchableOpacity 
            onPress={() => router.push('/settings')}
            style={styles.iconCircle}
          >
            <Ionicons name="settings-outline" size={24} color={theme.primary} />
          </TouchableOpacity>
        </View>
        
        {/* PROFILE HEADER CARD */}
        <View style={[styles.profileHeader, { backgroundColor: theme.card }]}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <MaterialIcons name="person" size={50} color="white" />
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>John Doe</Text>
          <Text style={[styles.userEmail, { color: theme.subtext }]}>j.doe@smarthome.io</Text>
          <TouchableOpacity style={[styles.editBtn, { borderColor: theme.primary }]}>
            <Text style={[styles.editBtnText, { color: theme.primary }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* SYSTEM INFORMATION SECTION */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>System Info</Text>
        <View style={[styles.settingsGroup, { backgroundColor: theme.card }]}>
          <InfoRow label="System ID" value="SH-882-991" theme={theme} />
          <InfoRow label="Home Location" value="Main Residence" theme={theme} />
          <InfoRow label="App Version" value="2.4.0 (Stable)" theme={theme} isLast />
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

// --- SUB-COMPONENT FOR SYSTEM INFO ---
const InfoRow = ({ label, value, theme, isLast }: any) => (
  <View style={[styles.infoRow, !isLast && { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
    <Text style={[styles.infoLabel, { color: theme.subtext }]}>{label}</Text>
    <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  iconCircle: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  
  // Header Card
  profileHeader: { alignItems: 'center', marginBottom: 30, padding: 25, borderRadius: 20, elevation: 2 },
  avatar: { padding: 15, borderRadius: 50, marginBottom: 12, elevation: 4 },
  userName: { fontSize: 20, fontWeight: 'bold' },
  userEmail: { fontSize: 14, marginBottom: 15 },
  editBtn: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1 },
  editBtnText: { fontWeight: 'bold', fontSize: 14 },

  // Sections
  sectionTitle: { fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginLeft: 5 },
  settingsGroup: { borderRadius: 15, marginBottom: 25, overflow: 'hidden', elevation: 2 },
  
  // Info Row
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 16, 
  },
  infoLabel: { fontSize: 15 },
  infoValue: { fontSize: 15, fontWeight: '500' },

  // Logout
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
    padding: 16, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#ef4444',
    marginTop: 10
  },
  logoutText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});