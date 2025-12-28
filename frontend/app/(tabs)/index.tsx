import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, StatusBar, Platform, ActivityIndicator,
  Alert, Vibration, Animated 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

interface DeviceCardProps {
  title: string;
  lastAlert: string;
  iconName: any;
  IconLibrary: any;
  iconColor: string;
  onPress: () => void;
  isAlerting: boolean; // New Prop
  theme: any;
}

const DeviceCard = ({ title, lastAlert, iconName, IconLibrary, iconColor, onPress, isAlerting, theme }: DeviceCardProps) => (
  <TouchableOpacity 
    style={[
      styles.card, 
      { backgroundColor: isAlerting ? '#7f1d1d' : theme.card, borderColor: isAlerting ? '#ef4444' : theme.border }
    ]} 
    onPress={onPress} 
    activeOpacity={0.7}
  >
    <View style={[styles.iconContainer, { backgroundColor: isAlerting ? '#ef4444' : 'rgba(74, 222, 128, 0.1)' }]}>
      <IconLibrary name={iconName} size={24} color={isAlerting ? 'white' : iconColor} />
    </View>
    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, { color: isAlerting ? 'white' : theme.text }]}>{title}</Text>
      <Text style={[styles.cardSubtitle, { color: isAlerting ? '#fecaca' : theme.subtext }]}>
        {isAlerting ? "⚠️ TRIGGERED NOW" : `Last alert: ${lastAlert}`}
      </Text>
    </View>
    <View style={[styles.badge, { backgroundColor: isAlerting ? '#ef4444' : '#064e3b' }]}>
      <Ionicons 
        name={isAlerting ? "warning" : "checkmark-circle-outline"} 
        size={16} 
        color="white" 
      />
      <Text style={styles.badgeText}>{isAlerting ? "ALERT" : "OK"}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  
  const [activeAlarms, setActiveAlarms] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("Now");

  // --- ALARM VIBRATION LOGIC ---
  useEffect(() => {
    if (activeAlarms.length > 0) {
      // Vibrate pattern: [wait, buzz, wait, buzz] 
      // This repeats until Vibration.cancel() is called
      const PATTERN = [0, 500, 200, 500]; 
      Vibration.vibrate(PATTERN, true);
    } else {
      Vibration.cancel(); // Stop buzzing when no alarms active
    }
    return () => Vibration.cancel(); // Cleanup on unmount
  }, [activeAlarms]);

  const simulateAlert = (id: string) => {
    if (!activeAlarms.includes(id)) {
      setActiveAlarms([...activeAlarms, id]);
    }
  };

  const dismissAlarms = () => {
    Vibration.cancel();
    setActiveAlarms([]);
    setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* ALARM OVERLAY (Only shows when buzzing) */}
      {activeAlarms.length > 0 && (
        <View style={styles.emergencyOverlay}>
          <MaterialIcons name="error" size={30} color="white" />
          <Text style={styles.emergencyText}>SYSTEM ALERT: SENSORS TRIGGERED</Text>
          <TouchableOpacity style={styles.dismissBtn} onPress={dismissAlarms}>
            <Text style={styles.dismissBtnText}>STOP ALARM</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.appIconBg, { backgroundColor: theme.primary }]}><Ionicons name="home" size={24} color="white" /></View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Smart Home Alerts</Text>
              <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>Monitoring Active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsRow} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Device List */}
        <DeviceCard 
          theme={theme} 
          title="Smoke Detector" 
          lastAlert="No alerts" 
          iconName="fire" 
          IconLibrary={FontAwesome5} 
          iconColor="#4ade80" 
          isAlerting={activeAlarms.includes('smoke')}
          onPress={() => simulateAlert('smoke')} 
        />
        
        <DeviceCard 
          theme={theme} 
          title="Doorbell" 
          lastAlert="10:15 AM" 
          iconName="notifications" 
          IconLibrary={MaterialIcons} 
          iconColor="#4ade80" 
          isAlerting={activeAlarms.includes('doorbell')}
          onPress={() => simulateAlert('doorbell')} 
        />
        
        <DeviceCard 
          theme={theme} 
          title="Gas Detector" 
          lastAlert="No alerts" 
          iconName="air" 
          IconLibrary={MaterialIcons} 
          iconColor="#4ade80" 
          isAlerting={activeAlarms.includes('gas')}
          onPress={() => simulateAlert('gas')} 
        />

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: theme.subtext, fontSize: 12 }}>
            Tap a card to simulate a sensor trigger.
          </Text>
          <Text style={{ color: theme.subtext, fontSize: 11, marginTop: 5 }}>
            Last sync: {lastUpdate}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  appIconBg: { padding: 10, borderRadius: 12, marginRight: 15, elevation: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 13 },
  settingsRow: { padding: 5 },
  
  // ALARM UI
  emergencyOverlay: {
    backgroundColor: '#ef4444',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  emergencyText: { color: 'white', fontWeight: 'bold', fontSize: 12, flex: 1, marginLeft: 10 },
  dismissBtn: { backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  dismissBtnText: { color: '#ef4444', fontWeight: 'bold', fontSize: 12 },

  card: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, elevation: 3 },
  iconContainer: { padding: 12, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 11, marginLeft: 4 },
});