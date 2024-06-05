import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import WebClient from '../../../utility/WebClient';
import RenderHTML from 'react-native-render-html';
import {SIZES} from '../../../constants/constants';
import MenuWrapper from '../MenuWrapper';
import {legalTextType} from '../../../constants/Enum';

const PrivacyPolicy = () => {
  const {Post} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.DISCLOSURETEXTANDCOOKIEPOLICY,
      languageID: language?.type ?? 1,
    }).then((res: any) => {
      setLegalText(res.data.object);
    });
  }, [language]);

  return (
    <MenuWrapper>
      <ScrollView className=" w-[90%]" showsVerticalScrollIndicator={false}>
        <RenderHTML
          contentWidth={SIZES.width}
          source={{html: legalText?.content}}
        />
      </ScrollView>
    </MenuWrapper>
  );
};

export default PrivacyPolicy;
