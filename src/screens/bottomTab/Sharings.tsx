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
import {useIntl} from 'react-intl';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Sharings = () => {
  const {Post, loading} = WebClient();
  const {user, language} = useSelector((state: any) => state.user);
  const [sharings, setSharings] = useState([]);
  const {connection, connectionId} = useSelector((state: any) => state.hub);
  const intl = useIntl();
  const navigation = useNavigation<any>();

  const [clicked, setClicked] = useState(false);

  OneSignal.initialize('36ba4e67-6a5f-4bae-9269-4ccdededab2d');

  OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  useEffect(() => {
    const func = async () => {
      let OneSignalId = await OneSignal.User.pushSubscription.getIdAsync();

      Post('/api/Shared/ListCompanySharedsMobile', {
        companyId: user.companyId,
        companyOfficeId: user.companyOfficeId,
        companyTypeId: user.companyOfficeId == 0 ? 0 : 1, // institution :0 , office:1
      }).then(res => {
        let temp = res.data.map((tmp: any) => {
          if (tmp.videoUrl) {
            return {
              ...tmp,
              images: [{fileName: tmp.videoUrl}],
            };
          } else {
            return tmp;
          }
        });

        setSharings(temp);
        setClicked(false);
      });

      if (OneSignalId) {
        Post('/api/Notification/SendOneSignalID', {
          oneSignalID: OneSignalId,
          userID: user?.id,
          languageId: language?.type ?? 1,
          companyID: user?.companyOfficeId == 0 ? user?.companyId : 0,
          companyOfficeID:
            user?.companyOfficeId == 0 ? 0 : user?.companyOfficeId,
        }).then(res => {
          if (res.data.resultCode == '100') {
            console.log('player id sended');
          } else {
            console.log('no player id');
          }
        });
      }

      if (user && connection) {
        connection.invoke('LoginMessageHub', {
          UserID: user?.companyId,
          TypeID: user?.companyOfficeId == 0 ? 2 : 3,
        });
      }
    };

    func();
  }, [clicked]);

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
            paddingBottom: 60,
          }}
          data={sharings}
          renderItem={({item, index}) => (
            <SharingComp key={index} item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
      <View className="absolute bottom-2 left-0 right-0 flex-row justify-center ">
        <CustomButtons
          type="solid"
          theme="big"
          label={intl.formatMessage({
            id: 'social_media_sharings',
            defaultMessage: 'social_media_sharings',
          })}
          onPress={() => navigation.navigate('socialmediasharings')}
        />
      </View>
    </MenuWrapper>
  );
};

export default Sharings;
