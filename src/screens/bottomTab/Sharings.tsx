import React, {useEffect, useState} from 'react';
import SharingComp from '../../components/SharingComp';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import HandleData from '../../components/HandleData';
import MenuWrapper from '../menu/MenuWrapper';
import CustomButtons from '../../components/CustomButtons';

const Sharings = () => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [sharings, setSharings] = useState([]);

  useEffect(() => {
    Post('/api/Shared/ListCompanySharedsMobile', {
      companyId: user.companyId,
      companyOfficeId: user.companyOfficeId,
      companyTypeId: user.userRoleId === 4 ? 1 : 0, // institution :0 , office:1
    }).then(res => {
      setSharings(res.data.object);
    });
  }, []);

  return (
    <MenuWrapper title="Paylaşımlar" type="sharing">
      <HandleData
        data={['']}
        loading={loading}
        title="Paylaşımınız Bulunmamaktadır">
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={['', '']}
          renderItem={({item}) => <SharingComp item={item} onClickable />}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default Sharings;
