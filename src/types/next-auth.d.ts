import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string; // التوكين اللي ضفته
    user: {
      role?: string; // الدور أو أي حقول إضافية
      id?: string;   // لو عايز تضيف id
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: string;
    token?: string;
  }
}
