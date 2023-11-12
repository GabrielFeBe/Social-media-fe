'use client'
import { Posts } from '@/interfaces/Posts'
import { useEffect, useState } from 'react'
import PostComponent from './posts/PostComponent'
import { UserIDJwtPayload } from 'jsonwebtoken'

interface Props {
  post: Posts
  token: UserIDJwtPayload
  tokenString: string
}

export default function PostOverView({ post, tokenString, token }: Props) {
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    // ComponentDidMount
    document.body.style.overflow = 'hidden'

    // ComponentWillUnmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <main role="presentation" className="overflowImage">
      <div className="w-1/2 h-1/3 ">
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
