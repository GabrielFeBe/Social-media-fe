'use client'
import { useMyPostContext } from '@/context/PostSect'
import { api } from '@/lib/api'
import React, { useState } from 'react'

interface Props {
  id: number
  userId: number
  tokenString: string
  setUpdate: (update: boolean) => void
  update: boolean
}

export default function Comment({
  id,
  userId,
  tokenString,
  setUpdate,
  update,
}: Props) {
  const [comment, setComment] = useState('')
  const { posts, addPosts } = useMyPostContext()
  async function makeComment() {
    try {
      const res = await api.post(
        '/comments',
        {
          postId: id,
          comment,
          userId, // token.id
        },
        {
          headers: {
            Authorization: tokenString,
          },
        },
      )
      if (posts) {
        const mockPost = posts
        const comment = res.data
        mockPost.comments.push(comment)
        addPosts(mockPost)
        setUpdate(!update)
      }
      setUpdate(!update)
    } catch (err) {
      return null
    } finally {
      setComment('')
    }
  }
  return (
    <>
      <textarea
        value={comment}
        name=""
        id=""
        placeholder="Make your comment here"
        onChange={({ target }) => setComment(target.value)}
        className="w-full h-24 break block resize-none rounded-sm border-2 border-gray-500 bg-black text-white"
      ></textarea>
      <button
        className="hover:text-gray-400 p-3 bg-gray-950 text-gray-50 rounded-xl mt-2 mb-2"
        onClick={makeComment}
      >
        Comment
      </button>
    </>
  )
}
