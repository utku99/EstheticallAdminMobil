import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import CustomButtons from '../../components/CustomButtons';
import {useIntl} from 'react-intl';
import IntLabel from '../../components/IntLabel';
import CustomInputs from '../../components/CustomInputs';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import ModalWrapper from '../../components/ModalWrapper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk-next';
import {SIZES} from '../../constants/constants';

const TableComp = ({item, selectedSharings, setSelectedSharings}: any) => {
  let value = selectedSharings.some((tmp: any) => tmp.id == item.id);

  return (
    <View className="w-full flex flex-row items-center space-x-1  bg-white border border-customLightGray h-[70px]">
      <View className="border-r border-customLightGray h-full flex-row items-center justify-center w-[34px]">
        <CustomInputs
          type="checkbox"
          style={{marginBottom: 0}}
          value={value}
          onChange={() => {
            if (value) {
              const newSelectedSharings = selectedSharings.filter(
                (tmp: any) => tmp.id != item.id,
              );
              setSelectedSharings(newSelectedSharings);
            } else {
              const newSelectedSharings = [...selectedSharings, item];
              setSelectedSharings(newSelectedSharings);
            }
          }}
        />
      </View>
      <View className="border-r border-customLightGray h-full flex-row items-center justify-center w-[70px]">
        <Image
          source={{
            uri: item?.attachments[0]?.src
              ? item?.attachments[0]?.src
              : item?.attachments[0]?.source,
          }}
          width={60}
          height={60}
        />
      </View>
      <View className="border-r border-customLightGray h-full justify-center flex-1">
        <Text
          numberOfLines={4}
          className="text-customGray font-poppinsRegular text-xs ">
          {item?.message}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        className="text-customGray font-poppinsRegular text-xs w-[100px]">
        {item?.createdTime}
      </Text>
    </View>
  );
};

