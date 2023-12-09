import {NavigationProp, Route, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Favourite: undefined;
};

export type newsData = {
  article_id: String;
  title: String;
  link: String;
  keywords: String[];
  creator: String;
  video_url: String;
  description: String;
  content: String;
  pubDate: String;
  image_url: String;
  source_id: String;
  source_priority: String;
  country: String;
  category: String[];
  language: String;
};

export type ComponentNavigationProps = {
  navigations: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList>;
};
