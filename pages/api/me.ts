import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    const playlistsCount = await prisma.pLaylist.count({
      where: {
        userId: user.id,
      },
    });
    res.json({ ...user, playlistsCount });
  }
);
