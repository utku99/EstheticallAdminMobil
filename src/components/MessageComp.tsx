import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../constants/constants';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import TrashIcon from '../assets/svg/firm/TrashIcon';
import {useSelector} from 'react-redux';

const messagesType: any = [
  {value: 1, label: 'Randevu'},
  {value: 2, label: 'Teklif'},
  {value: 3, label: 'Paket'},
  {value: 4, label: 'Genel'},
];

const MessageComp = ({item}: any) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const {connection} = useSelector((state: any) => state.hub);
  const {user} = useSelector((state: any) => state.user);

  return (
    <Swipeable
      renderLeftActions={() => (
        <TouchableOpacity
          onPress={() => ''}
          className="w-[80] bg-customOrange rounded-l-lg items-center justify-center">
          <View className="bg-white w-[24] h-[24] items-center justify-center rounded-md">
            <TrashIcon fill={'#FF8170'} />
          </View>
          <Text className="text-white text-base font-poppinsMedium">Sil</Text>
        </TouchableOpacity>
      )}
      renderRightActions={() => null}
      onSwipeableOpen={() => setOpen(true)}
      onSwipeableClose={() => setOpen(false)}>
      <View className={`${open ? 'bg-customOrange' : 'bg-white'}`}>
        <Pressable
          onPress={() => {
            connection.invoke('LeaveRoom');
            connection.invoke('JoinRoom', {
              RoomID: item.roomID,
              sender_id: item.correspondentID,
              sender_type: item.correspondentType,
              receiver_id:
                user.companyOfficeId == 0
                  ? user.companyId
                  : user.companyOfficeId,
              receiver_type: user.companyOfficeId == 0 ? 2 : 3,
            });
            navigation.navigate('message', {selectedUser: item});
          }}
          className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3`}
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
              Mesaj Tipi:{' '}
              <Text className="font-poppinsMedium">
                {
                  messagesType.find(
                    (type: any) => type.value == item.messagesType,
                  ).label
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
      </View>
    </Swipeable>
  );
};

export default MessageComp;
