import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import LikeIcon from '../assets/svg/common/LikeIcon';
import CustomInputs from './CustomInputs';
import {useNavigation} from '@react-navigation/native';
import {currencyTypes, offerStates} from '../constants/Enum';
import moment from 'moment';
import IntLabel from './IntLabel';

const SentOfferComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const navigation = useNavigation<any>();

  return (
    <View className="items-center">
      <View className="flex-row space-x-4 mt-4 mb-2">
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          {IntLabel('offer_id')}:{' '}
          <Text className="font-poppinsRegular">{item?.offerID}</Text>
        </Text>
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          {IntLabel('approval_date')}:{' '}
          <Text className="font-poppinsRegular">
            {moment(item?.offerCreatedDate, 'YYYY-MM.DD').format('DD.MM.YYYY')}
          </Text>
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

        {seeAll && (
          <View className="p-[10px] space-y-3">
            <View className="flex-1">
              <Text className="text-customGray font-poppinsMedium text-sm">
                {IntLabel('service')}:{' '}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-sm">
                {item?.service}
              </Text>
            </View>

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
                {moment(item?.startDate, 'YYYY-MM.DD').format('DD.MM.YYYY')} -{' '}
                {moment(item?.endDate, 'YYYY-MM.DD').format('DD.MM.YYYY')}
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

            <View className="flex-row mb-3">
              <Text className="text-customGray font-poppinsMedium text-sm">
                {IntLabel('my_offer_infos')}:{' '}
              </Text>
              <View className="h-[0.5px] bg-black/[.5] w-full self-center"></View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  {IntLabel('state')}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm">
                  {offerStates.find(state => state.value == item.status)?.label}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  {IntLabel('doctor')}:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-sm">
                  {item?.doctorName}
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-customGray font-poppinsMedium text-sm">
                {IntLabel('desc')}:
              </Text>
              <Text
                numberOfLines={3}
                className="text-customGray font-poppinsRegular text-sm">
                {item?.description}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  {IntLabel('payment_rate')}:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-sm">
                  %{item?.priceRate}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customOrange font-poppinsMedium text-sm">
                  {IntLabel('transaction_date')}:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customOrange font-poppinsRegular text-sm">
                  {moment(item?.date, 'DD.MM.YYYY').format('DD.MM.YYYY')}
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('offer_images')}:
              </Text>
              <FlatList
                horizontal
                data={item?.offerInfoSlider ?? []}
                contentContainerStyle={{gap: 15}}
                renderItem={({item}) => (
                  <View
                    key={item?.sliderID}
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
              label={IntLabel('edit')}
              style={{alignSelf: 'center', marginBottom: 10}}
              onPress={() =>
                navigation.navigate('editoffer', {offerId: item?.offerID})
              }
            />
          </View>
        )}

        {/* bottom */}
        <Pressable
          onPress={() => setSeeAll(!seeAll)}
          className="bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]">
          {!seeAll && (
            <Text
              numberOfLines={1}
              className="font-poppinsRegular text-xs text-white flex-1">
              {IntLabel('offer_price')}: {item?.price}
              {currencyTypes.find(cur => cur.value == item?.currencyType)?.icon}
            </Text>
          )}
          <View
            className="items-center justify-center "
            style={seeAll ? {width: '100%'} : null}>
            {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
          </View>
          {!seeAll && (
            <Text className="font-poppinsBold text-xs text-white flex-1 text-right">
              {IntLabel('see_details')}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default SentOfferComp;
