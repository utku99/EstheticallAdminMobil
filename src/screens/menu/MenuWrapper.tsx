import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomButtons from '../../components/CustomButtons'
import { SIZES } from '../../constants/constants'
import { useNavigation } from '@react-navigation/native'

interface props {
    children?: React.ReactNode,
    title?: string,
    showAddBtn?: boolean,
}

const MenuWrapper = ({ children, title, showAddBtn = false }: props) => {
    const navigation = useNavigation()
    return (
        <ScrollView className='bg-[#FAFAFA] ' contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}>

            <View className=' items-center  h-full'>

                <View className='flex-row items-center justify-center mb-[20px] relative' style={{ width: SIZES.width * 0.9 }}>
                    {title && <Text className='font-medium font-poppins text-customGray text-base text-center '>{title}</Text>}
                    {showAddBtn && (
                        <View className=' absolute right-0'>
                            <CustomButtons onPress={() => navigation.navigate("addsharing")} type='iconsolid' label='Ekle' theme='big' icon='pluss' style={{ width: 80, height: 40, }} />
                        </View>
                    )}
                </View>

                {children}
            </View>

        </ScrollView>

    )
}

export default MenuWrapper