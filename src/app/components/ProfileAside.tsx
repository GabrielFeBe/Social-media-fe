'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import UserFriend from '@/interfaces/Friend'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { useMyContext } from '@/context/Profile.context'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default function ProfileAside({ token, tokenString }: Props) {
  const { addData, data } = useMyContext()
  const user = data
  useEffect(() => {
    async function fetchUser() {
      const responseU = await api.get(`/friends/${token.id}`, {
        headers: {
          Authorization: tokenString,
        },
      })
      const user: UserFriend = responseU.data
      addData(user)
    }
    fetchUser()
  }, [])
  if (user === null) return <></>

  return (
    <>
      <div className="flex gap-3 justify-center">
        <Link href={`/profile/${user.id}`}>
          <img
            src={user.profilePicture}
            alt={`Profile of ${user.name}`}
            className="w-[200px] h-[200px] aspect-video rounded-full"
          />
        </Link>
        <h3 className="self-center font-bold text-xl hover:bg-gray-600 rounded-md p-2">
          <Link href={`/profile/${user.id}`}>{user?.name}</Link>
        </h3>
      </div>
      <p className="pt-2">{user?.description}</p>
      <p className="pt-2">{user?.local}</p>
      <Link
        href={`/friends/${user.id}`}
        className="pt-1 hover:bg-gray-600 rounded-md pb-1 mt-1"
      >
        Friend List
      </Link>
    </>
  )
}
