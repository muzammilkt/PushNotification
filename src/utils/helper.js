import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const generateFcmToken = async () => {
    const token = await messaging().getToken();
    console.log(Platform.OS, token);
    return token;
}

export const registerForRemoteMessages = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        console.log('Device registered for remote messages');
    } catch (error) {
        console.error('Error registering for remote messages:', error);
    }
}