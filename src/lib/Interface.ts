export interface AvatarType {
  img: string;
  name: string;
  time: string;
}

export interface UserType {
  id: string;
  name?: string | null | undefined;
  image?: string | null | undefined;
}

export interface PostType {
  id: number;
  content: string;
  privacy?: string;
  created_at?: string;
  files?:[string]
  user: UserType;
  isLiked?: {aggregate:{count:number}};
  isBookmarked?: {aggregate:{count:number}};
  total_likes?:{aggregate:{count:number}}
}

export interface FriendType {
  status: string;
  user: UserType;
}

export interface Message {
  id: string;
  message: string;
  sender_id: string;
  created_at: string;
}
export interface MessageType {
  id: string;
  message: string;
  sender_id: string;
  created_at: string;
}

export interface NotificationType {
  id: number;
  is_read?: boolean;
  type?: string;
  created_at?: string;
}

export interface ConversationType {
  id: string | number;
  user1: UserType;
  user2: UserType;
}
