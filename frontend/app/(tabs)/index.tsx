import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";

const SERVER_URL = "http://192.168.43.203:5000/status";

export default function HomeScreen() {
  const [sensors, setSensors] = useState([
    { id: "doorbell_sensor", name: "Main Door Bell", status: "OK" },
    { id: "smoke_sensor", name: "Kitchen Smoke Sensor", status: "OK" },
    { id: "gas_sensor", name: "Gas Sensor", status: "OK" },
  ]);

  const [editSensor, setEditSensor] = useState<any>(null);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch(SERVER_URL);
      const data = await res.json();

      setSensors((prev) =>
        prev.map((s) => {
          const newStatus = data[s.id];
          if (newStatus === "ALERT" && s.status !== "ALERT") {
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Error
            );
          }
          return { ...s, status: newStatus };
        })
      );
    } catch {
      // silent fail for demo
    }
  };

  const openEdit = (sensor: any) => {
    setEditSensor(sensor);
    setTempName(sensor.name);
  };

  const saveName = () => {
    setSensors((prev) =>
      prev.map((s) =>
        s.id === editSensor.id ? { ...s, name: tempName } : s
      )
    );
    setEditSensor(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Home Alerts</Text>

      <FlatList
        data={sensors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.status === "ALERT" ? styles.alert : styles.ok,
            ]}
          >
            <View style={styles.row}>
              <MaterialIcons
                name={
                  item.id === "doorbell_sensor"
                    ? "doorbell"
                    : item.id === "smoke_sensor"
                    ? "fireplace"
                    : "gas-meter"
                }
                size={28}
                color={item.status === "ALERT" ? "#b00020" : "#2e7d32"}
              />

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.sensorName}>{item.name}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === "ALERT"
                      ? styles.alertText
                      : styles.okText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openEdit(item)}>
                <MaterialIcons name="edit" size={22} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Modal */}
      <Modal visible={!!editSensor} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Rename Sensor</Text>

            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setEditSensor(null)}
              >
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveName}>
                <Text style={styles.save}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },

  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  row: { flexDirection: "row", alignItems: "center" },

  ok: { backgroundColor: "#e8f5e9" },
  alert: { backgroundColor: "#fdecea" },

  sensorName: { fontSize: 16, fontWeight: "600" },
  status: { marginTop: 4, fontWeight: "bold" },
  okText: { color: "#2e7d32" },
  alertText: { color: "#b00020" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: { color: "#777" },
  save: { color: "#1976d2", fontWeight: "bold" },
});
