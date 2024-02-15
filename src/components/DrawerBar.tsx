import React, { Component } from 'react'
import { DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer'
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon'
import SettingsIcon from '../assets/svg/userMenu/SettingsIcon'
import LogOutIcon from '../assets/svg/userMenu/LogOutIcon'

export class DrawerBar extends Component {
    render() {

        const { navigation }: any = this.props

        return (
            <DrawerContentScrollView {...this.props} >
                <DrawerItem label="Bildirimler" onPress={() => navigation.navigate("notification")} icon={() => <NotificationIcon fill={"#FF8170"} />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Ayarlar" onPress={() => navigation.navigate("settings")} icon={() => <SettingsIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Çıkış Yap" onPress={() => navigation.navigate("logout")} icon={() => <LogOutIcon />} activeTintColor='red' pressColor='blue' />
            </DrawerContentScrollView>
        )
    }
}

export default DrawerBar