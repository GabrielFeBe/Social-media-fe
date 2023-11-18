'use client'
import UserFriend from '@/interfaces/Friend'
import { api } from '@/lib/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ButtonFriendRequest } from './ButtonFriendRequest'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { io } from 'socket.io-client'
import ErrorComponent from '../ErrorComponent'
import Image from 'next/image'

interface Props {
  tokenString: string
  token: UserIDJwtPayload
}

export default function PersonMayKnow({ tokenString, token }: Props) {
  const [list, setList] = useState<UserFriend[] | []>([])
  const [update, setUpdate] = useState(false)
  const [friendsError, setFriendsError] = useState(false)

  useEffect(() => {
    const socket = io('http://localhost:3001') // Substitua pela URL do seu servidor Socket.IO

    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO')
    })

    socket.on('friendRequest', (data) => {
      console.log('Friend Request Recebido:')
      // Lógica para lidar com notificações de friend request
      if (data.targetId === token.id) {
        setUpdate(!update)
      }
    })

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.IO')
    })

    return () => {
      socket.disconnect()
    }
  }, [update, token])

  useEffect(() => {
    async function fetchFriendList() {
      try {
        const responseF = await api.get('/friends', {
          headers: {
            Authorization: tokenString,
          },
        })
        const friendsToRequest: UserFriend[] = responseF.data || []
        const toRequest = friendsToRequest.filter((friend) => {
          if (friend.id === token.id) return false
          if (friend.friends.length === 0) return true
          return !friend.friends.some((fr) => fr.id === token.id)
        })
        setList(toRequest)
      } catch (err) {
        setFriendsError(true)
      }
    }
    fetchFriendList()
  }, [token, tokenString, update])

  if (friendsError) {
    return <ErrorComponent errorText="Error connecting to server..." />
  }

  return (
    <div className="overflow-hidden">
      <h2 className=" text-center pb-2">Ppl dat u may know</h2>
      {list.map((person) => {
        return (
          <div
            key={person.email}
            className="m-auto flex items-center justify-center gap-2 w-[250px]"
          >
            <Link href={`/profile/${person.id}`}>
              <Image
                className="h-[50px] w-[50px] rounded-full"
                src={person.profilePicture}
                width={1080}
                height={1080}
                alt={`profile of ${person.name}`}
              ></Image>
            </Link>
            <div className="flex flex-col justify-between items-center w-[140px]">
              <Link
                className="hover:text-gray-900 "
                href={`/profile/${person.id}`}
              >
                {person.name}
              </Link>
              <ButtonFriendRequest
                requesterId={token.id}
                targetId={person.id as number}
                tokenString={tokenString}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
