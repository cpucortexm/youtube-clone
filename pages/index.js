import Head from 'next/head'
import { getVideos } from 'lib/data.js'
import prisma from 'lib/prisma'
import Videos from 'components/Videos'
import Heading from 'components/Heading'
import LoadMore from 'components/LoadMore'
import { useState } from 'react'
import { amount } from 'lib/config'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home({ initialVideos }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [videos, setVideos] = useState(initialVideos)
  //create a reachedEnd state variable and we use it to conditionally 
  //show the LoadMore component. This gets updated in LoadMore.js
  // make sure this also happens initially, so if we only have 1 video we
  //  don’t show “load more”:
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)
  const loading = status === 'loading'

  if (loading) {
    return null
  }

  if (session && !session.user.name) {
    router.push('/setup')
  }
  return (
    <div>
        <Head>
          <title>YouTube Clone</title>
          <meta name='description' content='A great YouTube Clone' />
          <link rel='icon' href='/favicon.ico' />
      </Head>

      <Heading />

        {videos.length === 0 && (
          <p className='flex justify-center mt-20'>No videos found!</p>
        )}
      <Videos videos={videos} />
      {/* To know where are we in the list? we pass the list of videos to LoadMore */}
      {/* When we reach the end of the list we want the Load more button to disappear*/}
      {!reachedEnd && (
        <LoadMore 
            videos={videos}
            setVideos={setVideos}
            setReachedEnd ={setReachedEnd}
            />
      )}
    </div>
  )
}


export async function getServerSideProps() {
  let videos = await getVideos({}, prisma)
	videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
     initialVideos: videos,
    },
  }
}