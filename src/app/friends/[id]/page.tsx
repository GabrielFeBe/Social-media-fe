import UserFriend from '@/interfaces/Friend'
import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import React from 'react'
import Friends from '@/app/components/Friends'

export default async function page({ params }: { params: { id: string } }) {
  // preciso de um componente que receba os amigos do usuario logado e renderize eles em pequenas cartas de 100x100
  let token: null | UserIDJwtPayload = null
  try {
    token = getUser()
  } catch (err) {
    token = null
  }
  if (!token)
    return (
      <div className=" min-h-screen bg-gray-900">
        <h1 className="text-red-700 text-6xl p-10 text-center">
          Token invalido
        </h1>
      </div>
    )
  const id = +params.id
  const tokenString = cookies().get('token')?.value
  const responseU = await api.get(`/friends/${id}`, {
    headers: {
      Authorization: tokenString,
    },
  })
  const user: UserFriend = responseU.data
  const friends = user.friends || []

  return (
    <div className="m-auto w-3/4 min-h-3/4 bg-blue-500 max-h-fit pt-10 flex flex-wrap ">
      <Friends
        friends={friends}
        token={token}
        tokenString={tokenString as string}
      />
    </div>
  )
}
