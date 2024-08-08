import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jsonwebtoken from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
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
    // warn(code, ...message) {
    //   console.warn(code, ...message);
    // },
    // debug(code, ...message) {
    //   console.debug(code, ...message);
    // }
  },

  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: "jwt" },

  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      // const encodedToken = jsonwebtoken.sign(token!, secret, {
      //   algorithm: "HS256",
      // });
      // return encodedToken;
      if (!token?.accessToken) {
        throw new Error('Missing access token');
      }
      return token?.accessToken;
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
      let hasuraToken = {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
        accessToken:''
      }

      const secret = process.env.NEXTAUTH_SECRET;
      if (!secret) {
        throw new Error('NEXTAUTH_SECRET is not defined');
      }

      hasuraToken.accessToken = await jsonwebtoken.sign(hasuraToken, secret, {
        algorithm: "HS256",
      });

      return hasuraToken;
    },

    // Add user ID to the session
    session: async ({ session, token }) => {

      if (session?.user) {
        session.user.id = token.sub!;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },

  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
