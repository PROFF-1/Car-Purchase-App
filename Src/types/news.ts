export interface News {
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface NewsCardProps {
  news: News;
  onPress?: () => void;
  cardStyle?: any;
} 