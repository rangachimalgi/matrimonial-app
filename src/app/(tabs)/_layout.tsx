import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

function TabIcon({
  color,
  focused,
  size,
  outline,
  filled,
}: {
  color: string;
  focused: boolean;
  size: number;
  outline: IconName;
  filled: IconName;
}) {
  return (
    <Ionicons
      name={focused ? filled : outline}
      size={size}
      color={color}
    />
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 10);

  return (
    <Tabs
      // We apply bottom inset ourselves so the bar doesn't spill under system nav
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 54 + bottomInset,
          paddingTop: 6,
          paddingBottom: bottomInset,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={String(color)}
              focused={focused}
              size={size}
              outline="home-outline"
              filled="home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: 'Likes You',
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: colors.orange,
            color: colors.white,
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={String(color)}
              focused={focused}
              size={size}
              outline="heart-outline"
              filled="heart"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={String(color)}
              focused={focused}
              size={size}
              outline="sparkles-outline"
              filled="sparkles"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={String(color)}
              focused={focused}
              size={size}
              outline="chatbubble-outline"
              filled="chatbubble"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={String(color)}
              focused={focused}
              size={size}
              outline="person-outline"
              filled="person"
            />
          ),
        }}
      />
    </Tabs>
  );
}
