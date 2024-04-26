import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottonTabNavigator from './BottomTabNavigator';
import SubMenuScreen from '../screens/SubScreens/SubMenuScreen';
import SubProfileScreen from '../screens/SubScreens/SubProfileScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

export function UnauthenticatedUserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function AuthenticatedUsersStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllOptions"
        component={BottonTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubMenuScreen"
        component={SubMenuScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubProfileScreen"
        component={SubProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
