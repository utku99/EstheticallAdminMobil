import {Pressable} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import HeaderBackIcon from '../assets/svg/homepages/HeaderBackIcon';
import EstheticLogo from '../assets/svg/common/EstheticLogo';
import HeaderMenuIcon from '../assets/svg/homepages/HeaderMenuIcon';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTab from '../components/BottomTab';
import DrawerBar from '../components/DrawerBar';
import Login from './auth/Login';
import {useSelector} from 'react-redux';
import Notification from './menu/Notification';
import Settings from './menu/Settings';
import LogOut from './menu/LogOut';
import Sharings from './bottomTab/Sharings';
import Offer from './bottomTab/Offer';
import Appointment from './bottomTab/Appointment';
import IncomingMessage from './bottomTab/IncomingMessage';
import Message from './bottomTab/Message';
import AddSharing from './bottomTab/AddSharing';
import SharingComments from './bottomTab/SharingComments';
import NewAppointment from './bottomTab/NewAppointment';
import EditOffer from './bottomTab/EditOffer';
import NewOffer from './bottomTab/NewOffer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerMenu() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="home" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTab />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="home2" component={UserStack} />
    </Tab.Navigator>
  );
}

const UserStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <HeaderBackIcon />
          </Pressable>
        ),
        headerTitle: () => (
          <Pressable onPress={() => navigation.navigate('sharing')}>
            <EstheticLogo width={133} height={38} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <HeaderMenuIcon />
          </Pressable>
        ),
        headerLeftContainerStyle: {width: '14%', alignItems: 'center'},
        headerTitleContainerStyle: {width: '100%', alignItems: 'center'},
        headerRightContainerStyle: {alignItems: 'center'},
        headerStyle: {
          backgroundColor: '#FAFAFA',
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen name="sharing" component={Sharings} />
      <Stack.Screen name="sharingcomments" component={SharingComments} />
      <Stack.Screen name="addsharing" component={AddSharing} />
      <Stack.Screen name="incomingmessage" component={IncomingMessage} />
      <Stack.Screen name="message" component={Message} />
      <Stack.Screen name="offer" component={Offer} />
      <Stack.Screen name="editoffer" component={EditOffer} />
      <Stack.Screen name="newoffer" component={NewOffer} />
      <Stack.Screen name="appointment" component={Appointment} />
      <Stack.Screen name="newappointment" component={NewAppointment} />

      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="logout" component={LogOut} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

const Root = () => {
  const {isLoggedIn} = useSelector((state: any) => state.user);

  const handleAuth = () => {
    if (isLoggedIn) {
      return <DrawerMenu />;
    } else {
      return <AuthStack />;
    }
  };

  return <NavigationContainer>{handleAuth()}</NavigationContainer>;
};

export default Root;
