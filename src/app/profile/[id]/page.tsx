import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { cookies } from 'next/headers'
import PostSection from '@/app/components/posts/PostSection'
import Link from 'next/link'
import Image from 'next/image'
dayjs.extend(relativeTime)

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
  const responseU = await api.get(`/user/${params.id}`)
  const user: User = responseU.data.user

  return (
    <main className="grid grid-cols-3 gap-5 min-h-screen bg-gray-400">
      <div className="pt-16 pl-16">
        {/* disable eslint for next line */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={user.profilePicture}
          alt="foto"
          width={1080}
          height={1080}
          className="w-[200px] h-[200px] aspect-video rounded-full"
        />
        <p>{user.name}</p>
        <span>{user.description}</span>
        <p>{user.local}</p>
        <Link
          href={`/friends/${user.id}`}
          className="pt-1 hover:bg-gray-600 rounded-md pb-1 mt-1"
        >
          Friend List
        </Link>
      </div>
      <article className="w-full col-span-2 pt-16">
        <h1 className="text-center">Time Line</h1>
        <PostSection
          token={token}
          tokenString={stringToken as string}
          id={+params.id}
        ></PostSection>
      </article>
    </main>
  )
}
