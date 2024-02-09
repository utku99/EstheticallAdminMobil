import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomInputs from './CustomInputs'
import LikeIcon from '../assets/svg/common/LikeIcon'
import ShareIcon from '../assets/svg/homepages/ShareIcon'
import LinearGradient from 'react-native-linear-gradient'
import SeeAllArrow from '../assets/svg/homepages/SeeAllArrow'
import { SIZES } from '../constants/constants'
import TrashIcon from '../assets/svg/userMenu/TrashIcon'
import EditUserCommentIcon from '../assets/svg/userMenu/EditUserCommentIcon'
import WebClient from '../utility/WebClient'
import ModalWrapper from './ModalWrapper'
import CustomButtons from './CustomButtons'
import { Controller, useForm } from 'react-hook-form'



const UserCommentComp = ({ item, setClicked }: any) => {
    const { Post } = WebClient()
    const [seeAll, setSeeAll] = useState(false)
    const [visible, setVisible] = useState(false)


    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: item?.subject,
            content: item?.comment,
            rating: item?.point / 20
        },
    })
    const submit = (data: any) => {
        // Post("/api/Company/EditUserComment", {
        //     "commentID": item?.commentID,
        //     "subject": data.title,
        //     "content": data.content,
        //     "point": data.rating
        // }).then(res => {
        //     console.log(res.data);

        //     if (res.data.code === "100") {
        //         setVisible(false)
        //         setClicked(true)
        //     }
        // })
        console.log(data);

    }



    return (
        <View className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-4`} style={{ width: SIZES.width * 0.95 }}>

            {/* header */}
            <View className='flex-row items-center justify-between'>
                <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                    <Image source={{ uri: item?.userLogo }} className='w-full h-full' resizeMode='cover' />
                </View>

                <View className=' w-[50%]'>
                    <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.userName}</Text>
                    <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.userLocation}</Text>
                    <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>Uygulama: {item?.serviceName}</Text>
                </View>

                <View className='space-y-2'>
                    <View className='flex-row items-center justify-evenly mb-2'>
                        {!item?.isConfirmed &&
                            <Pressable onPress={() => setVisible(true)}>
                                <EditUserCommentIcon />
                            </Pressable>
                        }
                        <Pressable onPress={() => {
                            Post("/api/Company/RemoveUserComment", {
                                "commentID": item?.commentID
                            }).then(res => {
                                if (res.data.code === "100") {
                                    setClicked(true)
                                }
                            })
                        }}>
                            <TrashIcon />
                        </Pressable>
                    </View>
                    <CustomInputs type='rating' value={Number(item?.point) / 20} />
                    <Text className='text-customGray font-poppins text-xs'>{item?.date}</Text>
                </View>
            </View>

            <Text className='text-xs font-bold font-poppins text-customGray'>{item?.subject}</Text>

            <View>
                <Text className={`text-xs font-poppins text-customGray ${seeAll ? "h-fit" : item?.comment?.length > 400 ? "h-[130px]" : "h-fit"}`}>{item?.comment}</Text>
                {
                    !seeAll && item?.comment?.length > 400 &&
                    <LinearGradient colors={['rgba(255, 255, 255,  0.44)', 'rgba(255, 255, 255,1)']} className=' h-[50px] absolute w-full bottom-0 items-center justify-center'>
                        <Pressable onPress={() => setSeeAll(true)}>
                            <SeeAllArrow />
                        </Pressable>
                    </LinearGradient>
                }
            </View>




            {/* doctor */}
            <View className='space-y-2'>
                <Text className='text-base font-poppins text-customGray'>Operasyonu gerçekleştiren</Text>

                <View className='flex-row items-center justify-between'>
                    <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={{ uri: item?.doctor?.doctorLogo }} className='w-full h-full' resizeMode='cover' />
                    </View>
                    <View className='w-[40%]'>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.doctor?.doctorNameWithTitle}</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.doctor?.doctorBranch}</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.doctor?.doctorLocation}</Text>
                    </View>
                    <View className='items-center '>
                        <Text className='text-customGray font-poppins text-xs'>{(item?.doctor?.doctorCommentPoint / 20)}/5</Text>
                        <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                    </View>
                    <View className='items-center space-y-2'>
                        <ShareIcon />
                        <LikeIcon />
                    </View>
                </View>

            </View>

            <ModalWrapper visible={visible} setVisible={setVisible}>
                <View className='max-h-[90%]'>
                    <Text className='font-semibold text-customGray text-lg font-poppins mb-3'>Yorumu Düzenle</Text>

                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                            <CustomInputs type='textareasmall' defaultValue={value} onBlur={onBlur} onChangeText={onChange} error={error} />
                        )}
                        name='title'
                        rules={{ required: { value: true, message: "başlık metni gereklidir" }, }}
                    />

                    <CustomInputs type='textareabig' title='Yorum Metni' value={item?.comment} />
                    <View className='my-3'>
                        <Text className='font-medium text-customGray text-base font-poppins mb-3'>Puan Ver</Text>
                        <View className='items-start'>
                            <CustomInputs type='rating' value={item?.point / 20} />
                        </View>
                    </View>
                    <View className='flex-row items-center justify-center space-x-2'>
                        <CustomButtons type='outlined' label='Vazgeç' onPress={() => setVisible(false)} />
                        <CustomButtons type='solid' label='Tamam' onPress={handleSubmit(submit)} />
                    </View>
                </View>
            </ModalWrapper>



        </View >
    )
}

export default UserCommentComp