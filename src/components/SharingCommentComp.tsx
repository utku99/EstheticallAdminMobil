import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import TrashIcon from '../assets/svg/firm/TrashIcon';
import IntLabel from './IntLabel';

const SharingCommentComp = ({item}: any) => {
  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-2`}
      style={{width: SIZES.width * 0.95}}>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2  w-[50%]">
          <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{uri: item?.logo}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-customGray font-poppinsRegular text-xxs ">
              {item?.fullName}
            </Text>
            <Text className="text-customGray font-poppinsRegular text-xxs ">
              {item?.location}
            </Text>
            {/* <Text className="text-customGray font-poppinsRegular text-xxs ">
              Lorem, ipsum.
            </Text> */}
          </View>
        </View>

        <Text
          numberOfLines={1}
          className="text-customGray font-poppinsRegular text-xxs ">
          {item?.serviceName}
        </Text>

        <TouchableOpacity
          onPress={() => ''}
          className="flex-row items-center gap-1">
          <View className="bg-customOrange items-center justify-center w-[24] h-[24] rounded-sm">
            <TrashIcon fill={'white'} />
          </View>
          <Text className="text-customGray font-poppinsRegular text-base ">
            {IntLabel('delete')}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text className="text-customGray font-poppinsRegular text-xxs ">
          {item?.comment}
        </Text>
      </View>
    </View>
  );
};

export default SharingCommentComp;
