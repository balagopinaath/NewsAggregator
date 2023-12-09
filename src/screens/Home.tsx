//@ts-nocheck

import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Chip, Button, useTheme} from 'react-native-paper';
import {componentNavigationProps, newsData} from '../utils/types';
import CardItem from '../components/CardItem';

const APIKEY = 'pub_344048d0f070c828dd665dec118a0b238e397';
const categories = [
  'Technology',
  'Science',
  'Politics',
  'Sports',
  'Health',
  'Entertainment',
  'Business',
];

const Home = (props: ComponentNavigationProps) => {
  const [newsData, setnewsData] = useState<newsData[]>([]);
  const [nextPage, setnextPage] = useState('');
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSelect = (val: string) => {
    setSelectedCategories((prev: String[]) =>
      prev.find(p => p === val)
        ? prev.filter(categories => val)
        : [...prev, val],
    );
  };
  const handlePress = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=${APIKEY}&country=in&language=en&${
      selectedCategories.length > 0
        ? `category=${selectedCategories.join()}`
        : ''
    } ${nextPage.length > 0 ? `&page=${nextPage}` : ''}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setnewsData(prev => [...prev, ...data.results]);
      setnextPage(data.nextPage);
    } catch (err) {
      console.log(err);
    }
    // console.log(Object.keys(newsData[0]));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.filterContainer}>
        {categories.map(cat => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{fontFamily: '400', color: 'white', padding: 1}}
            showSelectedOverlay
            selected={selectedCategories.find(c => cat === c) ? true : false}
            onPress={() => handleSelect(cat)}>
            {cat}
          </Chip>
        ))}
        <Button
          labelStyle={{
            fontSize: 14,
            margin: 'auto',
            color: theme.colors.primary,
          }}
          style={styles.button}
          mode="contained-tonal"
          icon={'sync'}
          onPress={handlePress}>
          Refresh
        </Button>
      </View>
      <FlatList
        onEndReached={() => handlePress()}
        data={newsData}
        style={styles.flatList}
        renderItem={({item}) => (
          <CardItem
            navigation={props.navigations}
            description={item.description}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatList: {
    flex: 1,
    height: 'auto',
  },
});
