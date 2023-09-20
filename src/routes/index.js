import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { generateFcmToken, registerForRemoteMessages } from '../utils/helper';

// import { BASE_URL } from "@env";

const AppStack = () => {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        // registerForRemoteMessages()
        generateFcmToken();
    }, [])

    return (
        <Stack.Navigator
            drawerPosition="left"
            initialRouteName={"Home"}
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'push',
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    )
}


const Navigations = () => {


    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default Navigations;

const styles = StyleSheet.create(
    {
        loaderContainer: {
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)