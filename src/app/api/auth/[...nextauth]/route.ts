import { NextAuthOptions, type Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jwt from "jsonwebtoken";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User | null;
    expires: string;
    token?: string;
  }

  interface User {
    name: string;
    email: string;
    image: string;
    id: string;
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
  ],

  // For storing user data to database
  adapter: HasuraAdapter({
    endpoint: NEXT_PUBLIC_HASURA_URL!,
    adminSecret: HASURA_ADMIN_SECRET!,
  }),

  // Redirect routes for Authentication status
  pages: {
    signIn: "/signin",
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
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
