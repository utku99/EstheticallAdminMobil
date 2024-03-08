import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openPicker} from 'react-native-image-crop-picker';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import DoctorMessageComp from '../../components/DoctorMessageComp';
import TrashIcon from '../../assets/svg/firm/TrashIcon';
import AddPhotoIcon from '../../assets/svg/userMenu/AddPhotoIcon';
import SharingSendMessageIcon from '../../assets/svg/homepages/SharingSendMessageIcon';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {SIZES} from '../../constants/constants';
import {useFormik} from 'formik';
import {addMessage, setMessage} from '../../redux/slices/hubConnection';

const Message = ({route}: any) => {
  const [images, setImages] = useState<any>([]);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const {connection, message} = useSelector((state: any) => state.hub);
  const dispatch = useDispatch();

  const openGalery = () => {
    openPicker({
      cropping: false,
      includeBase64: true,
      multiple: true,
      maxFiles: 5,
    }).then((image: any) => {
      let temp = image.map((img: any) => img.data);
      setImages(temp);
    });
  };

  const formik = useFormik({
    initialValues: {
      images: [],
      message: '',
    } as {
      images?: any;
      message: string;
    },
    onSubmit: (values, {resetForm, setFieldValue}) => {
      if (values.images.length == 0) {
        Post(
          '/api/Chatting/SendMessage',
          {
            roomID: route.params?.selectedUser?.roomID,
            senderId:
              user.companyOfficeId == 0 ? user.companyId : user.companyOfficeId,
            senderType: user.companyOfficeId == 0 ? 2 : 3,
            message: values.message,
            messagesType: route.params?.selectedUser?.messagesType,
            receiverId: route.params?.selectedUser?.correspondentID,
            receiverType: route.params?.selectedUser?.correspondentType,
            serviceID: message[0]?.serviceID,
          },
          false,
          false,
        ).then(res => {
          if (res.data.code == '100') {
            resetForm();
            setFieldValue('images', []);
            dispatch(addMessage(res.data.object));
          }
        });
      } else {
        Post(
          '/api/Chatting/SendMessage',
          {
            roomID: route.params?.selectedUser?.roomID,
            senderId:
              user.companyOfficeId == 0 ? user.companyId : user.companyOfficeId,
            senderType: user.companyOfficeId == 0 ? 2 : 3,
            message: '',
            image: values.images[0].split(',')[1],
            messagesType: route.params?.selectedUser?.messagesType,
            receiverId: route.params?.selectedUser?.correspondentID,
            receiverType: route.params?.selectedUser?.correspondentType,
            serviceID: message[0]?.serviceID,
          },
          false,
          false,
        ).then(res => {
          if (res.data.code == '100') {
            resetForm();
            setFieldValue('images', []);
            dispatch(addMessage(res.data.object));
          }
        });
      }
    },
  });

  useEffect(() => {
    Post(
      '/api/Chatting/GetMessages',
      {
        roomID: route.params?.selectedUser?.roomID,
        companyID: user?.companyOfficeId == 0 ? user?.companyId : 0,
        companyOfficeID: user?.companyOfficeId,
        userID: 0,
      },
      false,
      false,
    ).then((res: any) => {
      dispatch(setMessage(res.data.object));
    });
    return () => {
      connection.invoke('LeaveRoom');
    };
  }, []);

  return (
    <MenuWrapper title="Mesajlar" scrollEnabled={true}>
      <HandleData
        title={'Mesajınız Bulunmamaktadır'}
        loading={loading}
        data={message}>
        <View className="flex-1" style={{width: SIZES.width * 0.95}}>
          <FlatList
            className="mb-5 "
            contentContainerStyle={{gap: 15}}
            data={message}
            renderItem={({item}) => <DoctorMessageComp item={item} />}
          />
          <View className="space-y-1">
            {images?.length !== 0 && (
              <View>
                <FlatList
                  horizontal
                  data={images}
                  contentContainerStyle={{gap: 10}}
                  renderItem={({item, index}) => (
                    <View className="relative">
                      <View className="w-[60px] h-[60px] rounded-lg border border-customLightGray overflow-hidden">
                        <Image
                          source={{uri: `data:image/jpg;base64,` + item}}
                          className="w-full h-full"
                        />
                      </View>
                      <Pressable
                        onPress={() => {
                          const updatedImages = images.filter(
                            (_: any, i: number) => i !== index,
                          );
                          setImages(updatedImages);
                        }}
                        className="absolute bottom-1 right-1 bg-customOrange rounded-md w-[24px] h-[24px] items-center justify-center">
                        <TrashIcon width={14} height={17} />
                      </Pressable>
                    </View>
                  )}
                />
              </View>
            )}

            <View className="flex-row gap-3  relative">
              <TouchableOpacity onPress={() => openGalery()}>
                <AddPhotoIcon />
              </TouchableOpacity>

              <View className="rounded-xl border border-customLightGray bg-white h-[40px] overflow-hidden flex-row items-center flex-1">
                <TextInput
                  value={formik.values.message}
                  onChangeText={formik.handleChange('message')}
                  className=" flex-1 pl-2 text-sm text-customGray font-poppinsRegular"
                  placeholder="Yorumunuzu Yazın..."
                  placeholderTextColor={'#4D4A48'}
                />
                <TouchableOpacity onPress={() => formik.handleSubmit()}>
                  <SharingSendMessageIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </HandleData>
    </MenuWrapper>
  );
};

export default Message;
