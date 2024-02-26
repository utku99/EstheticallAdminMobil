import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import CustomInputs from '../../components/CustomInputs';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import OfferComp from '../../components/SentOfferComp';
import HandleData from '../../components/HandleData';
import {useNavigation} from '@react-navigation/native';
import AppointmentComp from '../../components/AppointmentComp';

const Appointment = () => {
  const [tab, setTab] = useState(1);
  const navigation = useNavigation();

  return (
    <MenuWrapper>
      <View className="flex-row space-x-2 mb-4">
        <CustomButtons
          type={tab == 1 ? 'brownsolid' : 'brownoutlined'}
          label="Randevularım"
          onPress={() => setTab(1)}
        />
        <CustomButtons
          type={tab == 2 ? 'brownsolid' : 'brownoutlined'}
          label="Yeni Randevu"
          onPress={() => setTab(2)}
        />
      </View>

      <HandleData data={['']} loading={false} title="Randevu Bulunmamaktadır">
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={['', '']}
          renderItem={({item}) => <AppointmentComp />}
        />

        <CustomButtons
          type="solid"
          theme="big"
          label="Randevu Oluştur"
          onPress={() => navigation.navigate('newappointment')}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default Appointment;
