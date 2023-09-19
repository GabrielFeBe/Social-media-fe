import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { cookies } from 'next/headers'
import PostSection from '@/app/components/PostSection'
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
interface Posts {
  id: number
  userId: number
  postTitle: string
  postDescription: string
  isPublic: true
  postDate: Date
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
  const responseP = await api.get(`/posts/user/${params.id}`, {
    headers: {
      Authorization: stringToken,
    },
  })
  const posts: Posts[] = responseP.data
  const user: User = responseU.data.user

  return (
    <main className="grid grid-cols-3 gap-5 min-h-screen bg-gray-400">
      <div className="pt-16">
        <img
          src={user.profilePicture}
          alt="foto"
          className="w-[200px] h-[200px] aspect-video rounded-full"
        />
        <p>{user.name}</p>
        <span>{user.description}</span>
        <p>{user.local}</p>
      </div>
      <article className="w-full col-span-2 pt-16">
        <h1>Time Line</h1>
        <PostSection
          token={token}
          tokenString={stringToken as string}
          id={+params.id}
        ></PostSection>
      </article>
    </main>
  )
}
