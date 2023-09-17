'use server'
import UserFriend from '@/interfaces/Friend'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
// import Image from 'next/image'
import Link from 'next/link'
import PostSection from './PostSection'
import PersonMayKnow from './PersonMayKnow'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default async function HomePageAccount({ token, tokenString }: Props) {
  const responseU = await api.get(`/friends/${token.id}`, {
    headers: {
      Authorization: tokenString,
    },
  })
  const user: UserFriend = responseU.data

  return (
    <div className="grid grid-cols-3">
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
      <section>
        <PostSection token={token} tokenString={tokenString} />
      </section>
      <aside>
        <PersonMayKnow token={token} tokenString={tokenString}></PersonMayKnow>
      </aside>
    </div>
  )
}
