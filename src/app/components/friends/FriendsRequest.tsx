'use client'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
import React, { useEffect, useState } from 'react'
import { ButtonRejectorAcceptReq } from './ButtonRejectorAcceptReq'
import FriendsDropDown from './FriendsDropDown'
import { io } from 'socket.io-client'
import Link from 'next/link'
import { ArrowBigDown, LucideHome, User2 } from 'lucide-react'
import Image from 'next/image'

interface Requester {
  id: number
  name: string
  email: string
  friendRequest: { id: number }
  profilePicture: string
}

interface Requested {
  data: {
    user: {
      id: number
      name: string
      email: string
      requested: Requester[]
      notifications: { id: number; userId: number }[]
    }
  }
}
interface Props {
  token: UserIDJwtPayload | null
  tokenString: string
}

export default function FriendsRequest({ token, tokenString }: Props) {
  const [requesteds, setRequesteds] = useState<[] | Requester[]>([])
  const [notification, setNotification] = useState<number>(0)

  useEffect(() => {
    const socket = io('http://localhost:3001') // Substitua pela URL do seu servidor Socket.IO

    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO')
    })

    socket.on('friendRequest', (data) => {
      console.log('Friend Request Recebido:')
      // Lógica para lidar com notificações de friend request
      if (token && data.targetId === token.id) {
        setNotification(notification + 1)
      }
    })

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.IO')
    })

    return () => {
      socket.disconnect()
    }
  }, [notification, token])

  useEffect(() => {
    async function fetchFriends() {
      if (!token) return null
      const responseUF: Requested = await api.get(`/user/${token.id}`)
      const requesteds = responseUF.data.user.requested || []
      setNotification(responseUF.data.user.notifications.length)
      setRequesteds(requesteds)
    }
    fetchFriends()
  }, [token, notification])
  return (
    <div className="flex justify-between flex-1 bg-gray-500 fixed min-w-full top-0 left-0 h-8 items-center">
      <Link href="/">
        <LucideHome></LucideHome>
      </Link>
      {token ? (
        <nav className="flex gap-4 mr-10">
          <FriendsDropDown
            title={User2}
            notification={notification}
            setNotification={setNotification}
            idToken={token.id}
          >
            {requesteds.map((request) => {
              const { id } = request.friendRequest
              return (
                <div
                  key={request.email}
                  className="hover:bg-gray-600 w-full h-full p-3"
                >
                  <Link
                    href={`/profile/${request.id}`}
                    className="hover:text-gray-800 "
                  >
                    <Image
                      src={request.profilePicture}
                      alt={`Profile of ${request.name}`}
                      width={1080}
                      height={1080}
                      className="w-[40px] h-[40px] rounded-full"
                    ></Image>
                    <pre>{request.name}</pre>
                  </Link>
                  <ButtonRejectorAcceptReq id={id} tokenString={tokenString} />
                </div>
              )
            })}
          </FriendsDropDown>
          <FriendsDropDown title={ArrowBigDown} idToken={token.id}>
            <a
              href="/api/auth/logout"
              className="hover:text-gray-800 hover:bg-gray-600 bg-gray-500 h-12 w-28 flex items-center justify-center"
            >
              Logout
            </a>
            <Link
              href={`/profile/${token.id}`}
              className="hover:text-gray-800 hover:bg-gray-600 bg-gray-500 h-12 w-28 flex items-center justify-center"
            >
              Profile
            </Link>
            <Link
              href={`/profile/${token.id}/editing
              `}
              className="hover:text-gray-800 hover:bg-gray-600 bg-gray-500 h-12 w-28 flex items-center justify-center"
            >
              Edit Profile
            </Link>
          </FriendsDropDown>
        </nav>
      ) : null}
    </div>
  )
}
