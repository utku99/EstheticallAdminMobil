import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import LikeIcon from '../assets/svg/common/LikeIcon';
import CustomInputs from './CustomInputs';
import {useNavigation} from '@react-navigation/native';
import WebClient from '../utility/WebClient';
import {useSelector} from 'react-redux';
import {AnyObjectSchema} from 'yup';
import moment from 'moment';
import IntLabel from './IntLabel';

const AllOfferComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const navigation = useNavigation<any>();

  console.log(item?.extraServices);

  return (
    <View className="items-center">
      <View className="flex-row space-x-4 mt-4 mb-2">
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          {IntLabel('offer_id')}:{' '}
          <Text className="font-poppinsRegular">{item?.offerID}</Text>
        </Text>
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          {IntLabel('created_date')}:{' '}
          <Text className="font-poppinsRegular">
            {moment(item?.offerCreatedDate, 'DD.MM.YYYY').format('DD.MM.YYYY')}
          </Text>
        </Text>
      </View>

      <View
        className={`h-fit border border-customLightGray rounded-xl bg-white `}
        style={{width: SIZES.width * 0.95}}>
        {/* header */}
        <View className="flex-row justify-between items-center p-[10px] ">
          <View className="flex-row items-center space-x-2  w-[60%]">
            <View className="w-[62px] h-[62px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: item?.userLogo}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text
                numberOfLines={1}
                className="text-customGray text-sm font-poppinsSemiBold">
                {item?.userFullName}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppins text-xs font-poppinsRegular">
                {item?.location}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 p-[10px] pt-0">
          <Text className="text-customGray font-poppinsMedium text-sm">
            {IntLabel('service')}:{' '}
          </Text>
          <Text
            numberOfLines={1}
            className="text-customGray font-poppinsRegular text-sm">
            {item?.service}
          </Text>
        </View>

        {seeAll && (
          <View className="p-[10px] space-y-3">
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                {IntLabel('offer_title')}:{' '}
              </Text>
              <Text
                numberOfLines={2}
                className="text-customGray font-poppinsRegular text-sm">
                {item?.subject}
              </Text>
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                {IntLabel('offer_content')}:{' '}
              </Text>
              <Text
                numberOfLines={5}
                className="text-customGray font-poppinsRegular text-sm">
                {item?.content}
              </Text>
            </View>

            <View>
              <Text className="text-customOrange font-poppinsMedium text-sm">
                {IntLabel('offer_date_range')}:{' '}
              </Text>
              <Text className="text-customOrange font-poppinsRegular text-sm">
                {moment(item?.startDate, 'DD.MM.YYYY').format('DD.MM.YYYY')} -{' '}
                {moment(item?.endDate, 'DD.MM.YYYY').format('DD.MM.YYYY')}
              </Text>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('extra_services')}:{' '}
              </Text>
              <View className="flex-row items-center justify-between ">
                <CustomInputs
                  type="checkbox"
                  title={IntLabel('transport')}
                  readOnly
                  value={item?.extraServices.some((item: number) => item === 1)}
                />
                <CustomInputs
                  type="checkbox"
                  title={IntLabel('accomodation')}
                  readOnly
                  value={item?.extraServices.some((item: number) => item === 2)}
                />
                <CustomInputs
                  type="checkbox"
                  title={IntLabel('companion')}
                  readOnly
                  value={item?.extraServices.some((item: number) => item === 3)}
                />
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('user_images')}:{' '}
              </Text>
              <FlatList
                horizontal
                data={item?.sliders ?? []}
                contentContainerStyle={{gap: 15}}
                renderItem={({item}) => (
                  <View
                    key={item.sliderID}
                    className="w-[130px] h-[130px] rounded-lg border border-customLightGray overflow-hidden">
                    <Image
                      source={{uri: item?.fileName}}
                      className="w-full h-full"
                    />
                  </View>
                )}
              />
            </View>

            <CustomButtons
              type="solid"
              label={IntLabel('send_offer')}
              style={{alignSelf: 'center', marginBottom: 10}}
              onPress={() =>
                navigation.navigate('newoffer', {offerId: item?.offerID})
              }
            />
          </View>
        )}

        {/* bottom */}
        <Pressable
          onPress={() => setSeeAll(!seeAll)}
          className="bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]">
          <View className="items-center justify-center flex-1">
            {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AllOfferComp;
