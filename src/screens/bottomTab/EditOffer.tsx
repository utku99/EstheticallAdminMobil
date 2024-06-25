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
import {useNavigation} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import MenuWrapper from '../menu/MenuWrapper';
import AddPhotoComp from '../../components/AddPhotoComp';
import {currencyTypes, offerStates} from '../../constants/Enum';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import IntLabel from '../../components/IntLabel';
import * as Yup from 'yup';
import moment from 'moment';
import {setClicked} from '../../redux/slices/common';
import SpinnerComp from '../../components/SpinnerComp';
import {useIntl} from 'react-intl';

const NewOffer = ({route}: any) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const [offerInfo, setOfferInfo] = useState<any>(null);
  const [doctors, setDoctors] = useState<any>([]);
  const dispatch = useDispatch();
  const [clicked2, setClicked2] = useState(false);

  const statu = [
    {value: 0, label: IntLabel('waiting')},
    {value: 1, label: IntLabel('completed')},
    {value: 2, label: IntLabel('paid')},
    {value: 3, label: IntLabel('refused')},
  ];

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      doctor:
        doctors?.find((tmp: any) => tmp.value == offerInfo?.doctorID) ?? '',
      price: offerInfo?.price ?? '',
      currency:
        currencyTypes.find(tmp => tmp.value == offerInfo?.currencyType) ?? '',
      paymentRate: offerInfo?.priceRate ?? '',
      date: offerInfo?.date ? moment(offerInfo?.date).toDate() : '',
      desc: offerInfo?.content ?? '',
      statu: statu.find(item => item.value === offerInfo?.status),
    } as any,
    validationSchema: Yup.object().shape({
      price: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      paymentRate: Yup.string().required(
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
        '/api/Offers/EditOfferInfo',
        {
          offerID: offerInfo?.offerID,
          offerInfoID: offerInfo?.offerInfoID,
          companyID: user?.companyId,
          companyOfficeID: user?.companyOfficeId,
          doctorID: values.doctor.value,
          price: Number(values.price),
          currencyType: values.currency.value,
          priceRate: Number(values.paymentRate),
          date: values.date,
          statu: statu.find((item: any) => item.value === offerInfo?.status),
          description: values.desc,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100') {
          navigation.goBack();
          dispatch(setClicked(true));
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/Offers/GetOfferInfo', {
      offerID: route.params.offerId,
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then(res => {
      setOfferInfo(res.data.object);
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

    setClicked2(false);
  }, [clicked2]);

  return (
    <MenuWrapper title={IntLabel('edit')}>
      {loading ? (
        <View className=" flex-1 items-center justify-center">
          <SpinnerComp />
        </View>
      ) : (
        <ScrollView
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
                  {offerInfo?.userFullName}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppins text-xs font-poppinsRegular">
                  {offerInfo?.location}
                </Text>
              </View>
            </View>
          </View>

          <View className="p-[10px] space-y-3">
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('statu')}:
              </Text>
              <CustomInputs
                type="dropdown"
                dropdownData={statu}
                value={formik.values.statu}
                onChange={(e: any) => {
                  Post(
                    '/api/Offers/SetOfferState',
                    {
                      offerID: offerInfo?.offerID,
                      offerInfoID: offerInfo?.offerInfoID,
                      state: e.value,
                    },
                    true,
                    true,
                  ).then(res => {
                    navigation.goBack();
                    dispatch(setClicked(true));
                  });
                }}
              />
            </View>

            {doctors?.length != 0 && (
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
                {IntLabel('price')}:
              </Text>

              <View>
                <View className="h-[40px] flex-1 bg-white rounded-lg border border-customGray px-2 flex-row items-center">
                  <TextInput
                    defaultValue={formik.values.price.toString()}
                    placeholderTextColor={'rgba(77, 74, 72, 0.5)'}
                    onChangeText={e => formik.setFieldValue('price', e)}
                    className="flex-1 text-customGray text-xs p-0 font-poppinsRegular "
                    keyboardType="number-pad"
                  />
                  <Dropdown
                    data={currencyTypes}
                    value={formik.values.currency}
                    onChange={e => formik.setFieldValue('currency', e)}
                    mode="default"
                    labelField="label"
                    valueField="value"
                    selectedTextStyle={{
                      fontSize: 12,
                      color: '#4D4A48',
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'right',
                      paddingRight: 5,
                    }}
                    style={{width: 100}}
                  />
                </View>
                {formik.errors.price && formik.touched.price && (
                  <Text className="text-red-400 text-xs ">
                    {formik.errors.price}
                  </Text>
                )}
              </View>
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('payment_rate')} (%):
              </Text>
              <CustomInputs
                type="text"
                defaultValue={formik.values.paymentRate.toString()}
                onChangeText={(e: any) =>
                  formik.setFieldValue('paymentRate', e)
                }
                error={formik.errors.paymentRate}
                touched={formik.touched.paymentRate}
              />
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('transaction_date')}:
              </Text>
              <CustomInputs
                type="date"
                value={formik.values.date}
                dateMode="datetime"
                onChange={(e: any) => formik.setFieldValue('date', e)}
                error={formik.errors.date}
                touched={formik.touched.date}
              />
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('company_images')} (600 x 450):{' '}
              </Text>
              <AddPhotoComp
                type="edit"
                value={offerInfo?.offerInfoSlider ?? []}
                onAdd={(e: any) => {
                  Post('/api/Offers/AddOfferInfoSlider', {
                    offerInformationID: offerInfo?.offerInfoID,
                    userID: user?.id,
                    folderName: user?.folderFile,
                    image: e,
                  }).then(res => {
                    dispatch(setClicked(true));
                    setClicked2(true);
                  });
                }}
                onDelete={(e: any) => {
                  Post('api/Offers/DeleteOfferInfoSlider', {
                    offerInfoSliderId: e.sliderID,
                  }).then(res => {
                    dispatch(setClicked(true));
                    setClicked2(true);
                  });
                }}
              />
            </View>

            <CustomButtons
              type="solid"
              label={IntLabel('send')}
              icon="question"
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

export default NewOffer;
