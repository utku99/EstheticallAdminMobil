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

const AllOfferComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const [offerInfo, setOfferInfo] = useState<AnyObjectSchema>(null);
  const navigation = useNavigation();
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Offers/GetOfferInfo', {
      offerID: item?.offerID,
      companyID: user.companyId,
      companyOfficeID: user.companyOfficeId,
    }).then((res: any) => {
      setOfferInfo(res.data.object);
    });
  }, []);

  console.log(offerInfo, '--');

  return (
    <View className="items-center">
      <View className="flex-row space-x-4 mt-4 mb-2">
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          Teklif ID:{' '}
          <Text className="font-poppinsRegular">{item?.offerID}</Text>
        </Text>
        <Text className="font-poppinsMedium  text-sm text-customGray ">
          Oluşturulma Tarihi:{' '}
          <Text className="font-poppinsRegular">{item?.offerCreatedDate}</Text>
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

        <View className="flex-1 p-[10px] pt-0">
          <Text className="text-customGray font-poppinsMedium text-sm">
            Operasyonlar:{' '}
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

            <CustomButtons
              type="solid"
              label="Teklif Ver"
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
