
// gets the videos data from the database, using Prisma, and returns them:
export const getVideos = async (options, prisma) => {
  const data = {
    where: {},
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      author: true,
    },
  }

  const videos = await prisma.video.findMany(data)

  return videos
}