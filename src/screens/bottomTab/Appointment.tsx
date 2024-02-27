import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import CustomInputs from '../../components/CustomInputs';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import OfferComp from '../../components/SentOfferComp';
import HandleData from '../../components/HandleData';
import {useNavigation} from '@react-navigation/native';
import AppointmentComp from '../../components/AppointmentComp';
import WaitingAppointmentComp from '../../components/WaitingAppointmentComp';
import AcceptedAppointmentComp from '../../components/AcceptedAppointmentComp';
import RefusedAppointmentComp from '../../components/RefusedAppointmentComp';

const Appointment = () => {
  const [tab, setTab] = useState(1);
  const navigation = useNavigation();

  return (
    <MenuWrapper>
      <View className="h-[40px] ">
        <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal: 10, gap: 5}}>
          <CustomButtons
            type={tab == 1 ? 'brownsolid' : 'brownoutlined'}
            label="Onay Bekleyenler"
            onPress={() => setTab(1)}
          />
          <CustomButtons
            type={tab == 2 ? 'brownsolid' : 'brownoutlined'}
            label="Onaylananlar"
            onPress={() => setTab(2)}
          />
          <CustomButtons
            type={tab == 3 ? 'brownsolid' : 'brownoutlined'}
            label="Reddedilenler"
            onPress={() => setTab(3)}
          />
        </ScrollView>
      </View>

      {tab == 1 && (
        <HandleData
          data={['', '']}
          loading={false}
          title="Paylaşımınız Bulunmamaktadır">
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingVertical: 20,
            }}
            data={['', '']}
            renderItem={({item}) => <WaitingAppointmentComp item={item} />}
          />
        </HandleData>
      )}
      {tab == 2 && (
        <HandleData
          data={['', '']}
          loading={false}
          title="Paylaşımınız Bulunmamaktadır">
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingVertical: 20,
            }}
            data={['', '']}
            renderItem={({item}) => <AcceptedAppointmentComp item={item} />}
          />
        </HandleData>
      )}
      {tab == 3 && (
        <HandleData
          data={['', '']}
          loading={false}
          title="Paylaşımınız Bulunmamaktadır">
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingVertical: 20,
            }}
            data={['', '']}
            renderItem={({item}) => <RefusedAppointmentComp item={item} />}
          />
        </HandleData>
      )}
    </MenuWrapper>
  );
};

export default Appointment;
