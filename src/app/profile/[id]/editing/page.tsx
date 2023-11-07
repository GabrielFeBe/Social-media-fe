import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
// import Link from 'next/link'
import { UserById } from '@/interfaces/Friend'
import ClientSideEditing from '@/app/components/registerOrEditing/ClientSideEdit'

export default async function profileEdit({
  params,
}: {
  params: { id: string }
}) {
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
  const responseU = await api.get(`/user/${params.id}`)
  const user: UserById = responseU.data.user

  return (
    <main className=" min-h-screen bg-gray-400 w-full flex items-center justify-center flex-col">
      <ClientSideEditing user={user} stringToken={stringToken as string} />
    </main>
  )
}
