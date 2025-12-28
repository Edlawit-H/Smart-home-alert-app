import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  ScrollView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
// Import this to fix the overlapping issue
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { isDark, setIsDark, theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Get the safe area measurements

  const [notifsEnabled, setNotifsEnabled] = useState(true);
  const [alarmSound, setAlarmSound] = useState(true);

  const triggerTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚨 SENSOR ALERT",
        body: "Smoke detected in Living Room!",
        sound: alarmSound, 
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Dynamic Status Bar color */}
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* FIXED HEADER: Uses insets.top to push the text below the clock/camera */}
      <View style={[
        styles.header, 
        { 
          backgroundColor: theme.card,
          borderBottomColor: theme.border,
          paddingTop: Platform.OS === 'android' ? insets.top + 10 : 10, // Dynamic padding
          height: Platform.OS === 'android' ? insets.top + 60 : 70
        }
      ]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        
        {/* Empty view for balance */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Appearance</Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <MaterialIcons name="brightness-6" size={22} color={theme.primary} />
              <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={setIsDark} 
              trackColor={{ false: "#334155", true: theme.primary }}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Alert Preferences</Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <MaterialIcons name="notifications-active" size={22} color={theme.primary} />
              <Text style={[styles.label, { color: theme.text }]}>Enable Notifications</Text>
            </View>
            <Switch value={notifsEnabled} onValueChange={setNotifsEnabled} />
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <MaterialIcons name="volume-up" size={22} color={theme.primary} />
              <Text style={[styles.label, { color: theme.text }]}>Alarm Sound & Vibration</Text>
            </View>
            <Switch value={alarmSound} onValueChange={setAlarmSound} />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.testBtn, { backgroundColor: theme.primary }]}
          onPress={triggerTestNotification}
        >
          <Text style={styles.testBtnText}>Simulate Background Alert (5s)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    // Android Shadow
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollContent: { padding: 20 },
  sectionTitle: { 
    fontWeight: 'bold', 
    marginVertical: 15, 
    textTransform: 'uppercase', 
    fontSize: 12, 
    marginLeft: 5 
  },
  card: { borderRadius: 15, overflow: 'hidden' },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 18 
  },
  labelGroup: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '500', marginLeft: 12 },
  divider: { height: 1, marginHorizontal: 15 },
  testBtn: { 
    marginTop: 30, 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center', 
    elevation: 2 
  },
  testBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});