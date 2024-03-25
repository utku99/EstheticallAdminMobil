import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './MenuWrapper';
import NotificationComp from '../../components/NotificationComp';
import MenuWrapper from './MenuWrapper';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import HandleData from '../../components/HandleData';

const Notification = () => {
  const {user} = useSelector((state: any) => state.user);
  const {Post, loading} = WebClient();
  const [notifications, setNotifications] = useState<any>();
  const [clicked, setClicked] = useState<any>(false);

  useEffect(() => {
    Post('/api/Notification/GetNotificationsByUserID', {
      userID: user?.id,
      languageId: 1,
    }).then(res => {
      setNotifications(res.data.object);
    });

    setClicked(false);
  }, [clicked]);

  return (
    <MenuWrapper title="Bildirimler">
      <HandleData
        data={notifications}
        title={'Bildiriminiz Bulunmamaktadır'}
        loading={loading}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15}}
          data={notifications}
          renderItem={({item}) => (
            <NotificationComp item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default Notification;
