import { useRouter } from 'next/router'
import { useState } from 'react'

export default function SubscribedButton({ user, subscribed }) {
    const router = useRouter()
    const [subscribedButtonText, setSubscribedButtonText] = useState('Subscribed')
    const [subscribedButtonColor, setSubscribedButtonColor] = useState('green')

    const onClickSubscribe = async () =>{
        const requestParams= {
            body: JSON.stringify({
                subscribeTo: user.id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
          await fetch('/api/subscribe', requestParams)
          router.reload(window.location.pathname)
    }

    const onClickUnSubscribe = async () =>{
        const requestParams= {
            body: JSON.stringify({
                unsubscribeTo: user.id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
          await fetch('/api/unsubscribe', requestParams)
          router.reload(window.location.pathname)
    }

    return (
    <>
    {subscribed ? (
        <button
            className={`bg-${subscribedButtonColor}-500 px-3 py-2 rounded-md`}
            onClick={onClickUnSubscribe}
            onMouseOver={() => {
                setSubscribedButtonColor('red')
                setSubscribedButtonText('Unsubscribe')
            }}
            onMouseOut={() => {
                setSubscribedButtonText('Subscribed')
                setSubscribedButtonColor('green')
            }}
        >
            {subscribedButtonText}
        </button>

    ):(
        <button
            className='bg-red-500 px-3 py-2 rounded-md'
            onClick={onClickSubscribe}
        >
            Subscribe
        </button>
    )}
    </>
  )
}