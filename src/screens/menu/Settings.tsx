import {View, Text, Switch} from 'react-native';
import React from 'react';
import DocumentIcon from '../../assets/svg/userMenu/DocumentIcon';
import HelpIcon from '../../assets/svg/userMenu/HelpIcon';
import SecurityIcon from '../../assets/svg/userMenu/SecurityIcon';
import AboutIcon from '../../assets/svg/userMenu/AboutIcon';
import MenuWrapper from './MenuWrapper';
import LangChoiceComp from '../../components/LangChoiceComp';
import IntLabel from '../../components/IntLabel';

const Settings = () => {
  return (
    <MenuWrapper title={IntLabel('settings')}>
      <View className=" w-[60%] space-y-8">
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('message')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('offer')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('appointment')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        {/* <View className="flex-row items-center justify-between">
          <Text className="font-poppinsMedium text-base text-customGray ">
            Satın Alma Bildirimleri
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View> */}
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('favorite')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('lang_choice')}
          </Text>
          <LangChoiceComp />
        </View>
      </View>

      <View className="flex-row items-center space-x-4 mt-8">
        <View className="space-y-4">
          <View className="flex-row items-center space-x-2">
            <DocumentIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              {IntLabel('terms_of_use')}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <SecurityIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              {IntLabel('privacy_policy')}
            </Text>
          </View>
        </View>

        <View className="space-y-4">
          <View className="flex-row items-center space-x-2">
            <HelpIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              {IntLabel('help')}
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <AboutIcon />
            <Text className=" text-base text-customGray font-sans font-normal">
              {IntLabel('about_us')}
            </Text>
          </View>
        </View>
      </View>
    </MenuWrapper>
  );
};

export default Settings;
