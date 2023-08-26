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
}

export default async function FriendsRequest({ token }: Props) {
  const responseUF: Requested = await api.get(`/user/${token.id}`)
  const requesteds = responseUF.data.user.requested || []
  return (
    <nav>
      <FriendsDropDown>
        {requesteds.map((request) => {
          const { id } = request.friendRequest
          return (
            <div key={request.email}>
              <p>{request.name}</p>
              <ButtonRejectorAcceptReq id={id} />
            </div>
          )
        })}
      </FriendsDropDown>
    </nav>
  )
}
