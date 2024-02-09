import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import UserWrapper from './MenuWrapper'
import CustomButtons from '../../components/CustomButtons'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setUser } from '../../redux/slices/user'
import MenuWrapper from './MenuWrapper'



const LogOut = ({ navigation }: any) => {
    const dispatch = useDispatch()

    return (
        <MenuWrapper title='Çıkış Yap'>

            <View className=' justify-center px-[20px] space-y-4 h-full'>
                <Text className='font-medium font-poppins text-customGray text-base text-center'>Uygulamadan çıkış yapmak istediğinize emin misiniz?</Text>
                <View className='flex-row items-center justify-evenly'>
                    <CustomButtons type='outlined' label='Vazgeç' theme='big' onPress={() => navigation.goBack()} />
                    <CustomButtons type='solid' label='Tamam' theme='big' onPress={() => {
                        dispatch(setUser(null));
                        dispatch(setLoggedIn(false));
                    }} />
                </View>
            </View>

        </MenuWrapper>
    )
}

export default LogOut