import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jsonwebtoken from "jsonwebtoken";
import axios from "axios";

const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST!,
        port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587,
        secure: process.env.EMAIL_PORT === "465",
        auth: {
          user: process.env.EMAIL_AUTH_USER!,
          pass: process.env.EMAIL_AUTH_PASS!,
        },
      },
      from: process.env.EMAIL_FROM,

      sendVerificationRequest:async ({
        identifier: email,
        url
      }) => {
        try {
          const URL = `https://fluent-wm.fssywp.easypanel.host/api/w/training/jobs/run_wait_result/f/u/tasnim/email/verification`
          const response = await axios.post(URL,
          {email, url},
           {headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`
          }})
          console.log(response.data)

          if (response.data.status !== 'success') {
            throw new Error('Failed to send email');
          }

          console.log('Verification email sent successfully');
        } catch (error) {
          console.error('Error sending verification email:', error);
          throw new Error('Failed to send verification email');
        }

      },
    }),
  ],

  // For storing user data to database
  adapter: HasuraAdapter({
    endpoint: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET!,
  }),

  // Redirect routes for Authentication status
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
    error: "/signup/error",
  },

  // For debugging errors for nextauth
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(code, ...message);
    },
  },

  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: "jwt" },

  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: "HS256",
      });
      return encodedToken;
    },

    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken as JWT;
    },
  },

  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },

    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
          throw new Error("NEXTAUTH_SECRET is not defined");
        }
        session.accessToken = jsonwebtoken.sign(token, secret, {
          algorithm: "HS256",
        });
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
