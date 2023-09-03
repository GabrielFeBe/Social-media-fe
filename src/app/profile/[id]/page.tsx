import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'

import { cookies } from 'next/headers'
interface User {
  id: number
  email: string
  profilePicture: string
  local: string
  description: string
  name: string
  requested: {
    id: number
    name: string
    email: string
    friendRequest: { id: number }
  }
}

export default async function profile({ params }: { params: { id: string } }) {
  let token: null | UserIDJwtPayload = null
  try {
    token = getUser()
  } catch (err) {
    token = null
  }
  if (!token) {
    return <h1 className="text-5xl">Not Validated</h1>
  }

  if (isNaN(+params.id)) return <h1>Id Must be a number</h1>
  const stringToken = cookies().get('token')?.value
  const response = await api.get(`/user/${params.id}`)
  const user: User = response.data.user
  console.log(user)

  return (
    <main className="grid grid-cols-2">
      <div className="w-[500px]">
        <img src={user.profilePicture} alt="foto" />
        <p>{user.name}</p>
        <span>{user.description}</span>
        <p>{user.local}</p>
      </div>
      <article className="w-full">
        <h1>Time Line</h1>
      </article>
    </main>
  )
}
