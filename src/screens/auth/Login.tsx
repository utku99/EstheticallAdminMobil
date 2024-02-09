import { View, Text, ImageBackground, TouchableOpacity, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import EstheticLogo from '../../assets/svg/common/EstheticLogo'

import ArrowDownIcon from '../../assets/svg/auth/ArrowDownIcon'
import i18next, { languageResources } from '../../locales/i18next'
import languageList from "../../locales/languageList.json"
import CustomButtons from '../../components/CustomButtons'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WebClient from '../../utility/WebClient'
import { setLoggedIn, setUser } from '../../redux/slices/user'
import CustomInputs from '../../components/CustomInputs'



const Login = () => {
    const [open, setOpen] = useState(false)

    const { t } = useTranslation()
    const { Post } = WebClient()
    const dispatch = useDispatch()


    const { control, handleSubmit, } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: any) => {
        Post("/api/Auth/LoginCompany", {
            username: values.email,
            password: values.password,
        }, true, true)
            .then((res) => {
                if (res.data.code === "100" && res.data.object.userRoleId === 2) {
                    dispatch(setUser(res.data.object));
                    dispatch(setLoggedIn(true))
                }
            })
    }


    return (
        <ImageBackground className='flex-1 justify-center' source={require("../../assets/images/authBg/auth.jpg")} resizeMode='cover'>

            <ScrollView className='' contentContainerStyle={{ alignItems: "center", paddingHorizontal: 30, flexGrow: 1, paddingVertical: 20, justifyContent: "space-between" }}>

                {/* lang choice */}
                <View className=''>
                    <View className='self-end -mr-[10%] relative'>
                        <Pressable className='flex-row items-center gap-2 ' onPress={() => setOpen(!open)}>
                            <Text className='font-medium text-xl text-customGray font-poppins'>{i18next.language.toLocaleUpperCase()}</Text>
                            <ArrowDownIcon />
                        </Pressable>
                        {
                            open &&
                            <View className='bg-white absolute w-[100px] py-3 top-[35px] justify-between -right-5 z-50 rounded-lg border-[0.5px] border-customGray'>
                                <FlatList
                                    data={Object.keys(languageResources)}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => { i18next.changeLanguage(item); setOpen(false) }} className='items-center justify-center'>
                                            <Text className='text-lg text-customGray'>{languageList[item]?.nativeName}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        }
                    </View>
                    <View className='-z-10'>
                        <EstheticLogo />
                    </View>
                </View>



                <View className='w-full '>
                    <Text className='text-customGray font-medium text-xl font-poppins self-center mb-6'>Kurum Girişi</Text>
                    <View className=''>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                                <CustomInputs type='text' placeholder='E-Posta' value={value} onBlur={onBlur} onChangeText={onChange} error={error} />
                            )}
                            name='email'
                            rules={{ required: { value: true, message: "email gereklidir" }, }}
                        />

                        <Controller
                            control={control}
                            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                                <CustomInputs type='text' placeholder='Şifre' value={value} onBlur={onBlur} onChangeText={onChange} error={error} secureTextEntry />
                            )}
                            name='password'
                            rules={{ required: { value: true, message: "şifre gereklidir" }, }}
                        />
                        <Text className='font-medium text-sm font-poppins text-customOrange self-end'>{t("forgot-password")}</Text>
                    </View>
                </View>


                <View className='w-full '>
                    <CustomButtons type='solid' label='Giriş Yap' onPress={handleSubmit(onSubmit)} theme='big' />
                </View>

            </ScrollView>

        </ImageBackground>
    )
}

export default Login