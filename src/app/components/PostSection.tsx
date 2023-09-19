'use client'
import { Posts } from '@/interfaces/Posts'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { api } from '@/lib/api'
import PersonBlock from './PersonBlock'
import CommentPerson from './CommentPerson'

interface Props {
  tokenString: string
  token: UserIDJwtPayload
}

export default function PostSection({ tokenString, token }: Props) {
  const [update, setUpdate] = useState(false)
  const [posts, setPosts] = useState<[] | Posts[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState(false)
  useEffect(() => {
    async function postsFetch() {
      try {
        const responseP = await api.get('/posts', {
          headers: {
            Authorization: tokenString,
          },
        })
        const postOrEmpty: Posts[] = responseP.data || []
        setPosts(postOrEmpty)
      } catch (err) {
        setPostsError(true)
      } finally {
        setPostsLoading(false)
      }
    }
    postsFetch()
  }, [update, tokenString])

  if (postsError) {
    return (
      <h1 className="text-3xl text-red-700 font-bold">
        Some error ocurred within the server connection
      </h1>
    )
  }

  return (
    <>
      {postsLoading ? (
        <h1 className="text-3xl text-gray-700 font-bold">Loading...</h1>
      ) : (
        posts.map((post) => {
          return (
            <div key={post.postTitle} className="border border-gray-600">
              {/* person profile */}
              <div>
                {/* prof picture */}
                {/* name */}
                <PersonBlock
                  image={post.user.profilePicture}
                  name={post.user.name}
                  timePost={post.postDate as Date}
                ></PersonBlock>
                <div className="m-3">
                  <h4>{post.postTitle}</h4>
                  <span>{post.postDescription}</span>
                </div>
              </div>
              {/* actual post */}
              {/* Comments */}
              {post.comments.map((comment) => {
                return (
                  <div key={comment.comment}>
                    {/* eslint-disable-next-line */}
                   <CommentPerson comment={comment.comment}
                      image={comment.user.profilePicture}
                      name={comment.user.name}
                      timePost={comment.commentDate}
                      id={comment.user.id as number}
                    ></CommentPerson>
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
        })
      )}
    </>
  )
}
