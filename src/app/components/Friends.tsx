'use client'
import { useMyContext } from '@/context/Profile.context'
import UserFriend, { Friends } from '@/interfaces/Friend'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ButtonFriendRequest } from './ButtonFriendRequest'
import ErrorComponent from './ErrorComponent'
import Image from 'next/image'

interface Props {
  friends: Friends[]
  tokenString: string
  token: UserIDJwtPayload
}
export default function Friends({ friends, tokenString, token }: Props) {
  const { addData, data } = useMyContext()
  const [friendsError, setFriendsError] = useState(false)
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
        setFriendsError(true)
      }
    }
    if (data === null) {
      fetchUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (friendsError)
    return <ErrorComponent errorText="Conection with server failed" />
  const user = data
  if (!user) return <></>

  const objComparison: Record<number, boolean> = {}
  user.friends.forEach((element: Friends) => {
    objComparison[element.id] = element.FriendRequest.status
  })

  return (
    <>
      {friends.length > 0 ? (
        friends
          .filter((friend) => friend.FriendRequest.status)
          .map((friend) => {
            return (
              <div
                key={friend.id}
                className="flex gap-2 h-24 justify-center items-center"
              >
                <Image
                  src={friend.profilePicture}
                  alt={`Profile of ${friend.name}`}
                  className="w-[40px] h-[40px] rounded-full"
                  width={1080}
                  height={1080}
                />
                <div>
                  <Link href={`/profile/${friend.id}`}>{friend.name}</Link>
                </div>
                {objComparison[friend.id] === false ? (
                  <button className="bg-green-500 rounded-md p-1 h-10 text-center">
                    Request made
                  </button>
                ) : friend.id === token.id ? (
                  <button className="bg-green-500 rounded-md p-1 h-10 text-center">
                    You
                  </button>
                ) : objComparison[friend.id] === true ? (
                  <button className="bg-green-500 rounded-md p-1 h-10 text-center">
                    Friend
                  </button>
                ) : (
                  <div className="bg-red-500 rounded-md p-1">
                    <ButtonFriendRequest
                      tokenString={tokenString}
                      requesterId={token.id}
                      targetId={friend.id}
                    />
                  </div>
                )}
              </div>
            )
          })
      ) : (
        <h1>Nenhum amigo encontrado</h1>
      )}
    </>
  )
}
