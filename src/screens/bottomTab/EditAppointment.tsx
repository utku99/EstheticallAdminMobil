import {View, Text, Image, Pressable, FlatList, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES, temp} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import CustomInputs from '../../components/CustomInputs';
import {useNavigation} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import MenuWrapper from '../menu/MenuWrapper';
import AddPhotoComp from '../../components/AddPhotoComp';
import {currencyTypes, offerStates} from '../../constants/Enum';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import IntLabel from '../../components/IntLabel';

const EditAppointment = () => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const [offerInfo, setOfferofferInfo] = useState<any>(null);
  const [doctors, setDoctors] = useState<any>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      doctor:
        doctors?.find((item: any) => item.label === offerInfo?.doctorName) ??
        '',
      price: offerInfo?.price ?? '',
      currency:
        currencyTypes.find(item => item?.value === offerInfo?.currencyType) ??
        1,
      paymentRate: offerInfo?.priceRate ?? '',
      date: offerInfo?.date ?? '',
      companyImages: offerInfo?.offerInfoSlider ?? [],
      statu: offerStates.find(item => item.value === offerInfo?.status),
    },
    onSubmit: values => {
      Post(
        '/api/Offers/EditOfferInfo',
        {
          offerID: offerInfo?.offerID,
          offerInfoID: offerInfo?.offerInfoID,
          companyID: user?.companyId,
          companyOfficeID: user?.companyOfficeId,
          doctorID: values.doctor.value,
          price: values.price,
          currencyType: values.currency.value,
          priceRate: values.paymentRate,
          date: '2023-12-05T07:32',
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100') {
          navigation.goBack();
        }
      });
    },
  });

  return (
    <MenuWrapper title={IntLabel('edit_appointment')}>
      <View className="items-center">
        <View
          className={`h-fit border border-customLightGray rounded-xl bg-white `}
          style={{width: SIZES.width * 0.95}}>
          {/* header */}
          <View className="flex-row justify-between items-center p-[10px]">
            <View className="flex-row items-center space-x-2  w-[60%]">
              <View className="w-[62px] h-[62px] overflow-hidden rounded-full border-[0.6px] border-customGray">
                <Image
                  source={{uri: temp}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  className="text-customGray text-sm font-poppinsSemiBold">
                  Berna
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppins text-xs font-poppinsRegular">
                  Ankara
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
                dropdownData={offerStates}
                value={formik.values.statu}
              />
            </View>
            {/* <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                Doktor:
              </Text>
              <CustomInputs
                type="dropdown"
                dropdownData={doctors}
                value={formik.values.doctor}
              />
            </View> */}
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('desc')}:
              </Text>
              <CustomInputs type="textarea" />
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('transaction_date')}:
              </Text>
              <CustomInputs
                type="date"
                value={formik.values.date}
                onChange={(e: any) => formik.setFieldValue('date', e)}
                error={formik.errors.date}
              />
            </View>

            <CustomButtons
              type="solid"
              label={IntLabel('save')}
              style={{alignSelf: 'center'}}
              onPress={() => ''}
            />
          </View>

          {/* bottom */}
          <Pressable className="bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]"></Pressable>
        </View>
      </View>
    </MenuWrapper>
  );
};

export default EditAppointment;
