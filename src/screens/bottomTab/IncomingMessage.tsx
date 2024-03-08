import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import MessageComp from '../../components/MessageComp';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {useNavigation} from '@react-navigation/native';

const IncomingMessage = () => {
  const {connection, message, connectionId, totalUsers} = useSelector(
    (state: any) => state.hub,
  );
  const {Post, loading} = WebClient();
  const navigation = useNavigation();
  const {user} = useSelector((state: any) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (true) {
      Post('/api/Chatting/GetUserMessageSenders', {
        roomID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        companyID: 0,
        companyOfficeID: 0,
        userID: 0,
      }).then(res => setUsers(res.data.object));

      connection.invoke('LoginMessageHub', {UserID: user?.id, TypeID: 1});
    } else {
      navigation.navigate('sharing');
    }

    return () => {
      connection.invoke('LeaveRoom');
    };
  }, []);

  return (
    <MenuWrapper title="Mesajlar" type="message">
      <HandleData
        data={users}
        title={'Mesajınız Bulunmamaktadır'}
        loading={loading}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15}}
          data={users}
          renderItem={({item}) => <MessageComp item={item} />}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default IncomingMessage;
