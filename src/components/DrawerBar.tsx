import React, {Component} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import SettingsIcon from '../assets/svg/userMenu/SettingsIcon';
import LogOutIcon from '../assets/svg/userMenu/LogOutIcon';
import {useNavigation} from '@react-navigation/native';
import IntLabel from './IntLabel';

const DrawerBar = ({props}: any) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={IntLabel('notifications')}
        onPress={() => navigation.navigate('notification')}
        icon={() => <NotificationIcon fill={'#FF8170'} />}
        pressColor="#8F7A6C"
        labelStyle={{
          fontFamily: 'Poppins-SemiBold',
          color: '#4D4A48',
          fontSize: 14,
        }}
      />
      <DrawerItem
        label={IntLabel('settings')}
        onPress={() => navigation.navigate('settings')}
        icon={() => <SettingsIcon />}
        pressColor="#8F7A6C"
        labelStyle={{
          fontFamily: 'Poppins-SemiBold',
          color: '#4D4A48',
          fontSize: 14,
        }}
      />
      <DrawerItem
        label={IntLabel('exit')}
        onPress={() => navigation.navigate('logout')}
        icon={() => <LogOutIcon />}
        pressColor="#8F7A6C"
        labelStyle={{
          fontFamily: 'Poppins-SemiBold',
          color: '#4D4A48',
          fontSize: 14,
        }}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerBar;
