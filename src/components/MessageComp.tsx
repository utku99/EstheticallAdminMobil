import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import IntLabel from './IntLabel';

const MessageComp = ({item}: any) => {
  const navigation = useNavigation<any>();
  const {connection} = useSelector((state: any) => state.hub);
  const {user} = useSelector((state: any) => state.user);

  const messagesType: any = [
    {value: 1, label: IntLabel('appointment')},
    {value: 2, label: IntLabel('offer')},
    {value: 3, label: IntLabel('packet')},
    {value: 4, label: IntLabel('general')},
  ];

  return (
    <Pressable
      onPress={() => {
        connection.invoke('LeaveRoom');
        connection.invoke('JoinRoom', {
          RoomID: item.roomID,
          sender_id: item.correspondentID,
          sender_type: item.correspondentType,
          receiver_id:
            user.companyOfficeId == 0 ? user.companyId : user.companyOfficeId,
          receiver_type: user.companyOfficeId == 0 ? 2 : 3,
        });
        navigation.navigate('message', {selectedUser: item});
      }}
      className={` border ${
        item?.changeState ? 'border-customLightGray' : 'border-customLightGray'
      } rounded-xl bg-white p-[10px] flex-row items-center space-x-3`}
      style={{width: SIZES.width * 0.95}}>
      <View className="relative">
        <Image
          source={{uri: item?.correspondentLogo ?? ''}}
          className=" w-[80px] h-[80px] rounded-full border-[0.6px] border-customGray"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1">
        <Text className="text-customGray font-poppinsSemiBold text-sm ">
          {item?.correspondentName}
        </Text>
        <Text
          numberOfLines={1}
          className="text-customGray font-poppinsSemiBold text-sm ">
          {IntLabel('message_type')}:{' '}
          <Text className="font-poppinsMedium">
            {
              messagesType.find((type: any) => type.value == item.messagesType)
                .label
            }
          </Text>
        </Text>
        <Text
          numberOfLines={1}
          className="text-customGray font-poppinsRegular text-sm">
          {item?.message}
        </Text>
      </View>
      <Text className="text-customGray font-medium text-sm ">
        {item?.createdDate}
      </Text>
    </Pressable>
  );
};

export default MessageComp;
