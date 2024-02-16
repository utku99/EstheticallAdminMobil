import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import LikeIcon from '../assets/svg/common/LikeIcon';
import CustomInputs from './CustomInputs';

const OfferComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);

  return (
    <View className="items-center">
      <View className="flex-row space-x-4 mt-4 mb-2">
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          Teklif ID: <Text className="font-poppinsRegular">343243</Text>
        </Text>
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          Tarih: <Text className="font-poppinsRegular">15 Ocak 2024</Text>
        </Text>
      </View>

      <View
        className={`h-fit border border-customLightGray rounded-xl bg-white `}
        style={{width: SIZES.width * 0.95}}>
        {/* header */}
        <View className="p-[10px] space-y-1">
          <Text className="text-customGray font-poppinsRegular text-xs">
            asdasd
          </Text>
          <View className="flex-row justify-between items-center">
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
                  dsfds
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppins text-xs font-poppinsRegular">
                  dsfdsf
                </Text>
              </View>
            </View>
          </View>
        </View>

        {seeAll && (
          <View className="p-[10px] space-y-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm ">
                  Teklif ID:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm ">
                  dsfdsf
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  Tarih:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm ">
                  dsfdsfds
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  Konum:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm">
                  dsfdsf
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm ">
                  Kategori:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm">
                  Hastane,klinik
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Operasyonlar:{' '}
              </Text>
              <Text className="text-customGray font-poppinsRegular text-sm">
                sdfdf
              </Text>
            </View>

            <View>
              <Text className="text-customOrange font-poppinsMedium text-sm">
                Teklif Tarih Aralığı:{' '}
              </Text>
              <Text className="text-customOrange font-poppinsRegular text-sm">
                dsfdsf
              </Text>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Özel Servisler:{' '}
              </Text>
              <View className="flex-row items-center justify-between ">
                <CustomInputs
                  type="checkbox"
                  title="Ulaşım"
                  readOnly
                  value={true}
                />
                <CustomInputs
                  type="checkbox"
                  title="Konaklama"
                  readOnly
                  value={true}
                />
                <CustomInputs
                  type="checkbox"
                  title="Refakatçi"
                  readOnly
                  value={true}
                />
              </View>
            </View>
            <View className="flex-row">
              <Text className="text-customGray font-poppinsMedium text-sm">
                İlgili Doktor:{' '}
              </Text>
              <View className="h-[0.5px] bg-black/[.5] w-full self-center"></View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
                <Image
                  source={{uri: temp}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="w-[40%] ">
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsSemiBold text-xs ">
                  dfdfds
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-xs">
                  dvdxvdx
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-xs">
                  dvvdvd
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-customGray font-poppinsRegular text-xs">
                  cxvxcvc
                </Text>
                <Text className="text-customGray font-poppinsRegular text-xs">
                  Yorumlar
                </Text>
              </View>
              <LikeIcon />
            </View>

            <Text className="text-customOrange font-semibold text-base text-center mb-3">
              Teklif Fiyatı: xcvx
            </Text>

            <CustomButtons
              type="solid"
              label="Teklifi Güncelle"
              icon="question"
              style={{alignSelf: 'center'}}
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
              className="font-poppinsRegular text-sm text-white flex-1">
              Teklif Fiyatı: vffvd
            </Text>
          )}
          <View className="flex-1 items-center ">
            {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
          </View>
          {!seeAll && (
            <Text className="font-poppinsBold text-sm text-white flex-1 text-right">
              Detayları Gör
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default OfferComp;
