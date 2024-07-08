import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import { HasuraAdapter } from "next-auth-hasura-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    EmailProvider({
      server: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'a7679431d5f95c',
          pass: '56a4df414ba158'
        }
      },
      from:'mailtrap@demomailtrap.com',
    }),
  ],
  // For storing user data to our database
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET!,
  }),
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
    error: '/signup/error'
  },

  debug:true,
  logger: {
    error(code, ...message) {
      console.error(code, ...message);
    },
    warn(code, ...message) {
      console.warn(code, ...message);
    },
    debug(code, ...message) {
      console.debug(code, ...message);
    }
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
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "admin",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };