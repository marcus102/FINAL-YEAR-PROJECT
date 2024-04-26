import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CameraScreen from '../screens/CameraScreen';
import MenuScreen from '../screens/MenuScreen';
import ProlileScreen from '../screens/ProfileScreen';
import Colors from '../constants/colors';
import Icons from '../util/Icons';

const BottonTabs = createBottomTabNavigator();

export default function BottonTabNavigator() {
  return (
    <BottonTabs.Navigator
      initialRouteName="CameraScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          height: Platform.select({ ios: 80, android: 70 }),
          marginBottom: Platform.select({ ios: 20, android: 10 }),
          marginHorizontal: 10,
          borderRadius: 15,
          paddingVertical: Platform.select({ ios: 15, android: 0 }),
          elevation: 3,
          shadowColor: Colors.gray,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
      }}
    >
      <BottonTabs.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icons icon={focused ? 'menu' : 'menu-outline'} size={45} color={Colors.black} />,
          headerShown: false,
        }}
      />
      <BottonTabs.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icons icon={focused ? 'camera' : 'camera-outline'} size={40} color={Colors.black} />,
        }}
      />
      <BottonTabs.Screen
        name="ProfileScreen"
        component={ProlileScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icons icon={focused ? 'person' : 'person-outline'} size={35} color={Colors.black} />,
          headerShown: false,
        }}
      />
    </BottonTabs.Navigator>
  );
}

const styles = StyleSheet.create({});
