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

const AcceptedAppointmentComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const [offerInfo, setOfferInfo] = useState<any>(null);
  const navigation = useNavigation();
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  return (
    <View className="items-center">
      <View
        className={`h-fit border border-customLightGray rounded-xl bg-white `}
        style={{width: SIZES.width * 0.95}}>
        {/* header */}
        <View className=" p-[10px] space-y-1">
          <Text className="font-poppinsRegular text-customGray text-xs">
            04.03.2021
          </Text>
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

        <View className="flex-1 p-[10px] pt-0">
          <Text className="text-customGray font-poppinsMedium text-sm">
            Operasyon:{' '}
          </Text>
          <Text
            numberOfLines={1}
            className="text-customGray font-poppinsRegular text-sm">
            Burun Operasyonları, Burun Ucu Kaldırma
          </Text>
        </View>

        {seeAll && (
          <View className="p-[10px] space-y-3">
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Doktor
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-sm">
                Esteworld Doktor 1
              </Text>
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Randevu Başlığı:{' '}
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
                Randevu İçeriği:{' '}
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
                Randevu Tarih Aralığı:{' '}
              </Text>
              <Text className="text-customOrange font-poppinsRegular text-sm">
                15 Şubat 2024 - 15 Nisan 2024
              </Text>
            </View>

            <View className="flex-row mb-3">
              <Text className="text-customGray font-poppinsMedium text-sm">
                Randevu Bilgilerim:{'  '}
              </Text>
              <View className="h-[0.5px] bg-black/[.5] w-full self-center"></View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm">
                  Durum:
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm">
                  Onaylandı
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customOrange font-poppinsMedium text-sm">
                  İşlem Tarihi:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customOrange font-poppinsRegular text-sm">
                  12.02.2024
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
                Açıklama
              </Text>
            </View>

            <CustomButtons
              type="solid"
              label="Randevuyu Düzenle"
              style={{alignSelf: 'center', marginBottom: 10}}
              onPress={() => navigation.navigate('editappointment')}
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
              className="font-poppinsMedium text-sm text-white flex-1">
              Randevu ID: <Text className="font-poppinsRegular">1005</Text>
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

export default AcceptedAppointmentComp;
