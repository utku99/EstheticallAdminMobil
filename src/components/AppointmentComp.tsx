import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SIZES, temp} from '../constants/constants';
import CustomInputs from './CustomInputs';
import LikeIcon from '../assets/svg/common/LikeIcon';
import StepIndicator from 'react-native-step-indicator';
import CustomButtons from './CustomButtons';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';

const AppointmentComp = () => {
  const [seeAll, setSeeAll] = useState(false);

  return (
    <View className="items-center">
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
            <View className="flex-1">
              <Text className="text-customGray font-poppinsMedium text-sm ">
                Kategori:{' '}
              </Text>
              <Text className="text-customGray font-poppinsRegular text-sm">
                Hastane,klinik
              </Text>
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

            <StepIndicator
              customStyles={{
                stepIndicatorSize: 36,
                currentStepIndicatorSize: 36,
                stepStrokeWidth: 0,

                labelSize: 14,
                labelColor: '#A6A6A6',
                currentStepLabelColor: '#4D4A48',

                stepIndicatorLabelFontSize: 14,
                stepIndicatorLabelFinishedColor: 'white',
                stepIndicatorLabelCurrentColor: '#4D4A48',

                stepStrokeCurrentColor: '#FF8170',
                stepIndicatorCurrentColor: 'white',
                stepIndicatorFinishedColor: '#FF8170',
                separatorStrokeWidth: 1,
                currentStepStrokeWidth: 2,
                separatorFinishedColor: '#FF8170',
                separatorUnFinishedColor: '#CECECE',
                stepIndicatorUnFinishedColor: '#FF8170',
              }}
              currentPosition={2}
              labels={['Onay Bekliyor', 'Onaylandı', 'Tamamlandı']}
              stepCount={3}
            />

            <CustomButtons
              type="solid"
              label="Randevu Güncelle"
              icon="question"
              style={{alignSelf: 'center'}}
            />
          </View>
        )}

        {/* bottom */}
        <Pressable
          onPress={() => setSeeAll(!seeAll)}
          className={`bg-customBrown w-full ${
            seeAll ? 'h-[44px]' : 'h-[64px]'
          } rounded-b-lg flex-row items-center justify-between px-[10px]`}>
          {!seeAll && (
            <View className="space-y-1 items-center">
              <Text
                numberOfLines={1}
                className="font-poppinsRegular text-sm text-white ">
                Randevu Tarihi:
              </Text>
              <Text
                numberOfLines={1}
                className="font-poppinsRegular text-sm text-white ">
                12.10.2024 - 15:30
              </Text>
            </View>
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

export default AppointmentComp;
