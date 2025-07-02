# 🌐 OikkoGram — MVP 1.0

**OikkoGram** is a hyperlocal social networking platform that empowers people to build real-world connections, support
local causes, and organize meaningful actions within their neighborhood. Designed for community-minded individuals,
OikkoGram makes it easy to connect, share, and stay informed — right where it matters most.

🧠 OikkoGram offers **AI-powered post creation**, where users can input a prompt, and receive a fully formed, editable
post draft — powered by OpenAI. This feature is aimed to encourage more engagement and help users express ideas with
clarity.

---

## ✨ Key Features

### 🧑‍🤝‍🧑 User Profiles & Authentication

- Secure email-based signup/login via **NextAuth**
- Rich user profiles with name, photo, bio, location, and interests and so on
- Passwords securely hashed with **bcrypt**

### 🏘️ Neighborhood Feed

- Real-time post feed filtered by user’s neighborhood
- Supports text, image, and link posts
- Likes and threaded comments system

### 🧠 AI-Powered Post Generation

- Generate high-quality post content from prompts using **OpenAI**
- Helps users express thoughts more clearly and creatively
- AI suggestions are editable before publishing

### 💬 Private Messaging

- One-on-one real-time messaging via GraphQL subscriptions
- Instant delivery using **graphql-ws**

### 🤝 Social Network & Connections

- Connect with people from the same or nearby areas
- Connection requests, approvals, and removals

### 📍 Neighborhood Map & Management

- Manual neighborhood selection
- Area-based neighborhood map visualization using **Leaflet**

### 📣 Local Causes & Volunteering

- Create or join local initiatives (e.g., cleanups or other events)
- Cause metadata: title, description, location, organizer, time and so on
- Join causes or support them publicly

### 🔔 Real-Time Notifications

- New messages, connection updates, and cause activity
- Live push via GraphQL triggers and subscriptions

### 📌 Bookmarks

- Save posts for later
- Organized personal library of saved content

---

## 🧪 Tech Stack

### Frontend

- [Next.js 14](https://nextjs.org/) with **TypeScript**
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for elegant UI components
- [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form validation
- [Leaflet](https://react-leaflet.js.org/) for interactive maps
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Cloudinary](https://cloudinary.com/) for image upload/hosting
- [Apollo Client](https://www.apollographql.com/docs/react) for GraphQL client
- [OpenAI SDK](https://platform.openai.com/docs) for AI text generation

### Backend

- [Hasura GraphQL Engine](https://hasura.io/) for instant GraphQL APIs
- PostgreSQL DB hosted on [Neon](https://neon.tech/)
- GraphQL schema typings with [`gql.tada`](https://gql-tada.0no.co/)

---

## 📦 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/tasnimayan/oikkogram-social-media.git
cd oikkogram-social-media
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Setup environment variables

Create a .env.local file and add necessary secrets:

```env
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_HASURA_URL=
HASURA_ADMIN_SECRET=
GITHUB_AI_API_TOKEN=
NEXTAUTH_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_AUTH_USER=
EMAIL_AUTH_PASS=
EMAIL_FROM=
EMAIL_SECURE=false
CLOUDINARY_URL=
```

Make sure you have Hasura running and schema applied. OpenAI key is required for AI post generation.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will be available at http://localhost:3000.

# 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
