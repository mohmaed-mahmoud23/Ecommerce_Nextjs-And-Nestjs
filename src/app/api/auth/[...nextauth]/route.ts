export const runtime = "nodejs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          return {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            token: data.token, // التوكين هنا
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
    session.user.role = token.role as string;
    session.token = token.accessToken as string;

    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.token;
      token.token = user.token as string
    }

    return token;
  }
},
secret: process.env.AUTH_SECRET,
session: {
  strategy: 'jwt'
}


});

export { handler as GET, handler as POST };
