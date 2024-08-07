import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import WebClient from '../utility/WebClient'
import { SIZES } from '../constants/constants'
import CustomInputs from './CustomInputs'
import LikeIcon from '../assets/svg/common/LikeIcon'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon'
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon'
import ShareIcon from '../assets/svg/homepages/ShareIcon'
import RenderHTML from 'react-native-render-html'
import CustomButtons from './CustomButtons'



const PackageComp = ({ item, onClickable = false }: { item: any, onClickable?: boolean }) => {

    const [seeAll, setSeeAll] = useState(false)
    const [index, setIndex] = useState<any>(0)
    const isCarousel = useRef(null);
    const navigation = useNavigation()



    return (
        <View className={`h-fit border border-customLightGray rounded-xl bg-white `} style={{ width: SIZES.width * 0.95 }}>

            {/* header */}
            <View className='flex-row justify-between items-center p-[10px]'>
                <TouchableOpacity onPress={() => onClickable && navigation.navigate("firmprofile", { companyId: item?.companyId ?? item?.companyID, companyOfficeId: item?.companyOfficeId ?? item?.companyOfficeID })} className='flex-row items-center w-[60%] '>
                    <View className='w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={{ uri: item?.headerModel?.logo ?? item?.logo }} className='w-full h-full' resizeMode='cover' />
                    </View>
                    <View className='pl-2 flex-shrink'>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.headerModel?.companyName ?? item?.companyName}</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs '>{item?.headerModel?.location ?? item?.location}</Text>
                    </View>
                </TouchableOpacity>
                <View className='items-center'>
                    <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                    <CustomInputs type='rating' value={Number(item?.headerModel?.commentPoint ?? item?.companyPoint) / 20} />
                </View>
                <LikeIcon />
            </View>

            {/* carousel */}
            <View className='w-full aspect-[1.5]'>
                <Carousel
                    ref={isCarousel}
                    data={(item?.sliders ?? item?.images)?.map((img: any) => ({ imgUrl: img.image ?? img, title: "" }))}
                    renderItem={({ item }: any) => (
                        <Image source={{ uri: item?.imgUrl }} className='w-full h-full' resizeMode='cover' />
                    )}
                    sliderWidth={SIZES.width * 0.95}
                    itemWidth={SIZES.width * 0.95}
                    loop={true}
                    enableSnap={true}
                    onSnapToItem={(i) => setIndex(i)}
                />
                <Pagination
                    dotsLength={item?.imagesList?.length ?? item?.files?.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "white"
                    }}
                    tappableDots={true}
                    dotColor='#FF8170'
                    inactiveDotColor='transparent'
                    inactiveDotScale={1}
                    containerStyle={{ position: "absolute", bottom: 0, alignSelf: "center" }}
                />
            </View>

            <Text numberOfLines={seeAll ? 20 : 1} className='text-customGray text-xs font-poppins p-[10px]'>Paket Adı: {item?.footerModel?.packageName ?? item?.packageName}</Text>

            <Text numberOfLines={seeAll ? 20 : 2} className='text-customGray text-xs font-poppins px-[10px] pb-[10px]'>{item?.footerModel?.subject ?? item?.subject}</Text>



            {seeAll && (
                <>
                    <View className='px-[10px] space-y-3 flex-row'>
                        <Text className='font-poppins font-medium text-sm text-customGray'>İlgili Doktor: </Text>
                        <View className='h-[0.5px] bg-black/[.5] w-full'></View>
                    </View>
                    <View className='flex-row items-center p-[10px] justify-between'>
                        <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                            <Image source={{ uri: item?.doctor?.logo ?? item?.doctorLogo }} className='w-full h-full' resizeMode='cover' />
                        </View>
                        <View className=' w-[40%]'>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.doctor?.doctorName ?? item?.doctorBranch}</Text>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.doctor?.branch ?? item?.doctorBranch}</Text>
                        </View>
                        <View className='items-center'>
                            <Text className='text-customGray font-poppins text-xs'>{(item?.companyPoint?.split("/")[0] / 20) ?? (item?.doctor?.commentPoint / 20)}/5</Text>
                            <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                        </View>
                        <View className='items-center space-y-2'>
                            <ShareIcon />
                            <LikeIcon />
                        </View>
                    </View>
                    <View className='px-[10px] space-y-3 flex-row'>
                        <Text className='font-poppins font-medium text-sm text-customGray'>Paket İçeriği </Text>
                        <View className='h-[0.5px] bg-black/[.5] w-full'></View>
                    </View>
                    <RenderHTML source={{ html: item?.footerModel?.content ?? item?.content }} contentWidth={SIZES.width} />
                    <View className='pb-[30px]'>
                        <CustomButtons type='iconsolid' label='Soru Sor' style={{ width: 130, alignSelf: "center" }} icon='question' width="w-[150px] self-center" theme='middle' />
                    </View>
                </>

            )}

            {/* bottom */}
            <Pressable onPress={() => setSeeAll(!seeAll)} className='bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]'>
                <Text className='font-poppins font-normal text-xs text-white flex-1'>Paket Fiyatı: {item?.footerModel?.price ?? item?.price}₺</Text>
                <View className='flex-1 items-center'>
                    {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
                </View>
                <View className='flex-1'></View>
            </Pressable>

        </View>
    )
}

export default PackageComp