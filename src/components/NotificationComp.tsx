import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import TrashIcon from '../assets/svg/userMenu/TrashIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import moment from 'moment';
import WebClient, {toast} from '../utility/WebClient';
import {useSelector} from 'react-redux';
import IntLabel from './IntLabel';

interface props {
  item?: any;
  setClicked?: any;
}

const NotificationComp: React.FC<props> = ({item, setClicked}) => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center justify-between space-x-4`}
      style={{width: SIZES.width * 0.95}}>
      <View className=" flex-1 space-y-2">
        <View className="flex flex-row items-center space-x-1">
          <Text className="text-customGray font-poppins text-sm font-semibold">
            {IntLabel('from_who')}:
          </Text>
          <Text className="text-customGray font-poppins text-sm ">
            {item?.userName ?? IntLabel('system')}
          </Text>
        </View>

        <Text className="text-customGray font-poppins text-sm">
          {item?.content}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Post('/api/Notification/RemoveCompanyPushMessage', {
            userID: user?.id,
            userPushNotificationID: item?.userPushNotificationId,
          }).then(res => {
            if (res.data.resultCode == '100') {
              toast(res.data.resultMessage);
              setClicked(true);
            } else {
              toast(res.data.resultMessage);
            }
          });
        }}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationComp;
