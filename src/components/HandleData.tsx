import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

interface props {
  data?: any;
  loading: boolean;
  title?: any;
  children?: React.ReactNode;
}

const HandleData = ({data, loading, title, children}: props) => {
  if (data?.length == 0 && !loading) {
    return (
      title && (
        <View className="w-full items-center py-2">
          <Text>{title}</Text>
        </View>
      )
    );
  } else if (loading) {
    return (
      <View className="w-full h-full items-center justify-center ">
        <View className="w-[80px] h-[80px] items-center justify-center">
          <LottieView
            source={require('../assets/lottie/data.json')}
            style={{
              width: '100%',
              height: '100%',
            }}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  } else return <View className="flex-1">{children}</View>;
};

export default HandleData;
