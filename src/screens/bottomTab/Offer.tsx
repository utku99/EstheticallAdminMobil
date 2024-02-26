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

const Offer = () => {
  const [tab, setTab] = useState(1);
  const [allOffers, setAllOffers] = useState<any>([]);
  const [sentOffers, setSentOffers] = useState<any>([]);
  const [completedOffers, setCompletedOffers] = useState<any>([]);
  const navigation = useNavigation();
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Offers/IncomingOffers', {
      companyID: user.companyId,
      companyOfficeID: user.companyOfficeId,
    }).then((res: any) => {
      setAllOffers(res.data.object);
    });

    Post('/api/Offers/SentOffersAdmin', {
      companyID: user.companyId,
      companyOfficeID: user.companyOfficeId,
    }).then((res: any) => {
      setSentOffers(res.data.object);
    });

    Post('/api/Offers/CompletedOffersPanel', {
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
            label="Tüm Teklifler"
            onPress={() => setTab(1)}
          />
          <CustomButtons
            type={tab == 2 ? 'brownsolid' : 'brownoutlined'}
            label="Teklif Verdiklerim"
            onPress={() => setTab(2)}
          />
          <CustomButtons
            type={tab == 3 ? 'brownsolid' : 'brownoutlined'}
            label="Tamamlanmış Teklifler"
            onPress={() => setTab(3)}
          />
        </ScrollView>
      </View>

      {tab == 1 && (
        <HandleData
          data={allOffers}
          loading={loading}
          title="Paylaşımınız Bulunmamaktadır">
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
          title="Paylaşımınız Bulunmamaktadır">
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
          title="Paylaşımınız Bulunmamaktadır">
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
