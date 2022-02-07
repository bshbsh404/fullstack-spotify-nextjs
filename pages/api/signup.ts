import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const salt = bcrypt.genSaltSync();
    const { name, email, password } = req.body;

    let user: {
      email: any;
      id: any;
      createdAt?: Date;
      updatedAt?: Date;
      password?: string;
      name?: string;
    };

    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, salt),
        },
      });
    } catch (e) {
      res.status(401);
      res.json({ error: "User already exists" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize(process.env.JWT_COOKIE_TOKEN, token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.json(user);
  } else {
    res.status(404);
    res.json({ error: "Page Not found" });
  }
};
