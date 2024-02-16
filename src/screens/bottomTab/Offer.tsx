import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import {SIZES} from '../../constants/constants';
import CustomInputs from '../../components/CustomInputs';
import AddPhotoComp from '../../components/AddPhotoComp';
import CustomButtons from '../../components/CustomButtons';
import OfferComp from '../../components/OfferComp';
import HandleData from '../../components/HandleData';
import {useNavigation} from '@react-navigation/native';

const Offer = () => {
  const [tab, setTab] = useState(1);
  const navigation = useNavigation();

  return (
    <MenuWrapper>
      <View className="flex-row space-x-2">
        <CustomButtons
          type={tab == 1 ? 'brownsolid' : 'brownoutlined'}
          label="Verdiğim Teklifler"
          onPress={() => setTab(1)}
        />
        <CustomButtons
          type={tab == 2 ? 'brownsolid' : 'brownoutlined'}
          label="Tamamlanmış Teklifler"
          onPress={() => setTab(2)}
        />
      </View>

      <HandleData
        data={['']}
        loading={false}
        title="Paylaşımınız Bulunmamaktadır">
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={['', '']}
          renderItem={({item}) => <OfferComp item={item} onClickable />}
        />

        <CustomButtons
          type="solid"
          theme="big"
          label="Teklif Ver"
          onPress={() => navigation.navigate('newoffer')}
        />
      </HandleData>
    </MenuWrapper>
  );
};

export default Offer;
