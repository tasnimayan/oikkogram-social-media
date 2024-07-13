export interface AvatarType {
  img: string;
  name: string;
  isVerified: boolean;
  time: string;
}

export interface PostType {
  id: number;
  content: string;
  privacy?: string;
  created_at?: string;
  user: {
    id: string;
    name: string | null;
    image?: string | null;
  };
}

export interface FriendType {
  status: string;
  user: {
    image: string | null;
    name: string | null;
    id: string;
  };
}

export interface UserType {
  id: string;
  name: string | null;
  image: string | null;
}
