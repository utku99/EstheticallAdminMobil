import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import {SIZES} from '../../constants/constants';
import CustomInputs from '../../components/CustomInputs';
import AddPhotoComp from '../../components/AddPhotoComp';
import CustomButtons from '../../components/CustomButtons';
import {Switch} from 'react-native-paper';
import {useFormik} from 'formik';
import IntLabel from '../../components/IntLabel';

const AddSharing = () => {
  const {Post, loading} = WebClient();
  const {user, isLoggedIn} = useSelector((state: any) => state.user);
  const [images, setImages] = useState<any>([]);
  const [companyOffice, setCompanyOffice] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      office: '',
      service: '',
      subservice: '',
      title: '',
      content: '',
      externalLink: '',
      video: '',
      images: [],
      statu: false,
    } as {
      office: any;
      service: any;
      subservice: any;
      title: any;
      content: any;
      externalLink: any;
      video: any;
      images: any;
      statu: boolean;
    },
    onSubmit: values => {
      Post(
        '/api/Shared/AddShared',
        {
          companyTypeId: user?.userRoleId === 4 ? 1 : 0,
          companyId: user?.companyId,
          officeId: values.office.value,
          folderName: user?.folderFile,
          serviceId: values.service.value,
          serviceSubId: values.subservice.value,
          description: values.title,
          subject: values.content,
          languageId: 1,
          redirectUrl: values.externalLink,
          videoUrl: values.video,
          isActive: values.statu,
          isConfirmed: false,
          isDeleted: false,
          fileName: values.images,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100') {
          formik.resetForm();
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
        data={['']}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <View style={{width: SIZES.width * 0.95}} className=" flex-1">
          <CustomInputs
            type="dropdown"
            placeholder={IntLabel('office')}
            dropdownData={companyOffice}
            value={formik.values.office}
            onChange={(e: any) => formik.setFieldValue('office', e)}
          />

          <CustomInputs
            type="dropdown"
            placeholder={IntLabel('service')}
            dropdownData={services}
            value={formik.values.service}
            onChange={(e: any) => formik.setFieldValue('service', e)}
          />

          <CustomInputs
            type="dropdown"
            placeholder={IntLabel('sub_service')}
            dropdownData={services
              .find(
                (item: any) => item.serviceId === formik.values.service?.value,
              )
              ?.subServices?.map((item: any) => ({
                value: item.serviceSubId,
                label: item.serviceSubName,
              }))}
            value={formik.values.subservice}
            onChange={(e: any) => formik.setFieldValue('subservice', e)}
          />

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

          <View className=" relative">
            <View
              style={{
                height: formik.values.images.length == 5 ? 60 : 0,
              }}></View>
            <AddPhotoComp
              value={formik.values.images}
              onChange={(e: any) => formik.setFieldValue('images', e)}
              width={600}
              height={450}
            />
            <View className="flex-row items-center space-x-3 absolute right-0 top-4">
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
          </View>

          <View className="flex-1"></View>
          <CustomButtons
            type="solid"
            label={IntLabel('add')}
            theme="big"
            onPress={formik.handleSubmit}
          />
        </View>
      </HandleData>
    </MenuWrapper>
  );
};

export default AddSharing;
