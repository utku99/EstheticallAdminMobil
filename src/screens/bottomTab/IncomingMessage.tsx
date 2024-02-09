import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MenuWrapper from '../menu/MenuWrapper'
import HandleData from '../../components/HandleData'
import MessageComp from '../../components/MessageComp'

const IncomingMessage = () => {
    return (
        <MenuWrapper title='Mesajlar'>

            <HandleData data={[""]} title={"Mesajınız Bulunmamaktadır"} loading={false}>


                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, }}
                    data={["", "",]}
                    renderItem={({ item }) => <MessageComp />}
                />


            </HandleData>

        </MenuWrapper>
    )
}

export default IncomingMessage