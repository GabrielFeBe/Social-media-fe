'use client'
import { useMyContext } from '@/context/Profile.context'
import UserFriend, { Friends } from '@/interfaces/Friend'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ButtonFriendRequest } from './ButtonFriendRequest'

interface Props {
  friends: Friends[]
  tokenString: string
  token: UserIDJwtPayload
}
export default function Friends({ friends, tokenString, token }: Props) {
  const { addData, data } = useMyContext()
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
    if (data === null) {
      fetchUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(friends)
  const user = data
  if (!user) return <></>
  const friendsId = user.friends.map((friend) => friend.id)
  const set = new Set(friendsId)

  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => {
          return (
            <div key={friend.id} className="flex gap-2 h-24">
              {/* <img
                src="nothing.jpg"
                alt=""
                className="w-[20px] h-[20px] rounded-full"
              /> */}
              <div>
                <Link href={`/profile/${friend.id}`}>{friend.name}</Link>
              </div>
              {friend.id === token.id ? (
                <div className="bg-green-500 rounded-md p-1">You</div>
              ) : set.has(friend.id) ? (
                <div className="bg-green-500 rounded-md p-1">Friend</div>
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
