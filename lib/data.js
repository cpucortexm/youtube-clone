
import { amount } from 'lib/config'

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

    // This is for pagination
  data.take = options.take || amount
  if (options.skip) data.skip = options.skip

  // First we get the current user object with its subscriptions data
  if (options.subscriptions) {
    const user = await prisma.user.findUnique({
      where: {
        id: options.subscriptions,
      },
      include: {
        subscribedTo: true,
      },
    })
  // We pass an array of user id parameters that we want the authorId to be:our subscriptions
    data.where = {
      authorId: {
        in: user.subscribedTo.map((channel) => channel.id),
      },
    }
  }

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


export const getSubscribersCount = async (username, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      subscribers: true,
    },
  })

  return user.subscribers.length
}

// called from pages/channel/[username].js
export const isSubscribed = async (username, isSubscribedTo, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      subscribedTo: {
        where: {
          id: isSubscribedTo,
        },
      },
    },
  })

  return user.subscribedTo.length === 0 ? false : true
}