export interface CommunityPost {
  id: string;
  user: {
    name: string;
    ownerType: string;
    avatar: string;
  };
  title: string;
  image: string;
  timeAgo: string;
  views: number;
  comments: number;
  likes: number;
}

export interface CommunityPostCardProps {
  post: CommunityPost;
  onPress: () => void;
}

export interface UserStory {
  id: string;
  name: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  following?: number;
  followers?: number;
  posts?: number;
} 