'use server'
import UserFriend from '@/interfaces/Friend'
import { Posts } from '@/interfaces/Posts'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
// import Image from 'next/image'
import Link from 'next/link'

interface Props {
  token: UserIDJwtPayload
}
export default async function HomePageAccount({ token }: Props) {
  const responseU = await api.get(`/friends/${token.id}`)
  const user: UserFriend = responseU.data
  const responseP = await api.get('/posts')
  const posts: Posts[] = responseP.data || []
  return (
    <div className="grid grid-cols-2">
      <aside>
        {/* Profile */}
        {/* <Image src={ user}
       alt=""
       width={200}
       height={200}
      /> */}
        <h3>{user?.name}</h3>
        <p>{user?.description}</p>
        <p>{user?.local}</p>
        {user?.friends.map((friend) => {
          return (
            <>
              <Link href={`/profile/${friend.id}`}>{friend.name}</Link>
              {/* <Image
              src={friend.profilePicture}
              alt=""
              width={200}
              height={200}
            /> */}
            </>
          )
        })}
      </aside>

      {/* posts */}
      {posts.map((post) => {
        return (
          <div key={post.id}>
            {/* person profile */}
            <div>
              {/* prof picture */}
              {/* name */}
              <Link href={`/profile/${post.user.id}`}>{post.user.name}</Link>
            </div>
            {/* actual post */}
            <div>
              <h3>{post.postTitle}</h3>
              <p>{post.postDescription}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
