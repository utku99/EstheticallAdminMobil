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

const NewOffer = ({route}: any) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const [offerInfo, setOfferofferInfo] = useState<any>(null);
  const [doctors, setDoctors] = useState<any>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      doctor: '',
      price: '',
      currency: currencyTypes[0],
      paymentRate: '',
      date: '',
      companyImages: [],
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

  useEffect(() => {
    Post('/api/Offers/GetOfferInfo', {
      offerID: route.params.offerId,
      companyID: user?.companyId,
      companyOfficeID: user?.companyOfficeId,
    }).then(res => {
      setOfferofferInfo(res.data.object);
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
    <MenuWrapper title={IntLabel('give_new_offer')}>
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
                {IntLabel('doctor')}:
              </Text>
              <CustomInputs
                type="dropdown"
                dropdownData={doctors}
                value={formik.values.doctor}
              />
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('desc')}:
              </Text>
              <CustomInputs type="textarea" />
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('price')}:
              </Text>
              <View className="h-[40px] flex-1 bg-white rounded-lg border border-customGray px-2 flex-row items-center">
                <TextInput
                  defaultValue={formik.values.price.toString()}
                  placeholderTextColor={'rgba(77, 74, 72, 0.5)'}
                  className="flex-1 text-customGray text-xs p-0 font-poppinsRegular "
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
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('payment_rate')} (%):
              </Text>
              <CustomInputs
                type="text"
                defaultValue={formik.values.paymentRate.toString()}
              />
            </View>
            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('transaction_date')}:
              </Text>
              <CustomInputs type="date" value={formik.values.date} />
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm mb-1">
                {IntLabel('company_images')} (600 x 450):{' '}
              </Text>
              <AddPhotoComp
                value={formik.values.companyImages}
                width={600}
                height={450}
              />
            </View>

            <CustomButtons
              type="solid"
              label={IntLabel('send')}
              icon="question"
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

export default NewOffer;
