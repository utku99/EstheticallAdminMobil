import React, { useEffect, useState } from 'react'
import SharingComp from '../../components/SharingComp'
import WebClient from '../../utility/WebClient'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, View } from 'react-native'
import HandleData from '../../components/HandleData'
import MenuWrapper from '../menu/MenuWrapper'
import CustomButtons from '../../components/CustomButtons'



const Sharings = () => {

    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)





    return (
        <MenuWrapper title='Paylaşımlar' showAddBtn>



            <HandleData data={[""]} loading={loading} title='Paylaşımınız Bulunmamaktadır'>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={["", ""]}
                    renderItem={({ item }) =>
                        <SharingComp item={item} onClickable />
                    }
                />

            </HandleData>

        </MenuWrapper>
    )
}

export default Sharings