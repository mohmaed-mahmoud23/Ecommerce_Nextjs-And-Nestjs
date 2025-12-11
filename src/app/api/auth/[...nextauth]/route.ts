import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
  username: { label: "email", type: "email", placeholder: "example@gmail.com" },
  password: { label: "Password", type: "password", placeholder: "••••••••" }
}
,
   async authorize(credentials) {

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials?.username,
      password: credentials?.password,
    }),
  });

  const data = await res.json(); // هنا بنجيب بيانات المستخدم من السيرفر
console.log(data)
  if (res.ok && data) {
    // هنا لازم ترجّع object فيه id و email و name على الأقل
    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token, // لو عندك token من السيرفر
    };
  }

  return null; // لو login فشل
} 

  })
],
pages:{
  signIn :"/auth/login"
  
},



})

export { handler as GET, handler as POST }