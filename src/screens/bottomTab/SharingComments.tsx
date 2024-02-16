import {View, Text, FlatList, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {SIZES, temp} from '../../constants/constants';
import SharingCommentComp from '../../components/SharingCommentComp';

const SharingComments = () => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  return (
    <MenuWrapper title="Paylaşımlar - Yorumlar">
      <HandleData
        data={['']}
        loading={loading}
        title="Paylaşımınız Bulunmamaktadır">
        <View className="w-[95%]">
          <View className="bg-white rounded-xl overflow-hidden border border-customLightGray mb-[15]">
            <View className="w-full aspect-[1.5] ">
              <Image
                source={{uri: temp}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="px-[10px] py-3 space-y-1">
              <Text
                numberOfLines={2}
                className="font-poppinsRegular text-xs text-customGray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                illo, possimus repellendus ex quae rerum ducimus iusto facilis
                porro veniam.
              </Text>
              <Text className="font-poppinsRegular text-xxs text-customGray">
                Lorem.
              </Text>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={['', '']}
            renderItem={({item}) => <SharingCommentComp />}
          />
        </View>
      </HandleData>
    </MenuWrapper>
  );
};

export default SharingComments;
