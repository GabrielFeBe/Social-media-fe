'use client'
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
  async function makeComment() {
    try {
      await api.post(
        '/comments',
        {
          postId: id,
          comment,
          userId, // isso é um mock momentaneo.
        },
        {
          headers: {
            Authorization: tokenString,
          },
        },
      )
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
        className="w-1/2 h-16 break block resize-none"
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
