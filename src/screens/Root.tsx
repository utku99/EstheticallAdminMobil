import {Pressable} from 'react-native';
import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
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
import EditOffer from './bottomTab/EditOffer';
import NewOffer from './bottomTab/NewOffer';
import EditAppointment from './bottomTab/EditAppointment';
import * as signalR from '@microsoft/signalr';
import {
  addMessage,
  setConnection,
  setConnectionId,
  setMessage,
  setTotalUsers,
} from '../redux/slices/hubConnection';
import VideoPlayer from './auth/VideoPlayer';

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
      <Stack.Screen name="editappointment" component={EditAppointment} />

      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="logout" component={LogOut} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="video" component={VideoPlayer} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

const Root = () => {
  const {isLoggedIn} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const temp = new signalR.HubConnectionBuilder()
    .withUrl(`https://estheticallv2-api.ranna.com.tr/chathub`)
    .configureLogging(signalR.LogLevel.None)
    .build();

  dispatch(setConnection(temp));

  temp.on('forceDisconnect', message => {
    temp.stop();
  });

  temp.on('GetConnectionId', message => {
    dispatch(setConnectionId(message));
  });

  temp.on('MessageReceived', message => {
    const now = new Date();
    const createdDate = `${now.getHours()}:${
      (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
    }`;
    dispatch(
      addMessage({
        message: message.message,
        createdDate: createdDate,
        image0: message.images[0],
        image1: message.images[1],
        image2: message.images[2],
        image3: message.images[3],
        image4: message.images[4],
      }),
    );
  });

  temp.on('updateTotals', data => {
    dispatch(setTotalUsers(data));
  });

  temp.start();

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
