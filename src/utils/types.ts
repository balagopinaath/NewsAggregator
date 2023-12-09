import {NavigationProp, Route, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Favourite: undefined;
};

export type newsData = {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string;
  video_url: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_priority: string;
  country: string;
  category: string[];
  language: string;
};

export type ComponentNavigationProps = {
  navigations: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList>;
};
