'use client'
import { Posts } from '@/interfaces/Posts'
import { useEffect, useRef, useState } from 'react'
import PostComponent from './posts/PostComponent'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { useMyPostContext } from '@/context/PostSect'

interface Props {
  post: Posts
  token: UserIDJwtPayload
  tokenString: string
}

export default function PostOverView({ post, tokenString, token }: Props) {
  const [update, setUpdate] = useState(false)
  const { addPosts } = useMyPostContext()
  useEffect(() => {
    // ComponentDidMount
    document.body.style.overflow = 'hidden'

    // ComponentWillUnmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  const botaoRef = useRef<HTMLButtonElement & HTMLDivElement>(null)

  return (
    <main
      className="overflowImage"
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
        className="w-1/2 h-3/4 overflow-y-scroll border-2 border-gray-300 rounded-lg shadow-lg p-4"
        onClick={() => console.log('alo')}
        ref={botaoRef}
      >
        <PostComponent
          post={post}
          setUpdate={setUpdate}
          update={update}
          token={token}
          tokenString={tokenString}
        />
      </div>
    </main>
  )
}
