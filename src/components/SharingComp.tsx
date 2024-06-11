import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomInputs from './CustomInputs';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import WebClient from '../utility/WebClient';
import {SIZES, temp} from '../constants/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Switch} from 'react-native-paper';
import TrashIcon from '../assets/svg/firm/TrashIcon';
import BlueTick from '../assets/svg/common/BlueTick';
import moment from 'moment';
import IntLabel from './IntLabel';
import Video from 'react-native-video';
import Muted from '../assets/svg/homepages/Muted';
import UnMuted from '../assets/svg/homepages/UnMuted';

const SharingComp = ({item, setClicked}: {item: any; setClicked: any}) => {
  const [index, setIndex] = useState<any>(0);
  const {Post, loading} = WebClient();
  const isCarousel = useRef<any>(null);
  const navigation = useNavigation<any>();
  const screenIsFocused = useIsFocused();
  const [isMuted, setIsMuted] = useState(true);

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white overflow-hidden`}
      style={{width: SIZES.width * 0.95}}>
      <View className="w-full aspect-[1.3]">
        <Carousel
          ref={isCarousel}
          data={item?.images?.map((img: any) => ({
            imgUrl: img.fileName,
            title: '',
          }))}
          renderItem={({item}: any) =>
            item?.imgUrl?.includes('mp4') ? (
              <TouchableHighlight
                className="relative"
                onPress={() => {
                  setIsMuted(!isMuted);
                }}>
                <>
                  <Video
                    source={{uri: item?.imgUrl}}
                    repeat
                    muted={isMuted}
                    resizeMode="cover"
                    className="w-full h-full "
                  />
                  <View className="absolute bottom-2 right-2">
                    {isMuted ? <Muted /> : <UnMuted />}
                  </View>
                </>
              </TouchableHighlight>
            ) : (
              <Image
                source={{uri: item?.imgUrl}}
                className="w-full h-full"
                resizeMode="cover"
              />
            )
          }
          sliderWidth={SIZES.width * 0.95}
          itemWidth={SIZES.width * 0.95}
          loop={true}
          enableSnap={true}
          onSnapToItem={i => setIndex(i)}
        />
        <Pagination
          dotsLength={item?.images?.length}
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

      <View className="p-[10px] space-y-1">
        <Text
          numberOfLines={1}
          className="font-poppinsRegular text-xs text-customGray">
          {item?.serviceNameModel?.label}
        </Text>
        <Text
          numberOfLines={1}
          className="font-poppinsSemiBold text-xs text-customGray">
          {item?.subject}
        </Text>
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
          {IntLabel('see_comments')}
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
                  setClicked(true);
                });
              }}
              thumbColor={'#FF8170'}
              color="#E8E8E8"
              ios_backgroundColor={'#E8E8E8'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Post(
                '/api/Shared/DeleteShared',
                {
                  sharedId: item?.sharedId,
                  isActive: false,
                },
                true,
                true,
              ).then(res => {
                setClicked(true);
              });
            }}
            className=" bg-customOrange rounded-md w-[23px] h-[23px] items-center justify-center">
            <TrashIcon fill={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SharingComp;
