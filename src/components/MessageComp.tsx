import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SIZES } from '../constants/constants'
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TrashIcon from '../assets/svg/firm/TrashIcon'

const MessageComp = () => {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)


    return (
        <Swipeable
            renderLeftActions={() => (
                <TouchableOpacity onPress={() => ""} className='w-[80] bg-customOrange rounded-l-lg items-center justify-center'>
                    <View className='bg-white w-[24] h-[24] items-center justify-center rounded-md'>
                        <TrashIcon fill={"#FF8170"} />
                    </View>
                    <Text className='text-white font-poppins text-base font-medium'>Sil</Text>
                </TouchableOpacity>
            )}
            renderRightActions={() => null}
            onSwipeableOpen={() => setOpen(true)}
            onSwipeableClose={() => setOpen(false)}
        >
            <View className={`${open ? "bg-customOrange" : "bg-white"}`}>
                <Pressable onPress={() => navigation.navigate("message")} className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3`} style={{ width: SIZES.width * 0.95 }}>
                    <View className='w-[80px] h-[80px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={require("../assets/images/authBg/auth.jpg")} className='w-full h-full' resizeMode='cover' />
                    </View>

                    <View className=' flex-1 space-y-1'>
                        <View className='flex-row items-center  justify-between'>
                            <View >
                                <Text className='text-customGray font-poppins text-sm font-bold'>Ayşe Örnekadam</Text>
                                <Text className='text-customGray font-poppins text-sm'>TR, İstanbul, Ataşehir</Text>
                            </View>
                            {/* <NotificationIcon fill={"#D9D9D9"} /> */}
                            <NotificationIcon fill={"#FF8170"} />
                        </View>
                        <Text className='text-customGray font-poppins text-xs self-end'>04.03.2021 - 15:00</Text>
                    </View>
                </Pressable >
            </View>

        </Swipeable>

    )
}

export default MessageComp