import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import CustomButtons from '../../components/CustomButtons';
import HandleData from '../../components/HandleData';
import {useNavigation} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import SentOfferComp from '../../components/SentOfferComp';
import AllOfferComp from '../../components/AllOfferComp';
import CompletedOfferComp from '../../components/CompletedOfferComp';
import IntLabel from '../../components/IntLabel';

const Offer = () => {
  const [tab, setTab] = useState(1);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [allOffers, setAllOffers] = useState<any>([]);
  const [sentOffers, setSentOffers] = useState<any>([]);
  const [completedOffers, setCompletedOffers] = useState<any>([]);

  useEffect(() => {
    Post('/api/Offers/IncomingOffersMobile', {
      companyID: user.companyId,
      companyOfficeID: user.companyOfficeId,
    }).then((res: any) => {
      setAllOffers(res.data.object);
    });

    Post('/api/Offers/SentOffersMobile', {
      companyID: user.companyId,
      companyOfficeID: user.companyOfficeId,
    }).then((res: any) => {
      setSentOffers(res.data.object);
    });

    Post('/api/Offers/CompletedOffersPanelMobile', {
      companyID: user.companyId,
      companyOfficeID: user.companyOfficeId,
    }).then((res: any) => {
      setCompletedOffers(res.data.object);
    });
  }, []);

  return (
    <MenuWrapper>
      <View className="h-[40px] ">
        <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal: 10, gap: 5}}>
          <CustomButtons
            type={tab == 1 ? 'brownsolid' : 'brownoutlined'}
            label={IntLabel('all_offers')}
            onPress={() => setTab(1)}
          />
          <CustomButtons
            type={tab == 2 ? 'brownsolid' : 'brownoutlined'}
            label={IntLabel('sent_offers')}
            onPress={() => setTab(2)}
          />
          <CustomButtons
            type={tab == 3 ? 'brownsolid' : 'brownoutlined'}
            label={IntLabel('complete_offers')}
            onPress={() => setTab(3)}
          />
        </ScrollView>
      </View>

      {tab == 1 && (
        <HandleData
          data={allOffers}
          loading={loading}
          title={IntLabel('warning_no_active_record')}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={allOffers}
            renderItem={({item}) => <AllOfferComp item={item} />}
          />
        </HandleData>
      )}
      {tab == 2 && (
        <HandleData
          data={sentOffers}
          loading={loading}
          title={IntLabel('warning_no_active_record')}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={sentOffers}
            renderItem={({item}) => <SentOfferComp item={item} />}
          />
        </HandleData>
      )}
      {tab == 3 && (
        <HandleData
          data={completedOffers}
          loading={loading}
          title={IntLabel('warning_no_active_record')}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={completedOffers}
            renderItem={({item}) => <CompletedOfferComp item={item} />}
          />
        </HandleData>
      )}
    </MenuWrapper>
  );
};

export default Offer;
