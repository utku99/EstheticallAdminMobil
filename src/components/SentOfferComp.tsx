import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import LikeIcon from '../assets/svg/common/LikeIcon';
import CustomInputs from './CustomInputs';
import {useNavigation} from '@react-navigation/native';

const SentOfferComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const navigation = useNavigation();

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
                Berna Laçin
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppins text-xs font-poppinsRegular">
                Turkey, ANKARA
              </Text>
            </View>
          </View>
        </View>

        {seeAll && (
          <View className="p-[10px] space-y-3">
            <View className="flex-1">
              <Text className="text-customGray font-poppinsMedium text-sm">
                Operasyonlar:{' '}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-sm">
                Cilt Bakımı, Klasik Cilt Bakımı
              </Text>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Teklif Başlığı:{' '}
              </Text>
              <Text
                numberOfLines={2}
                className="text-customGray font-poppinsRegular text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
                vel soluta laudantium reiciendis cumque, enim autem dicta
                repudiandae quia eveniet.
              </Text>
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Teklif İçeriği:{' '}
              </Text>
              <Text
                numberOfLines={5}
                className="text-customGray font-poppinsRegular text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
                quis voluptatibus, molestias neque sequi mollitia amet possimus
                ipsam enim dolor fugit nam, temporibus pariatur, excepturi
                deleniti! Ipsam molestias voluptatibus autem, ratione nisi
                distinctio vel earum qui quo aperiam quae illum. Odit sequi
                beatae illo error ullam, deleniti sed aspernatur accusamus
                blanditiis? Magnam perspiciatis dolores non quibusdam tempora
                perferendis. Nobis cupiditate est veritatis, assumenda ratione
                aliquam ullam accusamus nostrum pariatur quia!
              </Text>
            </View>

            <View>
              <Text className="text-customOrange font-poppinsMedium text-sm">
                Teklif Tarih Aralığı:{' '}
              </Text>
              <Text className="text-customOrange font-poppinsRegular text-sm">
                15 Şubat 2024 - 15 Nisan 2024
              </Text>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
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

            <View className="mb-3">
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                Kullanıcı Görselleri:{' '}
              </Text>
              <FlatList
                horizontal
                data={[temp, temp]}
                contentContainerStyle={{gap: 15}}
                renderItem={({item, index}) => (
                  <View className="w-[130px] h-[130px] rounded-lg border border-customLightGray overflow-hidden">
                    <Image source={{uri: item}} className="w-full h-full" />
                  </View>
                )}
              />
            </View>

            <View className="flex-row mb-3">
              <Text className="text-customGray font-poppinsMedium text-sm">
                Teklif Bilgilerim:{'  '}
              </Text>
              <View className="h-[0.5px] bg-black/[.5] w-full self-center"></View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  Durum:
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm">
                  Bekleyen
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  Doktor:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-sm">
                  Esteworld Doktor 1
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-customGray font-poppinsMedium text-sm">
                Açıklama:
              </Text>
              <Text
                numberOfLines={3}
                className="text-customGray font-poppinsRegular text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                odio!
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  Ön Ödeme Oranı:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-sm">
                  %13
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customOrange font-poppinsMedium text-sm">
                  İşlem Tarihi:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customOrange font-poppinsRegular text-sm">
                  12.03.2024
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                Teklif Görselleri:
              </Text>
              <FlatList
                horizontal
                data={[temp, temp, temp, temp, temp]}
                contentContainerStyle={{gap: 15}}
                renderItem={({item, index}) => (
                  <View className="w-[130px] h-[130px] rounded-lg border border-customLightGray overflow-hidden">
                    <Image source={{uri: item}} className="w-full h-full" />
                  </View>
                )}
              />
            </View>

            <CustomButtons
              type="solid"
              label="Teklifi Güncelle"
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
              className="font-poppinsRegular text-sm text-white flex-1">
              Teklif Fiyatı: 1000₺
            </Text>
          )}
          <View
            className="items-center justify-center "
            style={seeAll ? {width: '100%'} : null}>
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

export default SentOfferComp;
