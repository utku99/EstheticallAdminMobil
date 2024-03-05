import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomInputs from './CustomInputs';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import WebClient from '../utility/WebClient';
import {SIZES, temp} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {Switch} from 'react-native-paper';
import TrashIcon from '../assets/svg/firm/TrashIcon';
import BlueTick from '../assets/svg/common/BlueTick';
import moment from 'moment';

const CommentComp = ({item}: any) => {
  return (
    <View className="space-y-2 ">
      <View className="flex-row items-center space-x-3">
        <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.image}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View>
          <Text className="text-customGray font-poppins text-xs font-bold">
            {item?.fullName}
          </Text>
          <Text className="text-customGray font-poppins text-xs">
            {item?.location}
          </Text>
        </View>
      </View>
      <Text className="text-xs text-customGray font-poppins">
        {item?.comment}
      </Text>
      <Text className="text-xxs text-customGray font-poppins">
        {item?.createdDate}
      </Text>
    </View>
  );
};

const SharingComp = ({item}: {item: any}) => {
  const [sharedDetail, setSharedDetail] = useState<any>(null);
  const [index, setIndex] = useState<any>(0);
  const {Post, loading} = WebClient();
  const isCarousel = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    Post('/api/Shared/ListCompanySharedsById', {
      sharedId: item?.sharedId,
    }).then(res => {
      setSharedDetail(res.data.object);
    });
  }, []);

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="flex-row  items-center p-[10px]">
        <View className="relative">
          <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray ">
            <Image
              source={{uri: item?.logoUrl}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="pl-2 flex-shrink">
          <Text
            numberOfLines={1}
            className="font-poppinsSemiBold text-xs text-customGray">
            {item?.subject}
          </Text>
          <Text
            numberOfLines={1}
            className="font-poppinsRegular text-xs text-customGray">
            {item?.serviceNameModel?.label}
          </Text>
        </View>
        {/* <View className="items-center">
          <Text className="text-customGray font-poppinsRegular text-xxs">
            Yorumlar
          </Text>
          <CustomInputs type="rating" value={3} />
        </View> */}
      </View>

      {/* carousel */}
      <View className="w-full aspect-[1.5]">
        <Carousel
          ref={isCarousel}
          data={item?.images?.map((img: any) => ({
            imgUrl: img.fileName,
            title: '',
          }))}
          renderItem={({item}: any) => (
            <Image
              source={{uri: item?.imgUrl}}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          sliderWidth={SIZES.width * 0.95}
          itemWidth={SIZES.width * 0.95}
          loop={true}
          enableSnap={true}
          onSnapToItem={i => setIndex(i)}
        />
        <Pagination
          dotsLength={2}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'white',
          }}
          tappableDots={true}
          dotColor="#FF8170"
          inactiveDotColor="transparent"
          inactiveDotScale={1}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}
        />
      </View>

      {/* description */}
      <View className="px-[10px] py-3 space-y-1">
        <Text
          numberOfLines={4}
          className="font-poppinsRegular text-xs text-customGray">
          {item?.description}
        </Text>
        <Text className="font-poppinsRegular text-xxs text-customGray">
          {moment(item?.createdDate, 'DD-MM.YYYY hh:mm').format(
            'DD.MM.YYYY hh:mm',
          )}
        </Text>
      </View>

      {/* bottom */}
      <View
        className={`bg-customBrown w-full h-[35px] px-[10px] rounded-b-xl flex-row items-center`}>
        <Text
          onPress={() =>
            navigation.navigate('sharingcomments', {sharedId: item?.sharedId})
          }
          className="font-poppinsRegular text-xs text-white flex-1">
          Yorumları Gör
        </Text>
        <View className="flex-row items-center space-x-6 mr-4">
          <View className="z-30">
            <Switch
              value={item?.isActive}
              onChange={() => {
                Post(
                  '/api/Shared/SetSharedStateMobile',
                  {
                    sharedId: item?.sharedId,
                    isActive: !item?.isActive,
                  },
                  true,
                  true,
                ).then(res => {
                  console.log(res.data);
                });
              }}
              thumbColor={'#FF8170'}
              color="#E8E8E8"
              ios_backgroundColor={'#E8E8E8'}
            />
          </View>
          <TouchableOpacity
            onPress={() => ''}
            className=" bg-customOrange rounded-md w-[23px] h-[23px] items-center justify-center">
            <TrashIcon fill={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SharingComp;
