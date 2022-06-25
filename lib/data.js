
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
    // only return the videos of a particular person if the author 
    // parameter is sent in the options
    if (options.author) {
        data.where = {
        author: {
            id: options.author,
        },
        }
    }

  if (options.take) data.take = options.take
  if (options.skip) data.skip = options.skip

  const videos = await prisma.video.findMany(data)

  return videos
}

export const getVideo = async (id, prisma) => {
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  })

  return video
}

export const getUser = async (username, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  return user
}