export interface User {
  id: string;
  name: string;
  avatar: string;
  neighborhood: string;
  joinedDate: Date | string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  image?: string;
  author: User;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  location?: string;
  type?: "general" | "announcement" | "question" | "event" | "lost_found";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date | string;
  endTime: Date | string;
  organizer: User;
  attendees: User[];
  image?: string;
  category: string;
  isVirtual?: boolean;
  capacity?: number;
  cost?: number;
  agenda?: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  color: string;
  image?: string;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  organizer: User;
  supporters: User[];
  volunteers: number;
  location: string;
  startDate: Date | string;
  category: string;
  goal?: string;
  progress: number;
  image?: string;
}

export interface CauseUpdate {
  id: string;
  causeId: string;
  content: string;
  author: User;
  createdAt: Date;
  image?: string;
  likes: number;
}
