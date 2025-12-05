import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // Логування для дебагу: дивимось, що приходить у req.body
    console.log('Register req.body:', req.body);
    const { email, password } = req.body;

    // Перевірка, чи email і password не порожні
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        id: nanoid(), // Генеруємо унікальний id
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
        name: "", // Додаємо порожнє ім'я, щоб задовольнити вимоги Prisma
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    // Логування помилки для дебагу
    console.log('Register error:', error);
    return res.status(400).end();
  }
}
