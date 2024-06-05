import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import CustomButtons from '../../components/CustomButtons';
import {SIZES, temp} from '../../constants/constants';
import {useIntl} from 'react-intl';
import IntLabel from '../../components/IntLabel';
import CustomInputs from '../../components/CustomInputs';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';

const TableComp = () => {
  return (
    <View className="w-full flex flex-row items-center space-x-1  bg-white">
      <View>
        <CustomInputs type="checkbox" />
      </View>
      <View className="flex-1">
        <Image source={{uri: temp}} width={60} height={60} />
      </View>
      <Text className="text-customGray font-poppinsRegular text-sm flex-1">
        paylaşım
      </Text>
      <Text className="text-customGray font-poppinsRegular text-sm flex-1">
        oluşturulma tarihi
      </Text>
    </View>
  );
};

const SocialMediaSharings = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [facebookSharings, setFacebookSharings] = useState<any>();
  const [instagramSharings, setInstagramSharings] = useState<any>();

  useEffect(() => {
    Post('/api/SocialPlatforms/GetPostsFacebook', {
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then((res: any) => {
      setFacebookSharings(res.data.object ?? []);
    });

    Post('/api/SocialPlatforms/GetPostsInstagram', {
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then((res: any) => {
      setInstagramSharings(res.data.object ?? []);
    });
  }, []);

  return (
    <MenuWrapper>
      <View style={{width: SIZES.width * 0.95}}>
        {isLogged ? (
          <View className="flex flex-row  space-x-4">
            <CustomButtons
              type={activeTab == 1 ? 'solid' : 'outlined'}
              label="Facebook"
              onPress={() => setActiveTab(1)}
            />
            <CustomButtons
              type={activeTab == 2 ? 'solid' : 'outlined'}
              label="Instagram"
              onPress={() => setActiveTab(2)}
            />
            <View className="flex-1"></View>
            <CustomButtons
              type="solid"
              label={IntLabel('exit')}
              onPress={() => setActiveTab(2)}
            />
          </View>
        ) : (
          <View className="flex space-y-4 items-center">
            <CustomButtons
              type="solid"
              label={intl.formatMessage({
                id: 'connect_facebook_and_instagram',
                defaultMessage: 'connect_facebook_and_instagram',
              })}
              style={{width: 250}}
              onPress={() => ''}
            />
            <Text className=" text-customGray font-poppinsRegular text-sm">
              {IntLabel('facebook_connect_info')}
            </Text>
          </View>
        )}

        <TableComp />
      </View>
    </MenuWrapper>
  );
};

export default SocialMediaSharings;
