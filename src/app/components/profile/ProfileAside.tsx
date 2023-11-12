'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import UserFriend from '@/interfaces/Friend'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { useMyContext } from '@/context/Profile.context'
import ErrorComponent from '../ErrorComponent'
import Image from 'next/image'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default function ProfileAside({ token, tokenString }: Props) {
  const { addData, data } = useMyContext()
  const [error, setError] = useState(false)
  const user = data
  useEffect(() => {
    async function fetchUser() {
      try {
        const responseU = await api.get(`/friends/${token.id}`, {
          headers: {
            Authorization: tokenString,
          },
        })
        const user: UserFriend = responseU.data
        addData(user)
      } catch (err) {
        setError(true)
      }
    }
    if (data === null) {
      fetchUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (user === null) return <></>
  if (error)
    return <ErrorComponent errorText="Erro ao conectar ao servidor..." />
  return (
    <>
      <div className="flex gap-3 justify-center">
        <Link href={`/profile/${user.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={user.profilePicture}
            alt={`Profile of ${user.name}`}
            className="w-[200px] h-[200px] rounded-full"
            width={1080}
            height={1080}
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
