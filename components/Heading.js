// we have a header in all pages, and it’s a perfect candidate to extract a 
// common component.
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Heading() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return null
  }

  return (
    <header className='h-14 flex pt-5 px-5 pb-2'>
      <div className='text-xl'>
        {router.asPath === '/' ? (
          <p>YouTube clone</p>
        ) : (
          <Link href={`/`}>
            <a className='underline'>Home</a>
          </Link>
        )}
      </div>

      <div className='grow ml-10 -mt-1'></div>
          {/* as we’re logged in, we can show the user information in the header like youtube */}
          {session && (
            <Link href={`/channel/${session.user.username}`}>
              <a className='flex'>
                <img
                  src={session.user.image}
                  className='h-8 mr-2 mb-2 -mt-1 w-8 rounded-full'
                />
                <p className='mr-3'>{session.user.name}</p>
              </a>
            </Link>
          )}

      <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
        <a
          className='flex-l border px-4 font-bold rounded-full'
        >
        {session ? 'logout' : 'login'}        
      </a>
      </Link>
    </header>
  )
}