'use client'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
import React, { useEffect, useState } from 'react'
import { ButtonRejectorAcceptReq } from './ButtonRejectorAcceptReq'
import FriendsDropDown from './FriendsDropDown'
import { io } from 'socket.io-client'
import Link from 'next/link'

interface Requester {
  id: number
  name: string
  email: string
  friendRequest: { id: number }
}

interface Requested {
  data: {
    user: {
      id: number
      name: string
      email: string
      requested: Requester[]
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
      console.log('Friend Request Recebido:', data)
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
      setRequesteds(requesteds)
    }
    fetchFriends()
  }, [token, notification])
  return (
    <div className="flex justify-between flex-1 bg-red-500 fixed min-w-full top-0 left-0">
      <Link href="/">Home</Link>
      {token ? (
        <nav className="flex gap-4 mr-10">
          <FriendsDropDown
            title="Friends"
            notification={notification}
            setNotification={setNotification}
          >
            {requesteds.map((request) => {
              const { id } = request.friendRequest
              return (
                <div key={request.email}>
                  <p>{request.name}</p>
                  <ButtonRejectorAcceptReq id={id} tokenString={tokenString} />
                </div>
              )
            })}
          </FriendsDropDown>
          <FriendsDropDown title="Info">
            <a href="/api/auth/logout">Logout</a>
          </FriendsDropDown>
        </nav>
      ) : null}
    </div>
  )
}
