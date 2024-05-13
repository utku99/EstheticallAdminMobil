import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {Component} from 'react';
import SharingIcon from '../assets/svg/bottomTab/SharingIcon';
import MessageIcon from '../assets/svg/bottomTab/MessageIcon';
import CalendarIcon from '../assets/svg/bottomTab/CalendarIcon';
import OfferIcon from '../assets/svg/bottomTab/OfferIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import IntLabel from './IntLabel';

const BottomTab = ({props}: any) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  let routeName =
    props?.state?.routes[0]?.state?.routes[
      props.state.routes[0].state.routes.length - 1
    ]?.name ?? 'sharing';

  return (
    <View
      className="bg-[#F9F9F9]/[.94] h-[70px] flex-row items-center justify-between px-[3%] border-t border-customGray/[.3]"
      style={{height: insets.bottom + 70, paddingBottom: insets.bottom}}>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('sharing')}>
        <SharingIcon fill={routeName == 'sharing' ? '#FF8170' : '#4D4A48'} />
        <Text
          className={`${
            routeName == 'sharing' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('sharings')}
        </Text>
      </Pressable>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('incomingmessage')}>
        <MessageIcon
          fill={routeName == 'incomingmessage' ? '#FF8170' : '#4D4A48'}
        />
        <Text
          className={`${
            routeName == 'incomingmessage'
              ? 'text-customOrange'
              : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('messages')}
        </Text>
      </Pressable>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('appointment')}>
        <CalendarIcon
          fill={routeName == 'appointment' ? '#FF8170' : '#4D4A48'}
        />
        <Text
          className={`${
            routeName == 'appointment' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('appointments')}
        </Text>
      </Pressable>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('offer')}>
        <OfferIcon fill={routeName == 'offer' ? '#FF8170' : '#4D4A48'} />
        <Text
          className={`${
            routeName == 'offer' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('offers')}
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomTab;
