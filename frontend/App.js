import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import {
  AuthenticatedUsersStackNavigator,
  UnauthenticatedUserStackNavigator,
} from './AppComponents/StackNavigators';
import ManagmentSystemProvider, {
  ManagmentSystem,
} from './store/AppGeneralManagmentSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import Colors from './constants/colors';
import CustomStatusBar from './util/statusBar';

function Navigation() {
  const dataContext = useContext(ManagmentSystem);

  const unauthenticatedtUser = !dataContext.isAuthenticated;
  const authenticatedUser = dataContext.isAuthenticated;
  return (
    <NavigationContainer>
      {unauthenticatedtUser && <UnauthenticatedUserStackNavigator />}
      {authenticatedUser && <AuthenticatedUsersStackNavigator />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dataContext = useContext(ManagmentSystem);

  useEffect(() => {
    async function fetchToken() {
      await SplashScreen.preventAutoHideAsync();

      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        dataContext.Authenticate(storedToken);
      }

      setIsTryingLogin(false);
      SplashScreen.hideAsync();
    }
    fetchToken();

    async function fetchConfirmCode() {
      try {
        const confirmCode = await AsyncStorage.getItem('confirmation_code');
        if (confirmCode) {
          dataContext.cofirmCode(confirmCode);
        }
      } catch (error) {
        throw error.message;
      }
    }
    fetchConfirmCode();

    async function getUsername() {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          dataContext.signUpSuccessful(username);
        }
      } catch (error) {
        throw error.message;
      }
    }
    getUsername();

    async function fetchTheme() {
      try {
        const theme = await AsyncStorage.getItem('theme');
        const themeIndex = await AsyncStorage.getItem('themeIndex');
        if (theme && themeIndex) {
          dataContext.setTheme(theme, themeIndex);
        }
      } catch (error) {
        throw error.message;
      }
    }
    fetchTheme();
  }, []);

  if (isTryingLogin) {
    return null;
  }
  return <Navigation />;
}

export default function App() {
  return (
    
    <ManagmentSystemProvider>
      <CustomStatusBar />
      <Root />
    </ManagmentSystemProvider>
  );
}

const styles = StyleSheet.create({
  safeAeraContainer: {
    height: '100%',
  },
  statusbarView: {
    borderStartColor: Colors.black,
  },
});
