import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES, temp} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import CustomInputs from '../../components/CustomInputs';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import MenuWrapper from '../menu/MenuWrapper';
import AddPhotoComp from '../../components/AddPhotoComp';
import {
  appointmentOperationStates,
  currencyTypes,
  offerStates,
} from '../../constants/Enum';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import IntLabel from '../../components/IntLabel';
import * as Yup from 'yup';
import moment from 'moment';
import {setClicked} from '../../redux/slices/common';
import SpinnerComp from '../../components/SpinnerComp';
import {useIntl} from 'react-intl';

const EditAppointment = () => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const [info, setInfo] = useState<any>(null);
  const [doctors, setDoctors] = useState<any>(null);
  const route = useRoute<any>();
  const dispatch = useDispatch();

  const statu = [
    {value: 1, label: IntLabel('waiting')},
    // { value: 2, label: "Ücret Ödenmiş" },
    {value: 3, label: IntLabel('refused')},
    {value: 4, label: IntLabel('accepted')},
    {value: 5, label: IntLabel('completed')},
    {value: 6, label: IntLabel('failed')},
  ];

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      date: info?.confirmDate ? moment(info?.confirmDate).toDate() : '',
      doctor: info?.doctorModel ?? '',
      desc: info?.description ?? '',
      operationState: statu.find(
        (item: any) => item.value == info?.operationState,
      ),
    } as any,
    validationSchema: Yup.object().shape({
      operationState: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      date: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      desc: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
    }),
    onSubmit: values => {
      Post(
        '/api/Appointments/EditAppointment',
        {
          appointmentID: info.appointmentID,
          confirmDate: values.date,
          operationState: info.operationState,
          doctorId: values.doctor.value ?? info.doctorModel.value,
          description: values.desc,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100') {
          dispatch(setClicked(true));
          navigation.goBack();
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/Appointments/GetAppointmentDetails', {
      appointmentID: route.params?.appointmentId,
    }).then(res => {
      setInfo(res.data.object);
    });

    Post('/api/CompanyDoctor/CompanyDoctorList', {
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then(res => {
      let newDoctor = res.data.object?.map((item: any) => ({
        value: item?.companyDoctorId,
        label: item?.doctorName,
      }));
      setDoctors(newDoctor);
    });
  }, []);

  return (
    <MenuWrapper title={IntLabel('edit_appointment')}>
      {loading ? (
        <View className=" flex-1 items-center justify-center">
          <SpinnerComp />
        </View>
      ) : (
        <ScrollView
          className={`border border-customLightGray rounded-xl bg-white `}
          contentContainerStyle={{flexGrow: 1}}
          // contentContainerStyle={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   justifyContent: 'space-between',
          // }}
          style={{width: SIZES.width * 0.95}}>
          {/* header */}
          <View className="flex-row justify-between items-center p-[10px]">
            <View className="flex-row items-center space-x-2  w-[60%]">
              <View className="w-[62px] h-[62px] overflow-hidden rounded-full border-[0.6px] border-customGray">
                <Image
                  source={{uri: info?.userLogo}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  className="text-customGray text-sm font-poppinsSemiBold">
                  {info?.userName}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppins text-xs font-poppinsRegular">
                  {info?.userAdress}
                </Text>
              </View>
            </View>
          </View>

          <View className="p-[10px] space-y-3">
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('state')}:
              </Text>
              <CustomInputs
                type="dropdown"
                dropdownData={statu}
                value={formik.values.operationState}
                onChange={(e: any) => {
                  Post(
                    '/api/Appointments/SetAppointmentState',
                    {
                      appointmentID: info?.appointmentID,
                      operationState: e.value,
                    },
                    true,
                    true,
                  ).then(res => {
                    if (res.data.code == '100') {
                      dispatch(setClicked(true));
                      navigation.goBack();
                    }
                  });
                }}
                error={formik.errors.operationState}
              />
            </View>

            {info?.doctorModel?.label && (
              <View>
                <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                  {IntLabel('doctor')}:
                </Text>
                <CustomInputs
                  type="dropdown"
                  dropdownData={doctors}
                  value={formik.values.doctor}
                  onChange={(e: any) => formik.setFieldValue('doctor', e)}
                />
              </View>
            )}
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('desc')}:
              </Text>
              <CustomInputs
                type="textarea"
                value={formik.values.desc}
                onChangeText={formik.handleChange('desc')}
                error={formik.errors.desc}
              />
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('transaction_date')}:
              </Text>
              <CustomInputs
                type="date"
                dateMode="datetime"
                value={formik.values.date}
                onChange={(e: any) => formik.setFieldValue('date', e)}
                error={formik.errors.date}
              />
            </View>
          </View>

          <View className="flex-1"></View>

          <View className="mb-3">
            <CustomButtons
              type="solid"
              label={IntLabel('save')}
              style={{alignSelf: 'center'}}
              onPress={() => formik.handleSubmit()}
            />
          </View>

          {/* bottom */}
          <Pressable className="bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]"></Pressable>
        </ScrollView>
      )}
    </MenuWrapper>
  );
};

export default EditAppointment;
