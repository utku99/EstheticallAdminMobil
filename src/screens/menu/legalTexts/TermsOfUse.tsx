import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import {SIZES} from '../../../constants/constants';
import MenuWrapper from '../MenuWrapper';
import SpinnerComp from '../../../components/SpinnerComp';
import {legalTextType} from '../../../constants/Enum';

const TermsOfUse = () => {
  const {Post, loading} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.PRIVACYANDTERMSOFUSE,
      languageID: language?.type ?? 1,
    }).then((res: any) => {
      setLegalText(res.data.object);
    });
  }, [language]);

  return (
    <MenuWrapper>
      {loading ? (
        <SpinnerComp />
      ) : (
        <ScrollView className=" w-[90%]" showsVerticalScrollIndicator={false}>
          <RenderHTML
            contentWidth={SIZES.width}
            source={{html: legalText?.content}}
          />
        </ScrollView>
      )}
    </MenuWrapper>
  );
};

export default TermsOfUse;
