'use client'
import React, { useState } from 'react'
import Comment from './Comment'
import CommentPerson from './CommentPerson'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { Posts } from '@/interfaces/Posts'
import PersonBlock from './PersonBlock'
import Image from 'next/image'

interface Props {
  tokenString: string
  token: UserIDJwtPayload
  post: Posts
  setUpdate: (update: boolean) => void
  update: boolean
}

export default function PostComponent({
  post,
  token,
  tokenString,
  setUpdate,
  update,
}: Props) {
  const [showMore, setShowMore] = useState(false)
  return (
    <>
      {/* person profile */}
      <div>
        {/* prof picture */}
        {/* name */}
        <PersonBlock
          image={post.user.profilePicture}
          name={post.user.name}
          timePost={post.postDate as Date}
          id={post.userId}
        ></PersonBlock>
        <div className="m-3">
          <h4>{post.postTitle}</h4>
          <Image
            src={post.postPicture}
            width={1080}
            height={1080}
            alt={post.postTitle}
          />
          <p
            className={`break-words whitespace-break-spaces ${
              !showMore
                ? 'h-12 overflow-hidden whitespace-no-wrap overflow-ellipsis'
                : ''
            }`}
          >
            {post.postDescription}
          </p>
          <button
            className="text-blue-600 hover:text-blue-500"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show less...' : 'Show more...'}
          </button>
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
    </>
  )
}
