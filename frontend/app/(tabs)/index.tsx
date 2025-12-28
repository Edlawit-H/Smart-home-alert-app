import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, StatusBar, Platform, ActivityIndicator,
  Modal, Switch, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface DeviceCardProps {
  title: string;
  lastAlert: string;
  iconName: any;
  IconLibrary: any;
  iconColor: string;
  onPress: () => void;
}

const DeviceCard = ({ title, lastAlert, iconName, IconLibrary, iconColor, onPress }: DeviceCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
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
  </TouchableOpacity>
);

export default function HomeScreen() {
  // --- STATE ---
  const [isConnected, setIsConnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("Never");
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings Toggles
  const [notifsEnabled, setNotifsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // --- LOGIC ---
  
  // Simulate Initial Connection
  useEffect(() => {
    const timer = setTimeout(() => handleRefresh(), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setIsConnected(true);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }, 1500);
  };

  const testDevice = (deviceName: string) => {
    Alert.alert("System Check", `Running a remote diagnostic on ${deviceName}...`, [
      { text: "Cancel", style: "cancel" },
      { text: "Run Test", onPress: () => Alert.alert("Success", `${deviceName} is functioning normally.`) }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.appIconBg}><Ionicons name="home" size={24} color="white" /></View>
            <View>
              <Text style={styles.headerTitle}>Smart Home Alerts</Text>
              <Text style={styles.headerSubtitle}>Real-time monitoring system</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="refresh" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {/* Connection Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusLeft}>
            <MaterialIcons 
              name={isConnected ? "wifi" : "wifi-off"} 
              size={18} 
              color={isConnected ? "#4ade80" : "#ef4444"} 
            />
            <Text style={[styles.statusText, { color: isConnected ? "#4ade80" : "#ef4444" }]}>
              {isConnected ? "Connected" : "Disconnected"}
            </Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.lastUpdateText}>
            Last update: <Text style={{ fontWeight: 'bold', color: 'white' }}>{lastUpdate}</Text>
          </Text>
        </View>

        {/* Settings Icon Row */}
        <TouchableOpacity style={styles.settingsRow} onPress={() => setShowSettings(true)}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* Dynamic Error Message */}
        {!isConnected && !isRefreshing && (
          <View style={styles.errorBanner}>
            <MaterialIcons name="error-outline" size={24} color="#ef4444" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.errorTitle}>Unable to reach server</Text>
              <Text style={styles.errorSubtitle}>Failed to fetch latest data</Text>
            </View>
          </View>
        )}

        {/* Device List */}
        <DeviceCard title="Smoke Detector" lastAlert="No alerts" iconName="fire" IconLibrary={FontAwesome5} iconColor="#4ade80" onPress={() => testDevice("Smoke Detector")} />
        <DeviceCard title="Doorbell" lastAlert="No alerts" iconName="notifications" IconLibrary={MaterialIcons} iconColor="#4ade80" onPress={() => testDevice("Doorbell")} />
        <DeviceCard title="Gas Detector" lastAlert="No alerts" iconName="air" IconLibrary={MaterialIcons} iconColor="#4ade80" onPress={() => testDevice("Gas Detector")} />
        
        <Text style={styles.footerText}>Polling every 2.5 seconds • Designed for accessibility</Text>
      </ScrollView>

      {/* --- SETTINGS MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettings}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Quick Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingSub}>Alert me when sensors trigger</Text>
              </View>
              <Switch value={notifsEnabled} onValueChange={setNotifsEnabled} trackColor={{ false: "#334155", true: "#3b82f6" }} />
            </View>

            <View style={styles.settingItem}>
              <View>
                <Text style={styles.settingLabel}>Alarm Sound</Text>
                <Text style={styles.settingSub}>Play sound on critical alerts</Text>
              </View>
              <Switch value={soundEnabled} onValueChange={setSoundEnabled} trackColor={{ false: "#334155", true: "#3b82f6" }} />
            </View>

            <TouchableOpacity 
              style={styles.closeBtn} 
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.closeBtnText}>Save & Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  appIconBg: { backgroundColor: '#3b82f6', padding: 10, borderRadius: 12, marginRight: 15, elevation: 8 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#94a3b8', fontSize: 13 },
  refreshButton: { backgroundColor: '#1e293b', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#334155', minWidth: 44, alignItems: 'center' },
  statusBanner: { backgroundColor: '#1e293b', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 15 },
  statusLeft: { flexDirection: 'row', alignItems: 'center' },
  statusText: { marginLeft: 8, fontWeight: '500' },
  divider: { width: 1, height: 20, backgroundColor: '#334155', marginHorizontal: 15 },
  lastUpdateText: { color: '#94a3b8', fontSize: 13 },
  settingsRow: { alignSelf: 'flex-end', marginBottom: 15, padding: 5 },
  errorBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderWidth: 1, borderColor: '#ef4444', padding: 15, borderRadius: 12, marginBottom: 20 },
  errorTitle: { color: '#ef4444', fontWeight: 'bold' },
  errorSubtitle: { color: '#94a3b8', fontSize: 12 },
  card: { backgroundColor: '#1e293b', flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#334155' },
  iconContainer: { padding: 12, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  cardSubtitle: { color: '#94a3b8', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#064e3b', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  badgeText: { color: '#4ade80', fontWeight: 'bold', fontSize: 11, marginLeft: 4 },
  footerText: { color: '#94a3b8', textAlign: 'center', fontSize: 11, marginTop: 20, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1e293b', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  modalTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  settingLabel: { color: 'white', fontSize: 17, fontWeight: '600' },
  settingSub: { color: '#94a3b8', fontSize: 13 },
  closeBtn: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  closeBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});