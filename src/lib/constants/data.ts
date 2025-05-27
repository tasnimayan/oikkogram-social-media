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

// Sample causes
export const causes = [
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f3",
    title: "Clean Dhaka: Let's Beat Plastic Together!",
    description:
      "Dhaka is our home — vibrant, full of life, but struggling with plastic pollution. Let's unite as responsible citizens to clean up our neighborhoods, reduce plastic use, and promote sustainable alternatives. Join clean-up drives, spread awareness, and inspire others to make Dhaka greener and cleaner for future generations.",
    category: "environment",
    cover_img_url:
      "https://res.cloudinary.com/dd14dysg8/image/upload/v1747674121/buddybase/posts/xkycx9m4xngjml2yo7r3.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Mirpur 1",
    start_date: "2025-10-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "cleaning"],
    goal_type: "volunteers",
    goal_value: 20,
    current_value: 0,
    created_by: {
      id: users[0].id,
      name: users[0].name,
      image: users[0].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 2,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 1,
      },
    },
  },
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f4",
    title: "Community Garden Revitalization",
    description:
      "Help us transform the abandoned lot on Oak Street into a thriving community garden. We need volunteers to help with clearing, planting, and building garden beds. This project will provide fresh produce for the neighborhood and create a beautiful green space for everyone to enjoy.",
    category: "environment",
    cover_img_url: "/placeholder.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Oak Street Community Lot",
    start_date: "2025-05-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "gardening"],
    goal_type: "volunteers",
    goal_value: 12,
    current_value: 12,
    created_by: {
      id: users[0].id,
      name: users[0].name,
      image: users[0].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 4,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 12,
      },
    },
  },
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f5",
    title: "Neighborhood Watch Program",
    description:
      "Join our effort to establish a neighborhood watch program to improve safety and security in our community. We're looking for block captains and volunteers to help coordinate with local law enforcement and organize regular patrols.",
    category: "community-development",
    cover_img_url: "/placeholder.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Parkside Community",
    start_date: "2025-05-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "safety"],
    goal_type: "volunteers",
    goal_value: 50,
    current_value: 8,
    created_by: {
      id: users[3].id,
      name: users[3].name,
      image: users[3].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 3,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 8,
      },
    },
  },
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f6",
    title: "After-School Tutoring Program",
    description:
      "We're launching a free tutoring program for elementary and middle school students in our neighborhood. If you have expertise in math, science, language arts, or any other subject and can spare a few hours a week, please consider volunteering.",
    category: "education",
    cover_img_url: "/placeholder.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Parkside Community Center",
    start_date: "2025-05-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "education"],
    goal_type: "volunteers",
    goal_value: 20,
    current_value: 5,
    created_by: {
      id: users[2].id,
      name: users[2].name,
      image: users[2].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 2,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 5,
      },
    },
  },
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f7",
    title: "Food Drive for Local Shelter",
    description:
      "Help us collect non-perishable food items for the Downtown Shelter. We're aiming to provide meals for at least 200 individuals in need. Drop-off locations will be set up throughout the neighborhood.",
    category: "community-development",
    cover_img_url: "/placeholder.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Multiple Locations",
    start_date: "2025-05-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "food-drive"],
    goal_type: "food",
    goal_value: 500,
    current_value: 400,
    created_by: {
      id: users[1].id,
      name: users[1].name,
      image: users[1].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 5,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 15,
      },
    },
  },
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f8",
    title: "Senior Companion Program",
    description:
      "Many elderly residents in our community live alone and would benefit from regular companionship. We're looking for volunteers to visit seniors, help with errands, or simply provide conversation and friendship.",
    category: "health-wellness",
    cover_img_url: "/placeholder.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Parkside and surrounding areas",
    start_date: "2025-05-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "seniors"],
    goal_type: "visits",
    goal_value: 30,
    current_value: 15,
    created_by: {
      id: users[4].id,
      name: users[4].name,
      image: users[4].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 2,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 7,
      },
    },
  },
  {
    id: "04fe2d1c-a818-477a-ab9a-98280ad311f9",
    title: "Neighborhood Cleanup Day",
    description:
      "Join us for a day of cleaning up our streets, parks, and public spaces. We'll provide gloves, bags, and refreshments. Let's work together to keep our neighborhood beautiful!",
    category: "environment",
    cover_img_url: "/placeholder.png",
    created_at: "2025-05-19T17:02:03.015365+00:00",
    location: "Meet at Central Park",
    start_date: "2025-05-24T18:00:00+00:00",
    status: "ongoing",
    tags: ["volunteer", "cleaning"],
    goal_type: "tasks",
    goal_value: 7,
    current_value: 0,
    created_by: {
      id: users[5].id,
      name: users[5].name,
      image: users[5].avatar,
    },
    total_supporters: {
      aggregate: {
        count: 3,
      },
    },
    total_volunteers: {
      aggregate: {
        count: 20,
      },
    },
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
