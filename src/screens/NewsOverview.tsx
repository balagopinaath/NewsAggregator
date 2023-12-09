import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {ComponentNavigationProps, newsData} from '../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Details from '../components/Details';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('newsData');
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    Alert.alert('Something went wrong...');
    return;
  }
};

const storeData = async (value: newsData) => {
  const data: newsData[] = (await getData()) || [];
  // Check if the news data already exists
  const existingData = data.find(d => d.title === value.title);

  if (!existingData) {
    data.push(value);
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('newsData', jsonValue);
    } catch (e) {
      // saving error
      return Alert.alert('Something went wrong with storing data');
    }
  } else {
    // Alert that data already exists
    Alert.alert('News data already saved.');
  }
};

const NewsOverview = (props: ComponentNavigationProps) => {
  const {title, content, image_url} = props?.route
    ?.params as unknown as newsData;

  // props.navigations.setOptions({
  //   headerRight: () => (
  //     <Button onPress={() => storeData({title, content, image_url})}>
  //       {' '}
  //       Save
  //     </Button>
  //   ),
  // });

  return <Details content={content} image_url={image_url} title={title} />;
};

export default NewsOverview;

const styles = StyleSheet.create({});
