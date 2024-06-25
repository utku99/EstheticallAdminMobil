import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import EstheticLogo from '../../assets/svg/common/EstheticLogo';
import CustomButtons from '../../components/CustomButtons';
import {useDispatch} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {setLoggedIn, setUser} from '../../redux/slices/user';
import CustomInputs from '../../components/CustomInputs';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import LangChoiceComp from '../../components/LangChoiceComp';
import IntLabel from '../../components/IntLabel';

const Login = () => {
  const {Post} = WebClient();
  const dispatch = useDispatch();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required(IntLabel('validation_message_this_field_is_required'))
        .email(IntLabel('invalid_email')),
      password: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
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
        if (res.data.code === '100' && res.data.object.userRoleId != 1) {
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
        <KeyboardAvoidingView className="flex-1">
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
                <EstheticLogo width={165} height={47} />
              </View>
            </View>

            <View className="w-full ">
              <Text className="text-customGray font-poppinsMedium text-xl self-center mb-6">
                {IntLabel('company_login')}
              </Text>
              <View className="">
                <CustomInputs
                  type="text"
                  placeholder={IntLabel('email')}
                  value={formik.values.email}
                  onBlur={formik.handleBlur('email')}
                  onChangeText={formik.handleChange('email')}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                />

                <CustomInputs
                  type="text"
                  placeholder={IntLabel('password')}
                  value={formik.values.password}
                  onBlur={formik.handleBlur('password')}
                  onChangeText={formik.handleChange('password')}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  secureTextEntry
                />
              </View>
            </View>

            <View className="w-full ">
              <CustomButtons
                type="solid"
                label={IntLabel('login')}
                onPress={formik.handleSubmit}
                theme="big"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
