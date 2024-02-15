import { View, Text } from 'react-native'
import React, { useState } from 'react'
import MenuWrapper from '../menu/MenuWrapper'
import CustomInputs from '../../components/CustomInputs'
import { SIZES } from '../../constants/constants'
import CustomButtons from '../../components/CustomButtons'
import OfferComp from '../../components/OfferComp'

const Appointment = () => {
    const [tab, setTab] = useState(1)

    return (
        <MenuWrapper>

            <View className='flex-row space-x-2'>
                <CustomButtons
                    type={tab == 1 ? "brownsolid" : "brownoutlined"}
                    label='Verdiğim Teklifler'
                    onPress={() => setTab(1)}
                />
                <CustomButtons
                    type={tab == 2 ? "brownsolid" : "brownoutlined"}
                    label="Tamamlanmış Teklifler"
                    onPress={() => setTab(2)}
                />
            </View>


            <View className='flex-row space-x-4 mt-4 mb-2'>
                <Text className='font-poppins font-medium text-sm text-customGray '>Teklif ID: <Text className='font-normal'>343243</Text></Text>
                <Text className='font-poppins font-medium text-sm text-customGray '>Tarih: <Text className='font-normal'>15 Ocak 2024</Text></Text>
            </View>

            <OfferComp />


        </MenuWrapper>
    )
}

export default Appointment