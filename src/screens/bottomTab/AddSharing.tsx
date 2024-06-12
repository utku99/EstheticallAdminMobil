import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import WebClient, {toast} from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import {SIZES} from '../../constants/constants';
import CustomInputs from '../../components/CustomInputs';
import AddPhotoComp from '../../components/AddPhotoComp';
import CustomButtons from '../../components/CustomButtons';
import {Switch} from 'react-native-paper';
import {useFormik} from 'formik';
import IntLabel from '../../components/IntLabel';
import * as Yup from 'yup';
import axios from 'axios';

const AddSharing = () => {
  const {Post, loading} = WebClient();
  const {user, isLoggedIn, language} = useSelector((state: any) => state.user);
  const [images, setImages] = useState<any>([]);
  const [companyOffice, setCompanyOffice] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const config = {
    headers: {
      Authorization: 'Bearer ' + user?.access_token,
      LanguageId: language?.type,
      'content-type': 'multipart/form-data',
    },
  };

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      language: language,
      office: '',
      service: '',
      subservice: '',
      externalLink: '',
      videoFile: '',
      title: '',
      content: '',
      statu: false,
      images: [],
    } as any,
    validationSchema: Yup.object().shape({
      service: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      subservice: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      externalLink: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      statu: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      title: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      content: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      videoFile: Yup.string().when('images', {
        is: (val: any) => val.length == 0,
        then: schema =>
          schema.required(
            IntLabel('validation_message_this_field_is_required'),
          ),
        otherwise: schema => schema,
      }),
    }),
    onSubmit: (values, {resetForm}) => {
      let formData = new FormData();
      formData.append('CompanyTypeId', user?.companyOfficeId == 0 ? 0 : 1);
      formData.append('CompanyId', user?.companyId);
      formData.append('OfficeId[0]', values.office.value ?? 0);
      // formData.append("FolderName", member?.folderFile);
      formData.append('ServiceId', values.service.value);
      formData.append('ServiceSubId', values.subservice.value);
      formData.append('RedirectUrl', values.externalLink);

      if (values.image?.length == 0) {
        formData.append('VideoFile', values.videoFile);
      } else {
        formData.append(
          'FileName',
          values.images.map((item: any) => item.split(',')[1]),
        );
      }

      formData.append('VideoUrl', 'a');
      formData.append('IsActive', values.statu);
      formData.append('IsConfirmed', false);
      formData.append('IsDeleted', false);

      formData.append(
        'addSharedResources[0].languageId',
        values.language?.type,
      );
      formData.append('addSharedResources[0].subject', values.content);
      formData.append('addSharedResources[0].description', values.title);

      formData.append('OnFacebook', false);
      formData.append('facebooksharedId', null);

      axios
        .post(
          'https://estheticallv2-api.ranna.com.tr/api/Shared/AddShared',
          formData,
          config,
        )
        .then(res => {
          if (res.data.code == '100') {
            resetForm();
            toast(res.data.message);
          } else {
            toast(res.data.message);
          }
        });
    },
  });

  useEffect(() => {
    Post('/api/Shared/ListCompanyOffices', {
      companyId: user?.companyId,
    }).then(res => {
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
        setCompanyOffice([{value: 0, label: 'Ana Kurum'}, ...newOffices]);
      }
    });

    Post('/api/Shared/ListCompanyServices', {
      companyId: user?.companyId,
      companyOfficeId: formik.values.office.value,
    }).then(res => {
      const newServices = res.data.object.map((service: any) => ({
        value: service.serviceId,
        label: service.serviceName,
        ...service,
      }));
      setServices(newServices);
    });
  }, [formik.values.office]);

  return (
    <MenuWrapper title={IntLabel('add_sharing')}>
      <HandleData
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: SIZES.width * 0.95}}
          className="flex-1">
          <CustomInputs
            type="dropdown"
            placeholder={IntLabel('office')}
            dropdownData={companyOffice}
            value={formik.values.office}
            onChange={(e: any) => formik.setFieldValue('office', e)}
          />

          {formik.values.service?.value ? (
            <CustomInputs
              type="dropdown"
              placeholder={IntLabel('sub_service')}
              dropdownData={services
                .find(
                  (item: any) =>
                    item.serviceId === formik.values.service?.value,
                )
                ?.subServices?.map((item: any) => ({
                  value: item.serviceSubId,
                  label: item.serviceSubName,
                }))}
              value={formik.values.subservice}
              onChange={(e: any) => formik.setFieldValue('subservice', e)}
              disable={services?.length == 0}
            />
          ) : (
            <CustomInputs
              type="dropdown"
              placeholder={IntLabel('service')}
              dropdownData={services}
              value={formik.values.service}
              onChange={(e: any) => formik.setFieldValue('service', e)}
            />
          )}

          <CustomInputs
            type="text"
            placeholder={IntLabel('title')}
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
          />

          <CustomInputs
            type="textarea"
            placeholder={IntLabel('content')}
            value={formik.values.content}
            onChangeText={formik.handleChange('content')}
          />

          <CustomInputs
            type="text"
            placeholder={IntLabel('external_link')}
            value={formik.values.externalLink}
            onChangeText={formik.handleChange('externalLink')}
          />

          <CustomInputs
            type="text"
            placeholder="Video"
            value={formik.values.video}
            onChangeText={formik.handleChange('video')}
          />

          <View className="flex-row items-center space-x-3 self-end">
            <Text className="text-base font-poppinsMedium text-customGray ">
              {formik.values.statu ? IntLabel('active') : IntLabel('passive')}
            </Text>
            <Switch
              value={formik.values.statu}
              onChange={() =>
                formik.setFieldValue('statu', !formik.values.statu)
              }
              thumbColor={'#FF8170'}
              color="#E8E8E8"
              ios_backgroundColor={'#E8E8E8'}
            />
          </View>

          <AddPhotoComp
            value={formik.values.images}
            onChange={(e: any) => formik.setFieldValue('images', e)}
            error={formik.errors.images}
          />

          <View className="flex-1"></View>

          <CustomButtons
            type="solid"
            label={IntLabel('add')}
            theme="big"
            onPress={() => formik.handleSubmit()}
          />
        </ScrollView>
      </HandleData>
    </MenuWrapper>
  );
};

export default AddSharing;
