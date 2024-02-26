import {View, Text, Switch} from 'react-native';
import React from 'react';
import UserWrapper from './MenuWrapper';
import DocumentIcon from '../../assets/svg/userMenu/DocumentIcon';
import HelpIcon from '../../assets/svg/userMenu/HelpIcon';
import SecurityIcon from '../../assets/svg/userMenu/SecurityIcon';
import AboutIcon from '../../assets/svg/userMenu/AboutIcon';
import MenuWrapper from './MenuWrapper';
import LangChoiceComp from '../../components/LangChoiceComp';

const Settings = () => {
  return (
    <MenuWrapper title="Ayarlar">
      <View className=" w-[60%] space-y-8">
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Mesaj Bildirimleri
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Teklif Bildirimleri
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Randevu Bildirimleri
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Satın Alma Bildirimleri
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Favori Bildirimleri
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Dil Seçimi
          </Text>
          <LangChoiceComp />
        </View>
      </View>

      <View className="flex-row items-center space-x-4 mt-8">
        <View className="space-y-4">
          <View className="flex-row items-center space-x-2">
            <DocumentIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              Kullanım Koşulları{' '}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <SecurityIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              Gizlilik Politikası
            </Text>
          </View>
        </View>

        <View className="space-y-4">
          <View className="flex-row items-center space-x-2">
            <HelpIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              Yardım
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <AboutIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              Hakkımızda
            </Text>
          </View>
        </View>
      </View>
    </MenuWrapper>
  );
};

export default Settings;
