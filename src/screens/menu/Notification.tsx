import { View, Text } from 'react-native'
import React from 'react'
import UserWrapper from './MenuWrapper'
import NotificationComp from '../../components/NotificationComp'
import MenuWrapper from './MenuWrapper'

const Notification = () => {
    return (
        <MenuWrapper title='Bildirimler'>
            <NotificationComp />
            <NotificationComp />
        </MenuWrapper>
    )
}

export default Notification