import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import MenuWrapper from '../menu/MenuWrapper'
import HandleData from '../../components/HandleData'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import { SIZES } from '../../constants/constants'
import CustomInputs from '../../components/CustomInputs'
import AddPhotoComp from '../../components/AddPhotoComp'
import AddPhotoIcon from '../../assets/svg/firm/AddPhotoIcon'
import CustomButtons from '../../components/CustomButtons'
import { Switch } from 'react-native-paper'

const AddSharing = () => {

    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const [images, setImages] = useState<any>(null)

    return (
        <MenuWrapper title='Paylaşım Ekle' >



            <HandleData data={[""]} loading={loading} title='Paylaşımınız Bulunmamaktadır'>

                <View style={{ width: SIZES.width * 0.9 }}>

                    <CustomInputs type='dropdown' placeholder='Hizmet' />
                    <CustomInputs type='dropdown' placeholder='Alt Hizmet' />
                    <CustomInputs type='text' placeholder='Başlık' />
                    <CustomInputs type='textarea' placeholder='İçerik' />
                    <CustomInputs type='text' placeholder='Dış Link' />
                    <CustomInputs type='text' placeholder='Video' />


                    <AddPhotoComp />

                    <View>
                        <Text>Aktif</Text>
                        <Switch
                            thumbColor={"#FF8170"}
                            value={false}
                            onChange={() => ""}
                        />

                    </View>


                    <CustomButtons type='solid' label='Paylaşım Yap' theme='big' />

                </View>



            </HandleData>

        </MenuWrapper>
    )
}

export default AddSharing