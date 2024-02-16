import {View, Text} from 'react-native';
import React from 'react';
import MenuWrapper from '../menu/MenuWrapper';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';

const NewOffer = () => {
  const {Post, loading} = WebClient();
  return <MenuWrapper title="Yeni Teklif Ver"></MenuWrapper>;
};

export default NewOffer;
