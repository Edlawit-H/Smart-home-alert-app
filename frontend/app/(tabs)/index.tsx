import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Vibration,
  RefreshControl,
  ScrollView,
} from "react-native";

const SERVER_URL = "http://192.168.43.203:5000";

type SensorStatus = "OK" | "ALERT";

export default function HomeScreen() {
  const [sensors, setSensors] = useState({
    smoke_sensor: "OK" as SensorStatus,
    gas_sensor: "OK" as SensorStatus,
    doorbell_sensor: "OK" as SensorStatus,
  });

  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/status`);
      const data = await response.json();

      setSensors({
        smoke_sensor: data.smoke_sensor,
        gas_sensor: data.gas_sensor,
        doorbell_sensor: data.doorbell_sensor,
      });

      // 🔔 VIBRATION LOGIC
      if (
        data.smoke_sensor === "ALERT" ||
        data.gas_sensor === "ALERT" ||
        data.doorbell_sensor === "ALERT"
      ) {
        Vibration.vibrate(500);
      }
    } catch (error) {
      console.error("Failed to fetch sensor status", error);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStatus();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🏠 Smart Home Alert System</Text>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SensorCard
          name="Smoke Sensor"
          status={sensors.smoke_sensor}
          danger
        />
        <SensorCard
          name="Gas Sensor"
          status={sensors.gas_sensor}
          danger
        />
        <SensorCard
          name="Doorbell"
          status={sensors.doorbell_sensor}
          danger={false}
        />

        <Text style={styles.footer}>
          Pull down to refresh sensor status
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SensorCard({
  name,
  status,
  danger,
}: {
  name: string;
  status: SensorStatus;
  danger: boolean;
}) {
  const isAlert = status === "ALERT";

  return (
    <View
      style={[
        styles.card,
        { borderLeftColor: isAlert ? "#e63946" : "#2a9d8f" },
      ]}
    >
      <Text style={styles.sensorName}>{name}</Text>
      <Text
        style={[
          styles.status,
          { color: isAlert ? "#e63946" : "#2a9d8f" },
        ]}
      >
        {isAlert ? "⚠ ALERT" : "✔ OK"}
      </Text>

      {isAlert && danger && (
        <Text style={styles.warningText}>
          Immediate attention required!
        </Text>
      )}

      {isAlert && !danger && (
        <Text style={styles.warningText}>
          Someone is at the door 🚪
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 6,
    elevation: 3,
  },
  sensorName: {
    fontSize: 18,
    fontWeight: "600",
  },
  status: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "bold",
  },
  warningText: {
    marginTop: 6,
    color: "#e63946",
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: "#6c757d",
    marginTop: 12,
  },
});
