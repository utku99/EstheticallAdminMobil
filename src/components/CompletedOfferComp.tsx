import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import CustomButtons from './CustomButtons';
import {useNavigation} from '@react-navigation/native';
import WebClient from '../utility/WebClient';

const CompletedOfferComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const navigation = useNavigation();
  const {Post} = WebClient();

  return (
    <View className="items-center">
      <View className="flex-row space-x-4 mt-4 mb-2">
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          Teklif ID:{' '}
          <Text className="font-poppinsRegular">{item?.offerID}</Text>
        </Text>
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          Kabul Tarihi:{' '}
          <Text className="font-poppinsRegular">{item?.offerCreatedDate}</Text>
        </Text>
      </View>

      <View
        className={`h-fit border border-customLightGray rounded-xl bg-white `}
        style={{width: SIZES.width * 0.95}}>
        {/* header */}
        <View
          className="flex-row justify-between items-center p-[10px] "
          style={{paddingBottom: seeAll ? 0 : 10}}>
          <View className="flex-row items-center space-x-2  w-[60%]">
            <View className="w-[62px] h-[62px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: temp}}
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
                Turkey, ANKARA
              </Text>
            </View>
          </View>
        </View>

        <View className="p-[10px] space-y-3">
          <View className="flex-1">
            <Text className="text-customGray font-poppinsMedium text-sm">
              Operasyonlar:{' '}
            </Text>
            <Text
              numberOfLines={2}
              className="text-customGray font-poppinsRegular text-sm">
              {item?.service}
            </Text>
          </View>

          <View>
            <Text className="text-customOrange font-poppinsMedium text-sm">
              Teklif Tarih Aralığı:{' '}
            </Text>
            <Text className="text-customOrange font-poppinsRegular text-sm">
              {item?.startDate} - {item?.endDate}
            </Text>
          </View>

          <CustomButtons
            type="solid"
            label="Teklifi Sil"
            style={{alignSelf: 'center', marginBottom: 10}}
            onPress={() => {
              Post(
                '/api/Offers/DeleteOfferPanel',
                {
                  offerInfoID: item.offerInfoID,
                },
                true,
                true,
              ).then(res => {});
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CompletedOfferComp;
