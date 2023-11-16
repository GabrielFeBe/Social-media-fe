'use client'
import { useEffect, useRef, useState } from 'react'
import PostComponent from './posts/PostComponent'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { useMyPostContext } from '@/context/PostSect'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default function PostOverView({ tokenString, token }: Props) {
  const [update, setUpdate] = useState(false)
  const { addPosts, posts } = useMyPostContext()
  useEffect(() => {
    // ComponentDidMount
    document.body.style.overflow = 'hidden'

    // ComponentWillUnmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  const botaoRef = useRef<HTMLButtonElement & HTMLDivElement>(null)
  if (!posts) return null

  return (
    <main
      className={`${posts ? 'overflowImage' : 'hidden'}`}
      onClick={(event) => {
        if (
          botaoRef.current &&
          !botaoRef.current.contains(event.target as Node)
        ) {
          addPosts()
        }
      }}
    >
      <button
        className="absolute top-2 text-red-600 right-2"
        onClick={() => {
          addPosts()
        }}
      >
        X
      </button>
      <div
        className={`w-1/2 h-3/4 overflow-y-scroll border-2 border-gray-300 rounded-lg shadow-lg p-4 ${
          posts ? 'text-white' : ''
        }`}
        onClick={() => console.log('alo')}
        ref={botaoRef}
      >
        <PostComponent
          post={posts}
          setUpdate={setUpdate}
          update={update}
          token={token}
          tokenString={tokenString}
        />
      </div>
    </main>
  )
}
