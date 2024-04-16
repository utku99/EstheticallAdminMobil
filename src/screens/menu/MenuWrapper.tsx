import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CustomButtons from '../../components/CustomButtons';
import {SIZES} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import NotificationIcon from '../../assets/svg/userMenu/NotificationIcon';
import IntLabel from '../../components/IntLabel';

interface props {
  children?: React.ReactNode;
  title?: string;
  type?: 'message' | 'sharing';
  scrollEnabled?: boolean;
}

const MenuWrapper = ({children, title, type, scrollEnabled = true}: props) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      className="bg-background "
      nestedScrollEnabled
      scrollEnabled={scrollEnabled}
      contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
      <View className=" items-center  h-full">
        <View
          className="flex-row items-center justify-center mb-[20px] relative"
          style={{width: SIZES.width * 0.9}}>
          {title && (
            <Text className="font-poppinsMedium text-customGray text-base text-center ">
              {title}
            </Text>
          )}
          {type == 'sharing' && (
            <View className=" absolute right-0">
              <CustomButtons
                onPress={() => navigation.navigate('addsharing')}
                type="iconsolid"
                label={IntLabel('add')}
                theme="big"
                icon="pluss"
                style={{height: 40}}
              />
            </View>
          )}
          {type == 'message' && (
            <View className=" absolute right-0 ">
              <View className="w-[15px] h-[15px] rounded-full border border-customOrange bg-white items-center justify-center absolute z-10 right-0">
                <Text className="font-poppins text-[8px] text-customGray font-normal">
                  19
                </Text>
              </View>
              <NotificationIcon fill={'#FF8170'} />
            </View>
          )}
        </View>

        {children}
      </View>
    </ScrollView>
  );
};

export default MenuWrapper;
