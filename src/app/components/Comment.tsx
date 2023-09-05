'use client'
import { api } from '@/lib/api'
import React, { useState } from 'react'

interface Props {
  id: number
  userId: number
  tokenString: string
}

export default function Comment({ id, userId, tokenString }: Props) {
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
      ></textarea>
      <button onClick={makeComment}>Comment</button>
    </>
  )
}
