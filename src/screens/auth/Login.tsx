import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import EstheticLogo from '../../assets/svg/common/EstheticLogo';

import ArrowDownIcon from '../../assets/svg/auth/ArrowDownIcon';
import i18next, {languageResources} from '../../locales/i18next';
import languageList from '../../locales/languageList.json';
import CustomButtons from '../../components/CustomButtons';
import {useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import WebClient from '../../utility/WebClient';
import {setLoggedIn, setUser} from '../../redux/slices/user';
import CustomInputs from '../../components/CustomInputs';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import LangChoiceComp from '../../components/LangChoiceComp';

const Login = () => {
  const [open, setOpen] = useState(false);

  const {t} = useTranslation();
  const {Post} = WebClient();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('mail alanı gereklidir')
        .email('email formatında olmalıdır'),
      password: Yup.string().required('şifre alanı gereklidir'),
    }),
    onSubmit: values => {
      Post(
        '/api/Auth/LoginCompany',
        {
          username: values.email,
          password: values.password,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100' && res.data.object.userRoleId === 2) {
          dispatch(setUser(res.data.object));
          dispatch(setLoggedIn(true));
        }
      });
    },
  });

  return (
    <ImageBackground
      className="flex-1 justify-center"
      source={require('../../assets/images/authBg/auth.jpg')}
      resizeMode="cover">
      <SafeAreaView className="flex-1">
        <ScrollView
          className=""
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 30,
            flexGrow: 1,
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}>
          {/* top cont */}
          <View className="relative  w-full items-center">
            <View className="absolute right-0 -top-5 ">
              <LangChoiceComp />
            </View>
            <View className="">
              <EstheticLogo />
            </View>
          </View>

          <View className="w-full ">
            <Text className="text-customGray font-poppinsMedium text-xl self-center mb-6">
              Kurum Girişi
            </Text>
            <View className="">
              <CustomInputs
                type="text"
                placeholder="E-Posta"
                value={formik.values.email}
                onBlur={formik.handleBlur('email')}
                onChangeText={formik.handleChange('email')}
                error={formik.errors.email}
              />

              <CustomInputs
                type="text"
                placeholder="Şifre"
                value={formik.values.password}
                onBlur={formik.handleBlur('password')}
                onChangeText={formik.handleChange('password')}
                error={formik.errors.password}
                secureTextEntry
              />
            </View>
          </View>

          <View className="w-full ">
            <CustomButtons
              type="solid"
              label="Giriş Yap"
              onPress={formik.handleSubmit}
              theme="big"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
