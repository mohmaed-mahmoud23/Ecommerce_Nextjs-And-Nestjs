
import {jwtDecode} from "jwt-decode";
export const runtime = "nodejs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        console.log("API Response:", data);

        if (res.ok && data?.user) {
          const decoded = jwtDecode<DecodedToken>(data.token);
          return {
            id: decoded.id as string,
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            role: data.user.role,
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.token = token.token as string;
      console.log("SESSION:", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as string;
        token.token = user.token as string;
      }
      return token;
    },
  },

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none', // مهم بعد redirect من بوابة الدفع
        secure: true,     // مطلوب على production
        path: '/',
      },
    },
  },
});



export { handler as GET, handler as POST };
