import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInputProps,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarIcon from '../assets/svg/common/CalendarIcon';
import DropdownRightDownIcon from '../assets/svg/common/DropdownRightDownIcon';
import DropdownRightUpIcon from '../assets/svg/common/DropdownRightUpIcon';
import EyeOpen from '../assets/svg/auth/EyeOpen';
import {Rating} from 'react-native-ratings';
import Tick from '../assets/svg/common/Tick';
import IntLabel from './IntLabel';
import {FormattedDate} from 'react-intl';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';

interface props extends TextInputProps {
  type:
    | 'text'
    | 'textarea'
    | 'date'
    | 'dropdown'
    | 'checkbox'
    | 'rating'
    | 'textareasmall'
    | 'textareabig';
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  onChange?: any;
  onChangeText?: any;
  onBlur?: any;
  secureTextEntry?: boolean;
  dropdownData?: any;
  isSearchable?: boolean;
  disable?: boolean;
  error?: any;
  touched?: any;
  title?: string;
  style?: any;
  dateMode?: 'date' | 'datetime';
}

const CustomInputs: React.FC<props> = ({
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  dropdownData,
  isSearchable,
  error,
  touched,
  disable = false,
  title,
  style,
  dateMode = 'date',
}) => {
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showSecure, setShowSecure] = useState(secureTextEntry);
  const {language} = useSelector((state: any) => state.user);

  return (
    <>
      {type == 'text' && (
        <View className="w-full mb-3" style={style}>
          <View className="flex-row items-center">
            {title && (
              <Text className="text-sm font-poppins font-normal text-customGray w-[40%] text-right pr-3">
                {title}
              </Text>
            )}
            <View className="h-[40px] flex-1 bg-white rounded-lg border border-customGray px-2 flex-row items-center">
              <TextInput
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChangeText}
                secureTextEntry={showSecure}
                placeholderTextColor={'rgba(77, 74, 72, 0.5)'}
                className="flex-1 text-customGray text-xs p-0 font-poppinsRegular"
              />
              {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowSecure(!showSecure)}>
                  <EyeOpen fill={showSecure ? '#FF8170' : 'gray'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {error && touched && (
            <Text className="text-red-400 text-xs "> {error}</Text>
          )}
        </View>
      )}
      {type == 'textarea' && (
        <View className="mb-3" style={style}>
          <TextInput
            className={`border border-customGray text-customGray font-poppinsRegular text-xs rounded-xl bg-white min-h-[100] max-h-[300] px-2`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={'rgba(77, 74, 72, 0.5)'}
            onBlur={onBlur}
            textAlignVertical="top"
            multiline
          />
          {error && <Text className="text-red-400 text-xs "> {error}</Text>}
        </View>
      )}
      {type == 'textareasmall' && (
        <View className="mb-3" style={style}>
          <Text className="font-medium text-customGray text-base font-poppins mb-3">
            {IntLabel('title_text')}
          </Text>
          <TextInput
            className={` border border-customGray rounded-xl bg-white max-h-[80px] px-2`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChange}
            onBlur={onBlur}
            textAlignVertical="top"
            multiline
          />
          {error && (
            <Text className="text-red-400 text-xs "> {error?.message}</Text>
          )}
        </View>
      )}
      {type == 'textareabig' && (
        <View className="mb-3" style={style}>
          <Text className="font-medium text-customGray text-base font-poppins mb-3">
            {title}
          </Text>
          <TextInput
            textAlignVertical="top"
            className={` border border-customGray rounded-xl bg-white min-h-[100px] max-h-[400px] px-2`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
          />
          {error && (
            <Text className="text-red-400 text-xs "> {error?.message}</Text>
          )}
        </View>
      )}
      {type == 'date' && (
        <View className=" mb-3 w-full" style={style}>
          <TouchableOpacity
            className="h-[40px] bg-white rounded-lg border border-customGray px-2 placeholder:text-customGray/[.5] flex-row items-center"
            onPress={() => setShowDateModal(true)}>
            <Text
              className={`flex-1 text-customGray ${
                value != '' ? 'opacity-100' : 'opacity-50'
              }  text-xs font-poppinsRegular `}>
              {value != '' ? <FormattedDate value={value} /> : placeholder}
            </Text>
            <CalendarIcon />
          </TouchableOpacity>
          <DatePicker
            modal
            mode={dateMode}
            open={showDateModal}
            date={value == '' ? new Date() : value}
            locale={language?.flag_code ?? 'tr'}
            onConfirm={date => {
              setShowDateModal(false);
              onChange(date);
            }}
            onCancel={() => {
              setShowDateModal(false);
            }}
            title={IntLabel('select_date')}
            confirmText={IntLabel('confirm')}
            cancelText={IntLabel('cancel')}
            className="w-10 bg-red-400"
          />
          {error && <Text className="text-red-400 text-xs ">{error}</Text>}
        </View>
      )}
      {type == 'dropdown' && (
        <View className="mb-3">
          <View className="flex-row items-center">
            {title && (
              <Text className="text-sm font-poppins font-normal text-customGray w-[40%] text-right pr-3">
                {title}
              </Text>
            )}
            <Dropdown
              data={dropdownData ?? []}
              search={isSearchable}
              mode="default"
              labelField="label"
              valueField="value"
              searchPlaceholder={'Ara'}
              placeholder={placeholder ?? ''}
              placeholderStyle={{color: 'rgba(77, 74, 72, 0.5)', fontSize: 12}}
              onFocus={() => setIsFocusDropdown(true)}
              onBlur={() => setIsFocusDropdown(false)}
              value={value}
              disable={disable}
              onChange={onChange}
              renderRightIcon={() =>
                isFocusDropdown ? (
                  <DropdownRightUpIcon />
                ) : (
                  <DropdownRightDownIcon />
                )
              }
              style={[
                {
                  paddingLeft: 8,
                  height: 40,
                  backgroundColor: disable ? '#CECECE' : 'white',
                  flex: 1,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#4D4A48',
                  overflow: 'hidden',
                },
                style,
              ]}
              selectedTextStyle={{
                fontSize: 12,
                color: '#4D4A48',
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
          {error && <Text className="text-red-400 text-xs ">{error}</Text>}
        </View>
      )}
      {type == 'checkbox' && (
        <View className="flex-row items-center mb-3" style={style}>
          <Pressable
            onPress={onChange}
            className="w-[24px] h-[24px] rounded-lg border border-customLightGray bg-white items-center justify-center">
            {value && <Tick />}
          </Pressable>
          {title && (
            <Text className="font-poppinsRegular text-customGray text-xs  ml-2">
              {title}
            </Text>
          )}
        </View>
      )}
      {type == 'rating' && (
        <Rating
          startingValue={value}
          ratingCount={5}
          imageSize={14}
          type="custom"
          ratingColor="#FF8170"
        />
      )}
    </>
  );
};

export default CustomInputs;
