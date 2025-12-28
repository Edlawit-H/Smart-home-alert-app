import serial
import requests
import time

# -------------------------------
# CONFIGURATION
# -------------------------------
BLUETOOTH_PORT = "COM5"   # ⚠️ change this to your Bluetooth COM port
BAUD_RATE = 9600
SERVER_URL = "http://127.0.0.1:5000/trigger"

# -------------------------------
# SENSOR MAPPING
# -------------------------------
SENSOR_MAP = {
    "SMOKE": "smoke_sensor",
    "GAS": "gas_sensor",
    "DOORBELL": "doorbell_sensor"
}

def send_to_server(sensor, value):
    payload = {
        "sensor": sensor,
        "value": value
    }

    try:
        response = requests.post(SERVER_URL, json=payload)
        print(f"✅ Sent {payload} → Server response {response.status_code}")
    except Exception as e:
        print("❌ Error sending to server:", e)

def main():
    print("🔵 Connecting to Bluetooth...")
    ser = serial.Serial(BLUETOOTH_PORT, BAUD_RATE, timeout=1)
    time.sleep(2)
    print("✅ Bluetooth connected")

    while True:
        try:
            line = ser.readline().decode().strip()
            if not line:
                continue

            print("📥 Received:", line)

            # Expected format: SENSOR:VALUE
            if ":" in line:
                sensor_key, value = line.split(":", 1)

                sensor_key = sensor_key.upper()
                value = value.upper()

                if sensor_key in SENSOR_MAP:
                    send_to_server(SENSOR_MAP[sensor_key], value)

        except KeyboardInterrupt:
            print("🛑 Stopped by user")
            break
        except Exception as e:
            print("⚠️ Error:", e)

if __name__ == "__main__":
    main()
