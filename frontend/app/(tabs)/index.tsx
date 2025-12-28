import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Platform 
} from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome5 
} from '@expo/vector-icons';

// Define the interface for the Props to fix the "implicit any" errors
interface DeviceCardProps {
  title: string;
  lastAlert: string;
  iconName: any; // Using any here for the icon names to support multiple libraries
  IconLibrary: any;
  iconColor: string;
}

// Reusable Device Card Component with TypeScript typing
const DeviceCard = ({ title, lastAlert, iconName, IconLibrary, iconColor }: DeviceCardProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: '#162e2e' }]}>
        <IconLibrary name={iconName} size={24} color={iconColor} />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>Last alert: {lastAlert}</Text>
      </View>

      <View style={styles.badge}>
        <Ionicons name="checkmark-circle-outline" size={16} color="#4ade80" />
        <Text style={styles.badgeText}>OK</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Set status bar color for Android */}
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.appIconBg}>
              <Ionicons name="home" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Smart Home Alerts</Text>
              <Text style={styles.headerSubtitle}>Real-time monitoring system</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Connection Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusLeft}>
            <MaterialIcons name="wifi-off" size={18} color="#ef4444" />
            <Text style={styles.statusTextRed}>Disconnected</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.lastUpdateText}>
            Last update: <Text style={{ fontWeight: 'bold', color: 'white' }}>Never</Text>
          </Text>
        </View>

        {/* Settings Icon Row */}
        <TouchableOpacity style={styles.settingsRow}>
          <Ionicons name="settings-outline" size={20} color="white" />
        </TouchableOpacity>

        {/* Error Message */}
        <View style={styles.errorBanner}>
          <MaterialIcons name="error-outline" size={24} color="#ef4444" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.errorTitle}>Unable to reach server</Text>
            <Text style={styles.errorSubtitle}>Failed to fetch</Text>
          </View>
        </View>

        {/* Device List */}
        <DeviceCard 
          title="Smoke Detector" 
          lastAlert="No alerts" 
          iconName="fire" 
          IconLibrary={FontAwesome5} 
          iconColor="#4ade80"
        />
        <DeviceCard 
          title="Doorbell" 
          lastAlert="No alerts" 
          iconName="notifications" 
          IconLibrary={MaterialIcons} 
          iconColor="#4ade80"
        />
        <DeviceCard 
          title="Gas Detector" 
          lastAlert="No alerts" 
          iconName="air" 
          IconLibrary={MaterialIcons} 
          iconColor="#4ade80"
        />

        {/* Footer */}
        <Text style={styles.footerText}>
          Polling every 2.5 seconds • Designed for accessibility
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', 
    // Add padding top for Android to avoid status bar overlap if not using Expo Router's automatic safe area
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIconBg: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
    // Android Shadow
    elevation: 8,
    // iOS Shadow (kept for compatibility)
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  refreshButton: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusBanner: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextRed: {
    color: '#ef4444',
    marginLeft: 8,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#334155',
    marginHorizontal: 15,
  },
  lastUpdateText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  settingsRow: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#ef4444',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorTitle: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#94a3b8',
    fontSize: 13,
    // FIXED: Corrected Platform check
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064e3b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    color: '#4ade80',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  footerText: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
    // FIXED: Corrected Platform check
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  }
});