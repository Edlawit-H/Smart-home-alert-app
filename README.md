# 🏠 Smart Home Alert System

A full-stack smart home monitoring application built with React Native (Expo) for the frontend and Flask for the backend. The system provides real-time sensor monitoring and alerts users when issues are detected.

## ✨ Features

- **Real-time Monitoring**: Live status tracking for multiple sensors:
  - Smoke detection
  - Gas leakage detection
  - Doorbell activity
- **Auto-refresh**: Automatically updates sensor status every 5 seconds
- **Pull-to-refresh**: Manual refresh by pulling down the screen
- **Alert Notifications**: Phone vibration when critical alerts are detected
- **RESTful API**: Backend with comprehensive endpoints for sensor management
- **Responsive Design**: Optimized for both iOS and Android devices

## 🛠️ Tech Stack

**Frontend:**
- React Native (Expo)
- React Navigation
- Axios for API calls

**Backend:**
- Flask (Python)
- Flask-CORS for cross-origin support

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Studio (for mobile testing) or Expo Go app

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask server:**
   ```bash
   python app.py
   ```
   The server will start at: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure backend URL:**
   Open `frontend/src/config.js` (or wherever you store configuration) and update:
   ```javascript
   const SERVER_URL = "http://YOUR_LOCAL_IP:5000";
   ```
   *Replace `YOUR_LOCAL_IP` with your computer's local IP address for mobile device testing.*

4. **Start the Expo development server:**
   ```bash
   npx expo start
   ```
   
5. **Run the app:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app (for physical devices)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/status` | Get current status of all sensors |
| `POST` | `/trigger` | Trigger a specific sensor (simulate alert) |
| `POST` | `/reset` | Reset all sensors to normal state |

**Example Request:**
```bash
curl -X GET http://localhost:5000/status
```

**Example Response:**
```json
{
  "sensors": {
    "smoke": "normal",
    "gas": "alert",
    "doorbell": "normal"
  },
  "last_updated": "2024-01-15T10:30:00Z"
}
```

## 📱 App Usage

1. **Home Screen**: View real-time status of all sensors
2. **Alert Indicators**: Red badges indicate active alerts
3. **Manual Refresh**: Pull down to refresh sensor data
4. **Alert Response**: Phone vibrates automatically when alerts are detected


### Testing the Backend
```bash
# Test API endpoints
curl -X POST http://localhost:5000/trigger -H "Content-Type: application/json" -d '{"sensor": "smoke"}'
curl -X POST http://localhost:5000/reset
```

## 🤝 Contributing

This is an educational project. Feel free to:
- Report issues
- Suggest improvements
- Fork and modify for your own learning

## 📝 License

This project is developed for educational purposes. All rights reserved by the creator.

## 📞 Support

For issues or questions:
1. Check that both backend and frontend servers are running
2. Verify the IP address in the frontend configuration matches your backend server IP
3. Ensure devices are on the same network (for physical device testing)

---

*Note: This is a simulation system for educational purposes. Not intended for actual home security use.*
