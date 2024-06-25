import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Platform,
  PermissionsAndroid,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AddPhotoIcon from '../assets/svg/firm/AddPhotoIcon';
import {openPicker} from 'react-native-image-crop-picker';
import picker from 'react-native-image-crop-picker';

import TrashIcon from '../assets/svg/firm/TrashIcon';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import PickGallery from '../assets/svg/bottomTab/PickGallery';
import PickCamera from '../assets/svg/bottomTab/PickCamera';
import IntLabel from './IntLabel';
import {toast} from '../utility/WebClient';

const AddPhotoComp = ({
  value,
  onChange,
  error,
  type = 'add',
  onAdd,
  onDelete,
}: {
  value: any;
  onChange?: any;
  error?: any;
  type?: 'add' | 'edit';
  onAdd?: any;
  onDelete?: any;
}) => {
  const [visible, setVisible] = useState(false);

  const checkAndRequestPermission = async (permission: any) => {
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }
  };

  const openGalery = async () => {
    picker
      .openPicker({
        cropping: false,
        includeBase64: true,
        multiple: true,
        mediaType: 'any',
        maxFiles: 5,
      })
      .then((image: any) => {
        if (image?.mime == 'video/mp4') {
        } else {
          let temp = image.map((img: any) => img.data);
          type == 'add' ? onChange(temp) : onAdd(temp[0]);
        }
      });
  };

  const openCamera = async () => {
    picker
      .openCamera({
        cropping: false,
        includeBase64: true,
        mediaType: 'any',
      })
      .then((image: any) => {
        if (image?.mime == 'video/mp4') {
        } else {
          type == 'add' ? onChange([image.data]) : onAdd(image.data);
        }
      });
  };

  return (
    <>
      {type == 'add' && (
        <View className="space-y-5 mb-3 ">
          {value?.length < 5 && (
            <View>
              <Pressable onPress={() => setVisible(true)} className=" w-[131] ">
                <AddPhotoIcon />
              </Pressable>
              {error && <Text className="text-red-400 text-xs "> {error}</Text>}
            </View>
          )}
          <View>
            <FlatList
              horizontal
              data={value}
              contentContainerStyle={{gap: 15}}
              renderItem={({item, index}) => (
                <View className="relative">
                  <View className="w-[130px] h-[130px] rounded-lg border border-customLightGray overflow-hidden">
                    <Image
                      source={{
                        uri: `data:image/jpg;base64,` + item,
                      }}
                      className="w-full h-full"
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      const updatedImages = value.filter(
                        (_: any, i: number) => i !== index,
                      );
                      onChange(updatedImages);
                    }}
                    className="absolute bottom-2 right-2 bg-customOrange rounded-md w-[30px] h-[30px] items-center justify-center">
                    <TrashIcon fill="white" />
                  </Pressable>
                </View>
              )}
            />
          </View>
          <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={() => setVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View className="bg-black/50 flex-1 justify-end">
                <TouchableWithoutFeedback>
                  <View className="bg-white rounded-t-3xl flex-row justify-evenly items-center py-10">
                    <TouchableOpacity
                      className="items-center border w-fit p-5 rounded-lg border-customOrange space-y-2"
                      onPress={() => {
                        openCamera();
                        setVisible(false);
                      }}>
                      <PickCamera />
                      <Text className="font-poppinsRegular text-customGray">
                        {IntLabel('open_camera')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="items-center border w-fit p-5 rounded-lg border-customOrange space-y-2"
                      onPress={() => {
                        openGalery();
                        setVisible(false);
                      }}>
                      <PickGallery />
                      <Text className="font-poppinsRegular text-customGray">
                        {IntLabel('open_gallery')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
      {type == 'edit' && (
        <View className="space-y-5 mb-3 ">
          {value?.length < 5 && (
            <View>
              <Pressable onPress={() => setVisible(true)} className=" w-[131] ">
                <AddPhotoIcon />
              </Pressable>
              {error && <Text className="text-red-400 text-xs "> {error}</Text>}
            </View>
          )}
          <View>
            <FlatList
              horizontal
              data={value}
              contentContainerStyle={{gap: 15}}
              renderItem={({item, index}) => (
                <View className="relative">
                  <View className="w-[130px] h-[130px] rounded-lg border border-customLightGray overflow-hidden">
                    <Image
                      source={{
                        uri: item?.fileName ?? `data:image/jpg;base64,` + item,
                      }}
                      className="w-full h-full"
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      const updatedImages = value.find(
                        (_: any, i: number) => i == index,
                      );
                      onDelete(updatedImages);
                    }}
                    className="absolute bottom-2 right-2 bg-customOrange rounded-md w-[30px] h-[30px] items-center justify-center">
                    <TrashIcon fill="white" />
                  </Pressable>
                </View>
              )}
            />
          </View>
          <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={() => setVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View className="bg-black/50 flex-1 justify-end">
                <TouchableWithoutFeedback>
                  <View className="bg-white rounded-t-3xl flex-row justify-evenly items-center py-10">
                    <TouchableOpacity
                      className="items-center border w-fit p-5 rounded-lg border-customOrange space-y-2"
                      onPress={() => {
                        openCamera();
                        setVisible(false);
                      }}>
                      <PickCamera />
                      <Text className="font-poppinsRegular text-customGray">
                        {IntLabel('open_camera')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="items-center border w-fit p-5 rounded-lg border-customOrange space-y-2"
                      onPress={() => {
                        openGalery();
                        setVisible(false);
                      }}>
                      <PickGallery />
                      <Text className="font-poppinsRegular text-customGray">
                        {IntLabel('open_gallery')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </>
  );
};

export default AddPhotoComp;
