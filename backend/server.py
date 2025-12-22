from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return "Smart Home Alert System Server is running"

sensor_state = {
    "smoke_sensor": "OK",
    "gas_sensor": "OK",
    "doorbell_sensor": "OK",
}

@app.route("/status", methods=["GET"])
def get_status():
    return jsonify({
        **sensor_state,
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route("/trigger", methods=["POST"])
def trigger_sensor():
    data = request.json
    sensor = data.get("sensor")
    value = data.get("value")

    if sensor in sensor_state:
        sensor_state[sensor] = value
        return jsonify({"message": f"{sensor} set to {value}"})

    return jsonify({"error": "Invalid sensor"}), 400

@app.route("/reset", methods=["POST"])
def reset_sensors():
    for key in sensor_state:
        sensor_state[key] = "OK"
    return jsonify({"message": "All sensors reset to OK"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
