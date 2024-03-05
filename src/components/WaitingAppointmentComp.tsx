import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {appointmentOperationStates} from '../constants/Enum';

const WaitingAppointmentComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);
  const navigation = useNavigation();
  return (
    <View className="items-center">
      <View
        className={`h-fit border border-customLightGray rounded-xl bg-white `}
        style={{width: SIZES.width * 0.95}}>
        {/* header */}
        <View className=" p-[10px] space-y-1">
          <Text className="font-poppinsRegular text-customGray text-xs">
            {moment(item?.createdDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}
          </Text>
          <View className="flex-row items-center space-x-2  w-[60%]">
            <View className="w-[62px] h-[62px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: ''}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text
                numberOfLines={1}
                className="text-customGray text-sm font-poppinsSemiBold">
                {item?.userName}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppins text-xs font-poppinsRegular">
                {item?.userAdress}
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
            {item?.serviceName}
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
                {item?.doctorModel?.label}
              </Text>
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Randevu Başlığı:{' '}
              </Text>
              <Text
                numberOfLines={2}
                className="text-customGray font-poppinsRegular text-sm">
                {item?.title}
              </Text>
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm">
                Randevu İçeriği:{' '}
              </Text>
              <Text
                numberOfLines={5}
                className="text-customGray font-poppinsRegular text-sm">
                {item?.content}
              </Text>
            </View>

            <View>
              <Text className="text-customOrange font-poppinsMedium text-sm">
                Randevu Tarih Aralığı:{' '}
              </Text>
              <Text className="text-customOrange font-poppinsRegular text-sm">
                {moment(item?.startDate, 'YYYY.MM.DD').format('DD.MM.YYYY')} -
                {moment(item?.endDate, 'YYYY.MM.DD').format('DD.MM.YYYY')}
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
                  {
                    appointmentOperationStates.find(
                      tmp => tmp.value == item?.operationState,
                    )?.label
                  }
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customOrange font-poppinsMedium text-sm">
                  İşlem Tarihi:
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customOrange font-poppinsRegular text-sm">
                  {item?.confirmDate ?? 'Belirtilmedi'}
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
                ???
              </Text>
            </View>

            <CustomButtons
              type="solid"
              label="Randevuyu Düzenle"
              style={{alignSelf: 'center', marginBottom: 10}}
              onPress={() =>
                navigation.navigate('editappointment', {
                  appointmentId: item?.appointmentID,
                })
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
              className="font-poppinsMedium text-sm text-white flex-1">
              Randevu ID:{' '}
              <Text className="font-poppinsRegular">{item?.appointmentID}</Text>
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

export default WaitingAppointmentComp;
