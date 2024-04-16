import React, {useEffect, useState} from 'react';
import SharingComp from '../../components/SharingComp';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, SafeAreaView, View} from 'react-native';
import HandleData from '../../components/HandleData';
import MenuWrapper from '../menu/MenuWrapper';
import CustomButtons from '../../components/CustomButtons';
import {OneSignal} from 'react-native-onesignal';
import IntLabel from '../../components/IntLabel';

const Sharings = () => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [sharings, setSharings] = useState([]);

  OneSignal.initialize('36ba4e67-6a5f-4bae-9269-4ccdededab2d');

  OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  useEffect(() => {
    Post('/api/Shared/ListCompanySharedsMobile', {
      companyId: user.companyId,
      companyOfficeId: user.companyOfficeId,
      companyTypeId: user.userRoleId === 4 ? 1 : 0, // institution :0 , office:1
    }).then(res => {
      setSharings(res.data);
    });

    if (OneSignal.User.pushSubscription.getPushSubscriptionId()) {
      Post('/api/Notification/SendOneSignalID', {
        oneSignalID: OneSignal.User.pushSubscription.getPushSubscriptionId(),
        userID: user?.id,
        languageId: 1,
        companyID: user?.companyOfficeId == 0 ? user?.companyId : 0,
        companyOfficeID: user?.companyOfficeId == 0 ? 0 : user?.companyOfficeId,
      }).then(res => {
        if (res.data.resultCode == '100') {
          console.log('player id sended');
        } else {
          console.log('no player id');
        }
      });
    }
  }, [OneSignal.User.pushSubscription.getPushSubscriptionId()]);

  return (
    <MenuWrapper title={IntLabel('sharings')} type="sharing">
      <HandleData
        data={sharings}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{
            display: 'flex',
            gap: 15,
            paddingBottom: 20,
          }}
          data={sharings}
          renderItem={({item}) => <SharingComp item={item} />}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default Sharings;
