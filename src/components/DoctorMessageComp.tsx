import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SIZES} from '../constants/constants';
import {useSelector} from 'react-redux';

const DoctorMessageComp = ({item}: any) => {
  const {user} = useSelector((state: any) => state.user);

  return (
    <>
      {item.senderId == user.companyId ? (
        <View className={`  flex-row items-center self-end max-w-[70%]`}>
          <View className="space-y-[10px]">
            {[...Array(5).keys()].map(index => {
              const imageKey = `image${index}`;
              const imageValue = item[imageKey];
              if (
                imageValue &&
                imageValue !== 'NoImage' &&
                !imageValue.includes('trno') &&
                imageValue !== 'no image'
              ) {
                return (
                  <View key={imageKey} className="w-[150px] h-[150px] self-end">
                    <Image
                      source={{uri: imageValue}}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                );
              }
            })}
            {item?.message != '' && (
              <Text className="text-customGray font-poppinsRegular text-xs border border-customLightGray bg-white rounded-xl rounded-tr-none  p-[10px] ">
                {item?.message}
              </Text>
            )}
            <Text className="text-customGray font-poppinsRegular text-xxs self-end">
              {item?.createdDate}
            </Text>
          </View>
        </View>
      ) : (
        <View className={` flex-row items-center self-start max-w-[70%]`}>
          <View className="space-y-[10px]">
            {[...Array(5).keys()].map(index => {
              const imageKey = `image${index}`;
              const imageValue = item[imageKey];
              if (
                imageValue &&
                imageValue !== 'NoImage' &&
                !imageValue.includes('trno') &&
                imageValue !== 'no image'
              ) {
                return (
                  <View key={imageKey} className="w-[150px] h-[150px] self-end">
                    <Image
                      source={{uri: imageValue}}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                );
              }
            })}
            {item?.message != '' && (
              <Text className="text-customGray font-poppinsRegular text-xs border border-customLightGray bg-white rounded-xl rounded-tl-none  p-[10px] ">
                {item?.message}
              </Text>
            )}
            <Text className="text-customGray font-poppinsRegular text-xxs ">
              {item?.createdDate}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default DoctorMessageComp;
