import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomePage from './screens/HomePage';
import SchedulePage from './screens/SchedulePage';
import { Provider as PaperProvider } from 'react-native-paper';
import { OperationContextProvider } from './store/operation-context';
import { colors } from './constants/colors';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle : {backgroundColor : colors.openColor},
          tabBarActiveTintColor : colors.whiteColor,
          tabBarInactiveTintColor : colors.blackColor,
          tabBarLabelStyle : { fontSize : 14, fontWeight : 'bold'},
          tabBarIndicatorStyle: {backgroundColor : colors.closedColor, height: 50}
        }}
      >
        <Tab.Screen name="Anasayfa" component={HomePage} />
        <Tab.Screen name="Takvim" component={SchedulePage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <OperationContextProvider >
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="HomePage" component={MyTabs} options={{ headerShown: false }} />
              <Stack.Screen name="SchedulePage" component={SchedulePage} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </OperationContextProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor : colors.whiteColor
  }
});