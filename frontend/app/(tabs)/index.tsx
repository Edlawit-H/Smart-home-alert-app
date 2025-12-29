import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Vibration,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const SERVER_URL = "http://192.168.43.203:5000"; // Your server IP

/* ================= DEVICE CARD ================= */
interface DeviceCardProps {
  title: string;
  lastAlert: string;
  iconName: any;
  IconLibrary: any;
  iconColor: string;
  onPress: () => void;
  isAlerting: boolean;
  theme: any;
}

const DeviceCard = ({
  title,
  lastAlert,
  iconName,
  IconLibrary,
  iconColor,
  onPress,
  isAlerting,
  theme,
}: DeviceCardProps) => (
  <TouchableOpacity
    style={[
      styles.card,
      {
        backgroundColor: isAlerting ? "#7f1d1d" : theme.card,
        borderColor: isAlerting ? "#ef4444" : theme.border,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[
        styles.iconContainer,
        { backgroundColor: isAlerting ? "#ef4444" : "rgba(74, 222, 128, 0.1)" },
      ]}
    >
      <IconLibrary name={iconName} size={24} color={isAlerting ? "white" : iconColor} />
    </View>
    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, { color: isAlerting ? "white" : theme.text }]}>
        {title}
      </Text>
      <Text style={[styles.cardSubtitle, { color: isAlerting ? "#fecaca" : theme.subtext }]}>
        {isAlerting ? "⚠ ALERT" : `Last alert: ${lastAlert}`}
      </Text>
    </View>
    <View style={[styles.badge, { backgroundColor: isAlerting ? "#ef4444" : "#064e3b" }]}>
      <Ionicons name={isAlerting ? "warning" : "checkmark-circle-outline"} size={16} color="white" />
      <Text style={styles.badgeText}>{isAlerting ? "ALERT" : "OK"}</Text>
    </View>
  </TouchableOpacity>
);

/* ================= HOME SCREEN ================= */
export default function HomeScreen() {
  const router = useRouter();
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#fff",
    text: "#000",
    subtext: "#555",
    card: "#f5f5f5",
    border: "#ddd",
    primary: "#4ade80",
  };
  const isDark = themeContext?.isDark || false;

  const [alerts, setAlerts] = useState<string[]>([]);
  const vibratingRef = useRef(false);
  const [lastUpdate, setLastUpdate] = useState("Now");

  /* ===== POLL SERVER FOR ALERTS ===== */
  const fetchStatus = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/status`);
      const data = await res.json();

      const active: string[] = [];
      if (data.smoke_sensor === "ALERT") active.push("smoke");
      if (data.gas_sensor === "ALERT") active.push("gas");
      if (data.doorbell_sensor === "ALERT") active.push("doorbell");

      // VIBRATION LOGIC
      if (active.length > 0 && !vibratingRef.current) {
        vibratingRef.current = true;
        Vibration.vibrate([0, 700, 300, 700], true);
      } else if (active.length === 0 && vibratingRef.current) {
        Vibration.cancel();
        vibratingRef.current = false;
      }

      setAlerts(active);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      console.log("Server unreachable");
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  const stopAlarm = async () => {
    try {
      await fetch(`${SERVER_URL}/reset`, { method: "POST" });
    } catch (err) {
      console.log("Failed to reset alarm");
    }
    Vibration.cancel();
    vibratingRef.current = false;
    setAlerts([]);
    setLastUpdate(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* ALERT OVERLAY */}
      {alerts.length > 0 && (
        <View style={styles.emergencyOverlay}>
          <MaterialIcons name="error" size={30} color="white" />
          <Text style={styles.emergencyText}>SYSTEM ALERT: SENSORS TRIGGERED</Text>
          <TouchableOpacity style={styles.dismissBtn} onPress={stopAlarm}>
            <Text style={styles.dismissBtnText}>STOP ALARM</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.appIconBg, { backgroundColor: theme.primary }]}>
              <Ionicons name="home" size={24} color="white" />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Smart Home Alerts</Text>
              <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>Monitoring Active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsRow} onPress={() => router.push("/settings")}>
            <Ionicons name="settings-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Device Cards */}
        <DeviceCard
          theme={theme}
          title="Smoke Sensor"
          lastAlert="No alerts"
          iconName="fire"
          IconLibrary={FontAwesome5}
          iconColor="#4ade80"
          isAlerting={alerts.includes("smoke")}
          onPress={() => {}}
        />
        <DeviceCard
          theme={theme}
          title="Doorbell"
          lastAlert="No alerts"
          iconName="notifications"
          IconLibrary={MaterialIcons}
          iconColor="#4ade80"
          isAlerting={alerts.includes("doorbell")}
          onPress={() => {}}
        />
        <DeviceCard
          theme={theme}
          title="Gas Sensor"
          lastAlert="No alerts"
          iconName="air"
          IconLibrary={MaterialIcons}
          iconColor="#4ade80"
          isAlerting={alerts.includes("gas")}
          onPress={() => {}}
        />

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: theme.subtext, fontSize: 12 }}>
            Polling every 5s • Tap a card to test alert
          </Text>
          <Text style={{ color: theme.subtext, fontSize: 11, marginTop: 5 }}>
            Last sync: {lastUpdate}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  scrollContent: { padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  appIconBg: { padding: 10, borderRadius: 12, marginRight: 15, elevation: 4 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  headerSubtitle: { fontSize: 13 },
  settingsRow: { padding: 5 },

  emergencyOverlay: { backgroundColor: "#ef4444", padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", zIndex: 100 },
  emergencyText: { color: "white", fontWeight: "bold", fontSize: 12, flex: 1, marginLeft: 10 },
  dismissBtn: { backgroundColor: "white", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  dismissBtnText: { color: "#ef4444", fontWeight: "bold", fontSize: 12 },

  card: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, elevation: 3 },
  iconContainer: { padding: 12, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: "bold", flexShrink: 1 },
  cardSubtitle: { fontSize: 12 },
  badge: { flexDirection: "row", alignItems: "center", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  badgeText: { color: "white", fontWeight: "bold", fontSize: 11 },
});
