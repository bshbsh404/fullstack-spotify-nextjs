import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songsTable";

const getBackgroundColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "teal",
    "purple",
    "yellow",
    "gray",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBackgroundColor(playlist.id)
  return (
    <GradientLayout
      color={color}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      subtitle="playlist"
      title={playlist?.name}
      description={`${playlist.songs.length} songs`}
      roundImage={false}
    >
      <SongTable songs={playlist?.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.SPOTIFY_ACCESS_TOKEN);
  const playlist = await prisma.pLaylist.findFirst({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
