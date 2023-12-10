import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Card, Text, useTheme} from 'react-native-paper';
import {newsData} from '../utils/types';
import {NavigationProp, Route, RouteProp} from '@react-navigation/native';
import NewsOverview from '../screens/NewsOverview';

type RootStackParamList = {
  Home: undefined;
  Favourite: undefined;
  NewsOverview: {
    title: string;
    description: string;
    content: string;
    image_url: string;
    navigation?: any;
  };
};

type Props = {
  title: string;
  description: string;
  content: string;
  image_url: string;
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'NewsOverview'>;
  handleDelete?: (val: string) => void;
};

const CardItem = (props: Props) => {
  const theme = useTheme();

  const handlePress = () => {
    props.navigation.navigate('NewsOverview', {
      title: props.title,
      description: props.description,
      content: props.content,
      image_url: props.image_url,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginVertical: 10,
          backgroundColor: theme.colors.elevation.level5,
        }}>
        <Card.Cover
          borderRadius={10}
          source={{uri: props.image_url ? props.image_url.toString() : ''}}
        />
        <Card.Title
          title={props.title}
          subtitle={props.description ? props.description.split('\n')[0] : ''}
          titleNumberOfLines={1}
        />
        {props.handleDelete && (
          <Card.Actions>
            <Button
              onPress={() =>
                props.handleDelete && props.handleDelete(props.title)
              }>
              Delete
            </Button>
          </Card.Actions>
        )}
      </Card>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginRight: 10,
  },
});
