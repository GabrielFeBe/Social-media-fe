import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import dayjs from 'dayjs'

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
        {posts.map((post) => {
          return (
            <div key={post.id}>
              {/* aqui virá o perfil antes da postagem acho que vou componentizar isso já que devo usar para postagens externas também */}
              {/* Tenho que colocar uma rota para update de imagens nos posts */}
              <h3>{post.postTitle}</h3>
              {/* Colocar dayjs aqui */}
              <span>{dayjs(post.postDate).format('MMMM D, YYYY h:mm A')}</span>
              <p>{post.postDescription}</p>
              {/* aqui virá a imagem */}
            </div>
          )
        })}
      </article>
    </main>
  )
}
