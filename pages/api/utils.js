// API Route requests coming from pages/utils.js
import prisma from 'lib/prisma'
import { faker } from '@faker-js/faker'
import AWS from 'aws-sdk'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.end()

if (req.body.task === 'generate_content') {
  //create 10 users
  let usersCount = 0

  while (usersCount < 10) {
    await prisma.user.create({
        data: {
            name: faker.name.findName(),
            username: faker.internet.userName().toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            image: faker.image.avatar(),
        },
        })
    usersCount++
   }
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    })

    const videoURL = "https://bootcamp-yogi.s3.ap-south-1.amazonaws.com/SampleVideo_1280x720_5mb.mp4"
    const thumbnailURL = "https://bootcamp-yogi.s3.ap-south-1.amazonaws.com/thumbnail1.jpeg"

    const users = await prisma.user.findMany() // find all users
    const getRandomUser = () => {
        const randomIndex = Math.floor(Math.random() * users.length)
        return users[randomIndex]
    }

    //create 20 videos, randomly assigned to users
    let videosCount = 0

    while (videosCount < 20) {
        await prisma.video.create({
        data: {
            title: faker.lorem.words(),
            thumbnail: thumbnailURL,
            url: videoURL,
            length: faker.datatype.number(1000),
            visibility: 'public',
            views: faker.datatype.number(1000),
            author: {
            connect: { id: getRandomUser().id },
            },
        },
        })
        videosCount++
    }
}


  // By deleting the user, we also delete its videos, because of how their relation 
  // is defined in the schema.
  if (req.body.task === 'clean_database') {

    await prisma.user.deleteMany({})
  }

  res.end()
}