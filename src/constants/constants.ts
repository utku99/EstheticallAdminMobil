import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";


export const getDeviceInfo = {
    deviceId: DeviceInfo.getUniqueId(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    osVersion: DeviceInfo.getSystemVersion(),
    type: DeviceInfo.isTablet() ? 'tablet' : 'telefon',
    platform: DeviceInfo.getSystemName(),
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
};
export const SIZES = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    isTablet: DeviceInfo.isTablet(),
    isSmall: Dimensions.get('window').width <= 375 ? true : false,
};


export const temp = "https://images.unsplash.com/photo-1683009686716-ac2096a5a73b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"