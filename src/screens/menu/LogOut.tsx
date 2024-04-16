import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import UserWrapper from './MenuWrapper';
import CustomButtons from '../../components/CustomButtons';
import {useDispatch} from 'react-redux';
import {setLoggedIn, setUser} from '../../redux/slices/user';
import MenuWrapper from './MenuWrapper';
import IntLabel from '../../components/IntLabel';

const LogOut = ({navigation}: any) => {
  const dispatch = useDispatch();

  return (
    <MenuWrapper title={IntLabel('settings')}>
      <View className=" justify-center px-[20px] space-y-4 h-full">
        <Text className="font-medium font-poppins text-customGray text-base text-center">
          {IntLabel('exit_title')}
        </Text>
        <View className="flex-row items-center justify-evenly">
          <CustomButtons
            type="outlined"
            label={IntLabel('give_up')}
            theme="big"
            onPress={() => navigation.goBack()}
          />
          <CustomButtons
            type="solid"
            label={IntLabel('ok')}
            theme="big"
            onPress={() => {
              dispatch(setUser(null));
              dispatch(setLoggedIn(false));
            }}
          />
        </View>
      </View>
    </MenuWrapper>
  );
};

export default LogOut;
