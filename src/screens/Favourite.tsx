import {StyleSheet, Text, View, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Card} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {newsData, ComponentNavigationProps} from '../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardItem from '../components/CardItem';

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
    return [];
  }
};

const storeData = async (value: string) => {
  const data: newsData[] = (await getData()) || [];
  const filtered = data.filter(news => news.title !== value);
  try {
    const jsonValue = JSON.stringify(filtered);
    await AsyncStorage.setItem('newData', jsonValue);
  } catch (e) {
    return Alert.alert('Something went wrong with storing data');
  }
};

const Favourite = (props: ComponentNavigationProps) => {
  const [savedNews, setSavedNews] = useState<newsData[]>([]);

  const focused = useIsFocused();
  const deleteHandler = async (val: string) => {
    await storeData(val);
  };

  useEffect(() => {
    getData()
      .then(data => setSavedNews(data))
      .catch(() => Alert.alert('Error Occurred'));
  }, [focused, deleteHandler]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Saved" />
      </Appbar.Header>
      <FlatList
        keyExtractor={item => item.title}
        data={savedNews}
        renderItem={({item}) => (
          <CardItem
            handleDelete={deleteHandler}
            navigation={props.navigations}
            description={item.description || ''}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
          />
        )}
      />
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    display: 'flex',
    flex: 1,
    height: 'auto',
  },
});
