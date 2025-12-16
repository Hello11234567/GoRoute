//지도 메인화면

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) =>
             <Image source = {require('@/assets/images/map2.png')} 
                    style = {{width:24, height:24, tintColor:undefined, opacity: focused ? 1 : 0.6 }} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) =>
             <Image source = {require('@/assets/images/explore_korea.png')} 
                    style = {{width:24, height:24, tintColor:undefined, opacity: focused ? 1 : 0.6 }} />,
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: 'My',
          tabBarIcon: ({ color, focused }) =>
             <Image source = {require('@/assets/images/my.png')} 
                    style = {{width:24, height:24, tintColor:undefined, opacity: focused ? 1 : 0.6 }} />,
        }}
      />
    </Tabs>
  );
}
