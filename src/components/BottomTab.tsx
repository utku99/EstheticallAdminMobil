import {Pressable, Text, View} from 'react-native';
import React, {Component} from 'react';
import SharingIcon from '../assets/svg/bottomTab/SharingIcon';
import MessageIcon from '../assets/svg/bottomTab/MessageIcon';
import CalendarIcon from '../assets/svg/bottomTab/CalendarIcon';
import OfferIcon from '../assets/svg/bottomTab/OfferIcon';

export class BottomTab extends Component {
  render() {
    const {navigation}: any = this.props;

    return (
      <View className="bg-[#F9F9F9]/[.94] h-[70px] flex-row items-center justify-between px-[3%] border-t border-customGray/[.3]">
        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('sharing')}>
          <SharingIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Paylaşımlar
          </Text>
        </Pressable>
        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('incomingmessage')}>
          <MessageIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Mesajlar
          </Text>
        </Pressable>
        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('appointment')}>
          <CalendarIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Randevular
          </Text>
        </Pressable>
        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('offer')}>
          <OfferIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Teklifler
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default BottomTab;
