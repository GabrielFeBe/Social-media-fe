import React from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import UserFriend from '@/interfaces/Friend'
import { UserIDJwtPayload } from 'jsonwebtoken'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default async function ProfileAside({ token, tokenString }: Props) {
  const responseU = await api.get(`/friends/${token.id}`, {
    headers: {
      Authorization: tokenString,
    },
  })
  const user: UserFriend = responseU.data

  return (
    <div className="overflow-hidden">
      <div className="flex gap-3 justify-center">
        <img
          src={user.profilePicture}
          alt={`Profile of ${user.name}`}
          className="w-[200px] h-[200px] aspect-video rounded-full"
        />
        <h3 className="self-center font-bold text-xl hover:bg-gray-600 rounded-md p-2">
          <Link href={`/profile/${user.id}`}>{user?.name}</Link>
        </h3>
      </div>
      <p>{user?.description}</p>
      <p>{user?.local}</p>
      <Link href={`/friends/${user.id}}`}>Friend List</Link>
      {/* {user?.friends.map((friend) => { */}
      {/* return ( */}
      {/* <> */}
      {/* <Link href={`/profile/${friend.id}`}>{friend.name}</Link> */}
      {/* <Image
              src={friend.profilePicture}
              alt=""
              width={200}
              height={200}
            /> */}
      {/* </> */}
      {/* ) */}
      {/* })} */}
    </div>
  )
}
