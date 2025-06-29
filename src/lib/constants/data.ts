import type { Post, User, Comment, Cause, CauseUpdate, Event } from "@/lib/types";

// Sample users
export const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.png",
    neighborhood: "Parkside",
    joinedDate: new Date(2022, 3, 15),
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.png",
    neighborhood: "Parkside",
    joinedDate: new Date(2022, 5, 22),
  },
  {
    id: "3",
    name: "Aisha Patel",
    avatar: "/placeholder.png",
    neighborhood: "Parkside",
    joinedDate: new Date(2022, 7, 10),
  },
  {
    id: "4",
    name: "David Rodriguez",
    avatar: "/placeholder.png",
    neighborhood: "Parkside",
    joinedDate: new Date(2022, 9, 5),
  },
  {
    id: "5",
    name: "Emma Wilson",
    avatar: "/placeholder.png",
    neighborhood: "Oakridge",
    joinedDate: new Date(2023, 1, 18),
  },
  {
    id: "6",
    name: "James Taylor",
    avatar: "/placeholder.png",
    neighborhood: "Riverside",
    joinedDate: new Date(2023, 2, 7),
  },
];

// Sample comments
const comments: Comment[] = [
  {
    id: "1",
    content: "I can help with this! I have some extra gardening tools I can bring.",
    author: users[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    content: "Count me in! What time should we meet?",
    author: users[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "3",
    content: "I saw this yesterday near the park. It looked like a golden retriever mix.",
    author: users[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
  },
  {
    id: "4",
    content: "I can check my security camera footage to see if it caught anything.",
    author: users[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
  },
];

// Sample posts
export const posts: Post[] = [
  {
    id: "1",
    content:
      "Looking for volunteers for our community garden cleanup this Saturday! We need help with weeding, planting new flowers, and general maintenance. Refreshments will be provided! 🌱🌻",
    image: "/placeholder.png",
    author: users[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 15,
    comments: [comments[0], comments[1]],
    location: "Community Garden",
    type: "announcement",
  },
  {
    id: "2",
    content:
      'Has anyone seen this dog? She went missing yesterday afternoon near Oak Street Park. She responds to the name "Bella" and is very friendly. Please contact me if you see her. Thank you! 🐕',
    image: "/placeholder.png",
    author: users[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 24,
    comments: [comments[2], comments[3]],
    location: "Oak Street Park",
    type: "lost_found",
  },
  {
    id: "3",
    content:
      "Just a heads up to everyone in the neighborhood - there have been reports of package thefts on Maple Avenue. Please try to retrieve your deliveries promptly or consider using delivery lockers. Stay safe everyone!",
    author: users[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    likes: 32,
    comments: [],
    location: "Maple Avenue",
    type: "announcement",
  },
  {
    id: "4",
    content:
      "Does anyone know a good local plumber? My kitchen sink is leaking and I need someone reliable who can come tomorrow. Thanks in advance for your recommendations!",
    author: users[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    likes: 7,
    comments: [],
    type: "question",
  },
  {
    id: "5",
    content:
      "Excited to announce our neighborhood block party next month! We'll have food, games, and live music. Everyone is welcome to join. More details coming soon!",
    image: "/placeholder.png",
    author: users[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 45,
    comments: [],
    location: "Main Street",
    type: "event",
  },
];

// Sample cause updates
export const causeUpdates: CauseUpdate[] = [
  {
    id: "1",
    causeId: "1",
    content:
      "Great news! We've secured permission from the city to use the lot for our community garden. We'll be starting the clearing work this weekend. If you'd like to help, please sign up for a volunteer shift!",
    author: users[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    image: "/placeholder.png",
    likes: 18,
  },
  {
    id: "2",
    causeId: "1",
    content:
      "Update: We've cleared about half of the lot and marked out areas for different garden beds. Thanks to everyone who came out to help yesterday! We still need volunteers for next weekend to help with soil preparation.",
    author: users[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 12,
  },
  {
    id: "3",
    causeId: "2",
    content:
      "We had our first neighborhood watch meeting last night with 15 attendees and a representative from the police department. We've established initial patrol routes and communication protocols. Next meeting is scheduled for next Tuesday at 7pm.",
    author: users[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
    image: "/placeholder.png",
    likes: 9,
  },
  {
    id: "4",
    causeId: "4",
    content:
      "We've already collected over 300 pounds of food! Thank you to everyone who has donated so far. We still need more canned proteins, pasta, and rice. Drop-off locations will remain open until the end of the month.",
    author: users[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    likes: 24,
  },
];

// Sample events
export const events: Event[] = [
  {
    id: "1",
    title: "Neighborhood Block Party",
    description:
      "Join us for our annual block party! We'll have food, games, live music, and activities for all ages. This is a great opportunity to meet your neighbors and build community connections. Please bring a dish to share if you can.",
    location: "Main Street (between Oak and Pine)",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 4), // 4 hours after start
    organizer: users[0],
    attendees: [users[1], users[2], users[3], users[4]],
    image: "/placeholder.png",
    category: "Social",
    agenda: [
      "12:00 PM - Setup and welcome",
      "1:00 PM - Potluck lunch begins",
      "2:00 PM - Games and activities",
      "4:00 PM - Live music",
      "6:00 PM - Cleanup",
    ],
  },
  {
    id: "2",
    title: "Community Garden Workday",
    description:
      "Help us maintain our community garden! We'll be weeding, planting new vegetables, and fixing up the garden beds. No experience necessary - tools and guidance will be provided. Please wear clothes that can get dirty and bring water.",
    location: "Parkside Community Garden",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 3), // 3 hours after start
    organizer: users[2],
    attendees: [users[0], users[1], users[5]],
    image: "/placeholder.png",
    category: "Volunteer",
  },
  {
    id: "3",
    title: "Neighborhood Watch Meeting",
    description:
      "Monthly meeting to discuss neighborhood safety concerns and coordinate watch efforts. We'll have a representative from the local police department to answer questions and provide updates on recent incidents in the area.",
    location: "Parkside Community Center",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10 + 1000 * 60 * 60 * 1.5), // 1.5 hours after start
    organizer: users[3],
    attendees: [users[0], users[4], users[5]],
    category: "Community Development",
  },
  {
    id: "4",
    title: "Virtual Book Club",
    description:
      "Join our monthly book club discussion! This month we're reading 'The Vanishing Half' by Brit Bennett. Everyone is welcome, whether you've finished the book or not. We'll have a friendly discussion about themes, characters, and your thoughts on the story.",
    location: "Zoom Meeting (link provided after RSVP)",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 2), // 2 hours after start
    organizer: users[4],
    attendees: [users[1], users[2]],
    category: "Education",
    isVirtual: true,
  },
  {
    id: "5",
    title: "Youth Soccer Clinic",
    description:
      "Free soccer clinic for kids ages 5-12! Experienced coaches will lead fun drills and games to help children develop their soccer skills. All skill levels welcome. Please bring water, sunscreen, and appropriate footwear.",
    location: "Parkside Field",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 60 * 2), // 2 hours after start
    organizer: users[5],
    attendees: [],
    image: "/placeholder.png",
    category: "Sports",
    capacity: 20,
  },
  {
    id: "6",
    title: "Local Business Networking Breakfast",
    description:
      "Connect with other local business owners and entrepreneurs in our community. Share ideas, challenges, and opportunities while enjoying breakfast at the Parkside Cafe. Great opportunity to build relationships and explore potential collaborations.",
    location: "Parkside Cafe",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 1.5), // 1.5 hours after start
    organizer: users[1],
    attendees: [users[3], users[5]],
    category: "Social",
    cost: 15,
  },
];
