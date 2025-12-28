import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { ThemeProvider } from '../context/ThemeContext';

// Configure how notifications look when they arrive while the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldVibrate: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    async function setupApp() {
      // 1. Request Notification Permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
        return;
      }

      // 2. Create Android Vibration Channel (Crucial for background vibration)
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }

    setupApp();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Main Tab Navigation */}
          <Stack.Screen name="(tabs)" />
          {/* Settings opens as a Modal (slides up) */}
          <Stack.Screen 
            name="settings" 
            options={{ 
              presentation: 'modal',
              animation: 'slide_from_bottom' 
            }} 
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}