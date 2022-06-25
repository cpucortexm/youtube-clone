// Give option to user to load more videos for pagination

import { amount } from 'lib/config'

const onClickLoadMore = async (
                                videos, 
                                setVideos, 
                                setReachedEnd, 
                                author) =>{
    // see skip param is passed
    const url = `/api/videos?skip=${videos.length}`

    if (author) { // also pass the author information
        url += `&author=${author.id}`
    }
    const res = await fetch(url)
    const data = await res.json() // we get the videos data after fetch


    if (data.length < amount) {
        setReachedEnd(true)
    }

    // we are creating a new array by adding videos available until now and the new
    // videos available in data after fetch
    // in JS, technique is using ... (means all the previous videos upto now)
    setVideos([...videos, ...data])  
}

// pass the length of this videos array as the skip  parameter:
export default function LoadMore({
                                videos,
                                setVideos, 
                                setReachedEnd, 
                                author})
{
  return (
    <div className='flex justify-center'>
      <button
        className='border px-8 py-2 my-10 mr-2 font-bold rounded-full'
        onClick={() => onClickLoadMore(
                                       videos,
                                       setVideos, 
                                       setReachedEnd, 
                                       author)}
      >
        Load more
      </button>
    </div>
  )
}