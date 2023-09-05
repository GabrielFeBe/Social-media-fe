'use clent'
import { api } from '@/lib/api'
import React, { useState } from 'react'

interface Props {
  id: number
  userId: number
}

export default function Comment({ id, userId }: Props) {
  const [comment, setComment] = useState('')
  async function makeComment() {
    try {
      await api.post('/comment', {
        postId: id,
        comment,
        userId, // isso é um mock momentaneo.
      })
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
