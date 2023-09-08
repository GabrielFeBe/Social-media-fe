'use client'
import { Posts } from '@/interfaces/Posts'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Link from 'next/link'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { api } from '@/lib/api'

interface Props {
  tokenString: string
  token: UserIDJwtPayload
}

export default function PostSection({ tokenString, token }: Props) {
  const [update, setUpdate] = useState(false)
  const [posts, setPosts] = useState<[] | Posts[]>([])
  useEffect(() => {
    async function postsFetch() {
      const responseP = await api.get('/posts', {
        headers: {
          Authorization: tokenString,
        },
      })
      const postOrEmpty: Posts[] = responseP.data || []
      setPosts(postOrEmpty)
    }
    postsFetch()
  }, [update, tokenString])

  console.log(update)
  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id} className="border border-red-600">
            {/* person profile */}
            <div>
              {/* prof picture */}
              {/* name */}
              <Link href={`/profile/${post.user.id}`}>{post.user.name}</Link>
            </div>
            {/* actual post */}
            <div>
              <h3>{post.postTitle}</h3>
              <p>{post.postDescription}</p>
            </div>
            {/* Comments */}
            {post.comments.map((comment) => {
              return (
                <div key={comment.comment}>
                  {/* eslint-disable-next-line */}
                    <img
                    src={comment.user.profilePicture}
                    alt="Pesssoa que comentou"
                  />
                  <h3>{comment.user.name}</h3>
                  <span>{comment.comment}</span>
                </div>
              )
            })}
            <Comment
              id={post.id as number}
              tokenString={tokenString}
              userId={token.id}
              update={update}
              setUpdate={setUpdate}
            ></Comment>
          </div>
        )
      })}
    </>
  )
}
