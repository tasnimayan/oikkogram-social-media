export interface AvatarType {
  img: string;
  name: string;
  time: string;
}

export interface UserType {
  id: string;
  name: string | null;
  image: string | null;
}

export interface PostType {
  id: number;
  content: string;
  privacy?: string;
  created_at?: string;
  user: UserType;
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
  id: string | number;
  user_id?: string;
  type: "new_message" | "new_friend";
  created_at?: string;
}

export interface ConversationType {
  id: string | number;
  user1: string | null;
  user2: string | null;
}
