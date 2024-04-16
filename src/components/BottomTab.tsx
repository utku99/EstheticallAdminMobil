import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {Component} from 'react';
import SharingIcon from '../assets/svg/bottomTab/SharingIcon';
import MessageIcon from '../assets/svg/bottomTab/MessageIcon';
import CalendarIcon from '../assets/svg/bottomTab/CalendarIcon';
import OfferIcon from '../assets/svg/bottomTab/OfferIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import IntLabel from './IntLabel';

const BottomTab = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-[#F9F9F9]/[.94] h-[70px] flex-row items-center justify-between px-[3%] border-t border-customGray/[.3]"
      style={{height: insets.bottom + 70, paddingBottom: insets.bottom}}>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('sharing')}>
        <SharingIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('sharings')}
        </Text>
      </Pressable>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('incomingmessage')}>
        <MessageIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('messages')}
        </Text>
      </Pressable>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('appointment')}>
        <CalendarIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('appointments')}
        </Text>
      </Pressable>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('offer')}>
        <OfferIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('offers')}
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomTab;
