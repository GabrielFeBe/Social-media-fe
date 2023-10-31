'use client'
import { Posts } from '@/interfaces/Posts'
import React, { useEffect, useState } from 'react'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { api } from '@/lib/api'
import PostComponent from './PostComponent'
import ErrorComponent from './ErrorComponent'
import PostsRegister from './PostsRegister'
import { usePathname } from 'next/navigation'

interface Props {
  tokenString: string
  token: UserIDJwtPayload
  id?: number
}

export default function PostSection({ tokenString, token, id }: Props) {
  const [update, setUpdate] = useState(false)
  const [posts, setPosts] = useState<[] | Posts[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState(false)
  const path = usePathname()
  useEffect(() => {
    async function postsFetch() {
      try {
        if (id) {
          const responseP = await api.get(`/posts/user/${id}`, {
            headers: {
              Authorization: tokenString,
            },
          })
          const postOrEmpty: Posts[] = responseP.data || []
          setPosts(postOrEmpty)
        } else {
          const responseP = await api.get('/posts', {
            headers: {
              Authorization: tokenString,
            },
          })
          const postOrEmpty: Posts[] = responseP.data || []
          setPosts(postOrEmpty)
        }
      } catch (err) {
        setPostsError(true)
      } finally {
        setPostsLoading(false)
      }
    }
    postsFetch()
  }, [update, tokenString, id])

  if (postsError) {
    return (
      <ErrorComponent errorText="Some error ocurred within the server connection" />
    )
  }
  if (postsLoading) {
    return <h1 className="text-3xl text-gray-700 font-bold">Loading...</h1>
  }
  return (
    <>
      {path === '/' && (
        <PostsRegister
          token={token}
          setUpdate={setUpdate}
          update={update}
          tokenString={tokenString as string}
        />
      )}
      {posts.map((post) => {
        return (
          <div key={post.postTitle}>
            <PostComponent
              post={post}
              setUpdate={setUpdate}
              token={token}
              tokenString={tokenString}
              update={update}
            ></PostComponent>
          </div>
        )
      })}
    </>
  )
}
