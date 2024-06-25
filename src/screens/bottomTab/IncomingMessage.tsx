import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import MessageComp from '../../components/MessageComp';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {useNavigation} from '@react-navigation/native';
import IntLabel from '../../components/IntLabel';

const IncomingMessage = () => {
  const {connection, message, connectionId, totalUsers} = useSelector(
    (state: any) => state.hub,
  );
  const {Post, loading} = WebClient();
  const navigation = useNavigation<any>();
  const {user} = useSelector((state: any) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (connectionId) {
      Post('/api/Chatting/GetCompanyMessageSenders', {
        roomID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        companyID: user?.companyOfficeId == 0 ? user?.companyId : 0,
        companyOfficeID: user?.companyOfficeId,
        userID: 0,
      }).then(res => setUsers(res.data.object));
    } else {
      navigation.navigate('sharing');
    }

    return () => {
      connection.invoke('LeaveRoom');
    };
  }, []);

  return (
    <MenuWrapper title={IntLabel('messages')}>
      <HandleData
        data={users}
        title={IntLabel('warning_no_active_record')}
        loading={loading}>
        <FlatList
          contentContainerStyle={{
            display: 'flex',
            gap: 15,
          }}
          data={users}
          renderItem={({item}) => <MessageComp item={item} />}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default IncomingMessage;
