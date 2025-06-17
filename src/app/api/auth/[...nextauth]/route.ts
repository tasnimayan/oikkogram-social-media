import { NextAuthOptions, type Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import { useFetchGqlAdmin } from "@/lib/api/graphql";
import { GET_USER_BY_EMAIL } from "@/lib/api/api-auth";
import { verifyPassword } from "@/lib/utils";

declare module "next-auth" {
  interface Session {
    user?: User | null;
    expires: string;
    token?: string;
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  }
}

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_AUTH_USER,
  EMAIL_AUTH_PASS,
  EMAIL_FROM,
  NEXT_PUBLIC_HASURA_URL,
  HASURA_ADMIN_SECRET,
  NEXTAUTH_SECRET,
} = process.env;

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT) || 587,
        auth: {
          user: EMAIL_AUTH_USER,
          pass: EMAIL_AUTH_PASS,
        },
      },
      from: EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        try {
          // Check if user exists
          const userData = await useFetchGqlAdmin(GET_USER_BY_EMAIL, { email });
          const existingUser = userData.data[0];

          // Sign in flow
          if (!existingUser) {
            throw new Error("No user found with this email");
          }

          if (!existingUser.password) {
            throw new Error("Please use magic link to sign in or set up a password");
          }

          // Verify password
          const isValidPassword = await verifyPassword(password, existingUser.password);

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            image: existingUser.image,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error instanceof Error ? error.message : "Authentication failed");
        }
      },
    }),
  ],

  // For storing user data to database
  adapter: HasuraAdapter({
    endpoint: NEXT_PUBLIC_HASURA_URL!,
    adminSecret: HASURA_ADMIN_SECRET!,
  }),

  // Redirect routes for Authentication status
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    error: "/error",
  },

  // For debugging errors for nextauth
  debug: process.env.NODE_ENV === "development",

  logger: {
    error(code, ...message) {
      console.error("NextAuth Error:", code, ...message);
    },
  },

  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: "jwt" },

  jwt: {
    encode: async ({ secret, token }) => {
      if (!token) throw new Error("No token to encode.");
      return jwt.sign(token, secret, { algorithm: "HS256" });
    },
    decode: async ({ secret, token }) => {
      if (!token) throw new Error("No token to decode.");
      return jwt.verify(token, secret, { algorithms: ["HS256"] }) as JWT;
    },
  },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      token["https://hasura.io/jwt/claims"] = {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-role": "user",
        "x-hasura-user-id": token.sub,
      };

      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.token = jwt.sign(token, NEXTAUTH_SECRET!, {
          algorithm: "HS256",
        });
      }
      return session;
    },
    // async signIn({ user, account, profile }) {
    //   // Allow sign in for all valid authentications
    //   return true;
    // },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