const SocialMediaSharings = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const intl = useIntl();

  const [facebookSharings, setFacebookSharings] = useState<any>();
  const [instagramSharings, setInstagramSharings] = useState<any>();

  const [selectedSharings, setSelectedSharings] = useState<any>([]);

  const [visible, setVisible] = useState(false);

  const [companyOffice, setCompanyOffice] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      office: [],
      service: '',
      subservice: '',
    } as any,
    validationSchema: Yup.object().shape({
      office: Yup.array().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      service: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      subservice: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
    }),
    onSubmit: (values, {resetForm}) => {},
  });

  useEffect(() => {
    Post('/api/SocialPlatforms/GetPostsFacebook', {
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then((res: any) => {
      setFacebookSharings(res.data.object ?? []);
    });

    Post('/api/SocialPlatforms/GetPostsInstagram', {
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then((res: any) => {
      setInstagramSharings(res.data.object ?? []);
    });

    Post('/api/Shared/ListCompanyOffices', {
      companyId: user?.companyId,
    }).then((res: any) => {
      const newOffices = res.data.object.map((office: any) => ({
        value: office.officeId,
        label: office.officeName,
      }));
      if (user?.userRoleId === 4) {
        const office = newOffices.find(
          (item: any) => item.value === user?.companyOfficeId,
        );
        setCompanyOffice([office]);
      } else {
        setCompanyOffice([
          {value: 0, label: IntLabel('main_institution')},
          ...newOffices,
        ]);
      }
    });

    Post('/api/Shared/ListCompanyServices', {
      companyId: user?.companyId,
      companyOfficeId: user?.companyOfficeId,
    }).then((res: any) => {
      const newServices = res.data.object.map((service: any) => ({
        value: service.serviceId,
        label: service.serviceName,
        ...service,
      }));
      setServices(newServices ?? []);
    });
  }, []);

  return (
    <MenuWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLogged ? (
          <>
            <View className="flex flex-row  space-x-4">
              <CustomButtons
                type={activeTab == 1 ? 'solid' : 'outlined'}
                label="Facebook"
                onPress={() => setActiveTab(1)}
              />
              <CustomButtons
                type={activeTab == 2 ? 'solid' : 'outlined'}
                label="Instagram"
                onPress={() => setActiveTab(2)}
              />
              <View className="flex-1"></View>
              <CustomButtons
                type="solid"
                label={IntLabel('exit')}
                onPress={() => setActiveTab(2)}
              />
            </View>
            <HandleData
              loading={loading}
              data={activeTab == 1 ? facebookSharings : instagramSharings}>
              <View className="w-full flex flex-row items-center space-x-1  bg-gray-200 border border-customLightGray h-[40px] mt-6">
                <View className="border-r border-customLightGray h-full flex-row items-center justify-center w-[34px]">
                  <CustomInputs
                    type="checkbox"
                    style={{marginBottom: 0}}
                    value={
                      selectedSharings?.length ==
                      (activeTab == 1 ? facebookSharings : instagramSharings)
                        ?.length
                        ? true
                        : false
                    }
                    onChange={() => {
                      if (
                        selectedSharings?.length ==
                        (activeTab == 1 ? facebookSharings : instagramSharings)
                          ?.length
                      ) {
                        setSelectedSharings([]);
                      } else {
                        setSelectedSharings(
                          activeTab == 1 ? facebookSharings : instagramSharings,
                        );
                      }
                    }}
                  />
                </View>
                <View className="border-r border-customLightGray h-full flex-row items-center justify-center w-[70px]"></View>
                <View className="border-r border-customLightGray h-full justify-center flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-customGray font-poppinsRegular text-sm ">
                    {IntLabel('sharing')}
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  className="text-customGray font-poppinsRegular text-center text-sm w-[100px]">
                  {IntLabel('created_date')}
                </Text>
              </View>
              <FlatList
                data={activeTab == 1 ? facebookSharings : instagramSharings}
                renderItem={({item, index}) => (
                  <TableComp
                    key={index}
                    item={item}
                    selectedSharings={selectedSharings}
                    setSelectedSharings={setSelectedSharings}
                  />
                )}
              />
            </HandleData>
          </>
        ) : (
          <View className="flex space-y-4 items-center">
            {/* <CustomButtons
              type="solid"
              label={intl.formatMessage({
                id: 'connect_facebook_and_instagram',
                defaultMessage: 'connect_facebook_and_instagram',
              })}
              style={{width: 250}}
              onPress={() => ''}
            /> */}

            <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            />
            <Text className=" text-customGray font-poppinsRegular text-sm">
              {IntLabel('facebook_connect_info')}
            </Text>
          </View>
        )}
      </ScrollView>

      {selectedSharings?.length != 0 && (
        <View className="flex-row absolute bottom-0 left-0 right-0 justify-center">
          <CustomButtons
            type="solid"
            theme="big"
            label={intl.formatMessage({
              id: 'add_selected',
              defaultMessage: 'add_selected',
            })}
            onPress={() => setVisible(true)}
          />
        </View>
      )}

      <ModalWrapper visible={visible} setVisible={setVisible}>
        <CustomInputs
          dropdownData={companyOffice}
          type="dropdown"
          title={IntLabel('office')}
          value={formik.values.office}
          onChange={(e: any) => formik.setFieldValue('office', e)}
          error={formik.errors.office}
        />
        {formik.values.service?.value ? (
          <CustomInputs
            dropdownData={services
              .find(
                (item: any) => item.serviceId === formik.values.service?.value,
              )
              ?.subServices?.map((item: any) => ({
                value: item.serviceSubId,
                label: item.serviceSubName,
              }))}
            type="dropdown"
            title={IntLabel('sub_service')}
            value={formik.values.subservice}
            onChange={(e: any) => formik.setFieldValue('subservice', e)}
            error={formik.errors.subservice}
          />
        ) : (
          <CustomInputs
            dropdownData={services}
            type="dropdown"
            title={IntLabel('service')}
            value={formik.values.service}
            onChange={(e: any) => formik.setFieldValue('service', e)}
            error={formik.errors.service}
          />
        )}
        <View className="flex-row self-end">
          <CustomButtons
            type="solid"
            label={IntLabel('add')}
            onPress={() => formik.handleSubmit()}
          />
        </View>
      </ModalWrapper>
    </MenuWrapper>
  );
};

export default SocialMediaSharings;
