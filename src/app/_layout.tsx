import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BrandSplash } from '@/components/BrandSplash';
import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { ToastProvider } from '@/context/ToastContext';
import { colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

function RootNavigator() {
  const { ready } = useProfile();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Hand off native → branded splash immediately
    SplashScreen.hide();
    const timer = setTimeout(() => setSplashDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!ready || !splashDone) {
    return <BrandSplash />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ProfileProvider>
        <ToastProvider>
          <RootNavigator />
        </ToastProvider>
      </ProfileProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
