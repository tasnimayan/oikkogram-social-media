# NextBuddy: Social Media Platform

NextBuddy is a social media platform inspired by Facebook, designed to connect users worldwide. It allows users to interact through posts, real-time chats, and notifications, all within a secure and user-friendly environment.

## Features

- **Account Creation**: Users can sign up using their email and name.
- **Authentication**: Secure user authentication implemented with NextAuth.
- **Friendship Management**: Users can add or remove friends.
- **Real-time Chat**: Chat with friends in real-time. This feature supports pagination and is powered by GraphQL subscriptions.
- **Post Management**: Users can add, edit, and remove posts. Posts are moved to a trash bin and permanently deleted after 24 hours or can be manually removed.
- **Post Privacy Settings**: Users can set their posts to be visible to 'only me' or 'public'.
- **Notifications**: Send notifications via email and within the web application when a user adds a friend or receives a new message.

## Technologies

- **Frontend**: Next.js, Tailwind CSS, TypeScript, Axios, React Query, React Hook Form
- **Authentication**: NextAuth for secure and scalable user authentication.
- **Backend**: Hasura GraphQL engine with PostgreSQL database, utilizing advanced features like triggers and permissions for robust data management.

## Getting Started

To get started with NextBuddy, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repository/nextbuddy.git
   cd nextbuddy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the necessary environment variables:
   ```
   NEXTAUTH_URL=your_production/development_base_url
   NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=your_hasura_endpoint
   NEXT_PUBLIC_HASURA_GRAPHQL_WS_ENDPOINT=your_hasura_websocket_endpoint
   NEXTAUTH_SECRET=your_admin_secret
   HASURA_PROJECT_ENDPOINT=your_hasura_endpoint
   HASURA_ADMIN_SECRET=your_hasura_admin_secret
   EMAIL_HOST=your_email_smtp_host
   EMAIL_AUTH_USER=your_email_auth_user
   EMAIL_AUTH_PASS=your_email_auth_password
   EMAIL_FROM=your_email_from_address
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## Code Structure

- **Frontend Components**: Located in `src/app/components`, these include UI components like forms, posts, and chat interfaces.
- **API Routes**: Server-side logic in `src/app/api` handles backend requests such as authentication, post management, and file uploads.
- **Utilities**: Helper functions and utilities are stored in `src/app/utility`.

## Security

NextBuddy uses NextAuth for secure authentication and Hasura for backend operations, ensuring robust security practices like JWT handling and permission-based data access.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with your proposed changes. For major changes, please open an issue first to discuss what you would like to change.

Ensure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.
