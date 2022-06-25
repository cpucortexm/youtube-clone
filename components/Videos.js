import Video from 'components/Video'

// iterates over the videos and prints them.
export default function Videos({ videos }) {
  if (!videos) return null

  return (
    <div className='flex flex-wrap bg-black'>
      {videos.map((video, index) => (
        <div className='w-full md:w-1/2 lg:w-1/3' key={index}>
          <Video video={video} />
        </div>
      ))}
    </div>
  )
}