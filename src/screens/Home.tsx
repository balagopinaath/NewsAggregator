//@ts-nocheck

import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Chip, Button, useTheme} from 'react-native-paper';

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

const Home = () => {
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
    }`;
    try {
      await fetch(url)
        .then(res => res.join())
        .then(data => console.log(data));
    } catch (err) {
      console.log(err);
    }
    console.log(url);
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
});
