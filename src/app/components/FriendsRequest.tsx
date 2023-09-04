import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
import React from 'react'
import { ButtonRejectorAcceptReq } from './ButtonRejectorAcceptReq'
import FriendsDropDown from './FriendsDropDown'

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
  token: UserIDJwtPayload
  tokenString: string
}

export default async function FriendsRequest({ token, tokenString }: Props) {
  const responseUF: Requested = await api.get(`/user/${token.id}`)
  const requesteds = responseUF.data.user.requested || []
  return (
    <nav className="flex justify-end gap-4 mr-10">
      <FriendsDropDown title="Friends">
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
  )
}
