import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import CustomButtons from '../../components/CustomButtons';
import HandleData from '../../components/HandleData';
import WaitingAppointmentComp from '../../components/WaitingAppointmentComp';
import AcceptedAppointmentComp from '../../components/AcceptedAppointmentComp';
import RefusedAppointmentComp from '../../components/RefusedAppointmentComp';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import IntLabel from '../../components/IntLabel';

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
  }, [tab]);

  return (
    <MenuWrapper>
      <View className="h-[40px] ">
        <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal: 10, gap: 5}}>
          <CustomButtons
            type={tab == 1 ? 'brownsolid' : 'brownoutlined'}
            label={IntLabel('waiting_approval')}
            onPress={() => setTab(1)}
          />
          <CustomButtons
            type={tab == 2 ? 'brownsolid' : 'brownoutlined'}
            label={IntLabel('accepted')}
            onPress={() => setTab(2)}
          />
          <CustomButtons
            type={tab == 3 ? 'brownsolid' : 'brownoutlined'}
            label={IntLabel('refused')}
            onPress={() => setTab(3)}
          />
        </ScrollView>
      </View>

      {tab == 1 && (
        <HandleData
          data={waitingAppointments}
          loading={loading}
          title={IntLabel('warning_no_active_record')}>
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
          title={IntLabel('warning_no_active_record')}>
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
          title={IntLabel('warning_no_active_record')}>
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
