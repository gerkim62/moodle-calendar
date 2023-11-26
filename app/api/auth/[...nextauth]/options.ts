import prisma from "@/libs/prisma";
import { AuthOptions } from "next-auth";
import  CredintialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions: AuthOptions = {
    providers: [
      CredintialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) return null;
          const { username, password } = credentials;
  
          if (!username || !password) return null;
          try {
            const user = await prisma.user.findUnique({
              where: {
                username,
              },
            });
  
            if (!user) return null;
  
            const passwordMatch = await bcrypt.compare(password, user.password);
  
            if (!passwordMatch) return null;
            console.log(user);
            
            return {...user, name: user.username}
          } catch (error) {
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  
    pages: {
      signIn: "/signin",
    },
  
    callbacks: {
      session: ({ session, token }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }),
    },
  };

  export default authOptions;