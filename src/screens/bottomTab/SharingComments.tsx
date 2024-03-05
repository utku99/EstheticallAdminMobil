import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {SIZES, temp} from '../../constants/constants';
import SharingCommentComp from '../../components/SharingCommentComp';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const SharingComments = ({route}: any) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [index, setIndex] = useState<any>(0);
  const [comments, setComments] = useState<any>(0);
  const isCarousel = useRef(null);

  console.log();

  useEffect(() => {
    Post('/api/Comment/ListCommentsMobile', {
      sharedId: route.params?.sharedId,
    }).then(res => {
      setComments(res.data.object);
    });
  }, []);

  return (
    <MenuWrapper title="Paylaşımlar - Yorumlar">
      <HandleData loading={loading}>
        <View className="w-[95%]">
          <View className="bg-white rounded-xl overflow-hidden border border-customLightGray mb-[15]">
            {/* carousel */}
            <View className="w-full aspect-[1.5]">
              <Carousel
                ref={isCarousel}
                data={comments?.header?.images?.map((img: any) => ({
                  imgUrl: img.fileName,
                  title: '',
                }))}
                renderItem={({item}: any) => (
                  <Image
                    source={{uri: item.imgUrl}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                )}
                sliderWidth={SIZES.width * 0.95}
                itemWidth={SIZES.width * 0.95}
                loop={true}
                enableSnap={true}
                onSnapToItem={i => setIndex(i)}
              />
              <Pagination
                dotsLength={2}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'white',
                }}
                tappableDots={true}
                dotColor="#FF8170"
                inactiveDotColor="transparent"
                inactiveDotScale={1}
                containerStyle={{
                  position: 'absolute',
                  bottom: 0,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View className="px-[10px] py-3 space-y-1">
              <Text
                numberOfLines={2}
                className="font-poppinsRegular text-xs text-customGray">
                {comments?.header?.description}
              </Text>
              <Text className="font-poppinsRegular text-xxs text-customGray">
                {comments?.header?.createdDate}
              </Text>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={comments?.comments}
            renderItem={({item}) => (
              <SharingCommentComp key={item.commentId} item={item} />
            )}
          />
        </View>
      </HandleData>
    </MenuWrapper>
  );
};

export default SharingComments;
