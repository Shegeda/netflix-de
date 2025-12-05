import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    Credential({
      id: "credentials",
      // name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required ");
        }

        const prismadb = (await import("@/lib/prismadb")).default;
        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
