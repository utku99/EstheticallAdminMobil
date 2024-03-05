import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';

const Appointment = () => {
  const [tab, setTab] = useState(1);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [waitingAppointments, setWaitingAppointments] = useState<any>([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState<any>([]);
  const [refusedAppointments, setRefusedAppointments] = useState<any>([]);

  useEffect(() => {
    Post('/api/Appointments/WaitingAppointmentsMobile', {
      companyId: user.companyId,
      companyOfficeId: user.companyOfficeId,
    }).then((res: any) => {
      setWaitingAppointments(res.data.object);
    });

    Post('/api/Appointments/AcceptedAppointmentsMobile', {
      companyId: user.companyId,
      companyOfficeId: user.companyOfficeId,
    }).then((res: any) => {
      setAcceptedAppointments(res.data.object);
    });

    Post('/api/Appointments/DeclineAppointmentsMobile', {
      companyId: user.companyId,
      companyOfficeId: user.companyOfficeId,
    }).then((res: any) => {
      setRefusedAppointments(res.data.object);
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
          data={waitingAppointments}
          loading={loading}
          title="Onay Bekleyen Randevu Bulunmamaktadır">
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingVertical: 20,
            }}
            data={waitingAppointments}
            renderItem={({item}) => <WaitingAppointmentComp item={item} />}
          />
        </HandleData>
      )}
      {tab == 2 && (
        <HandleData
          data={acceptedAppointments}
          loading={loading}
          title="Onaylanan Randevu Bulunmamaktadır">
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingVertical: 20,
            }}
            data={acceptedAppointments}
            renderItem={({item}) => <AcceptedAppointmentComp item={item} />}
          />
        </HandleData>
      )}
      {tab == 3 && (
        <HandleData
          data={refusedAppointments}
          loading={loading}
          title="Reddedilen Randevu Bulunmamaktadır">
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingVertical: 20,
            }}
            data={refusedAppointments}
            renderItem={({item}) => <RefusedAppointmentComp item={item} />}
          />
        </HandleData>
      )}
    </MenuWrapper>
  );
};

export default Appointment;
