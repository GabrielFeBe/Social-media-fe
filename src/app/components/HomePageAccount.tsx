'use server'
import UserFriend from '@/interfaces/Friend'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
// import Image from 'next/image'
import Link from 'next/link'
import { ButtonFriendRequest } from './ButtonFriendRequest'
import PostSection from './PostSection'

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

  const responseF = await api.get('/friends', {
    headers: {
      Authorization: tokenString,
    },
  })
  const friendsToRequest: UserFriend[] = responseF.data || []
  const toRequest = friendsToRequest.filter((friend) => {
    if (friend.id === token.id) return false

    if (friend.friends.length === 0) return true
    return !friend.friends.some((fr) => fr.id === token.id)
  })
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
        <h2>Ppl dat u may know</h2>
        {toRequest.map((person) => {
          return (
            <>
              <Link href={`/profile/${person.id}`}>{person.name}</Link>
              <ButtonFriendRequest
                requesterId={token.id}
                targetId={person.id as number}
                tokenString={tokenString}
              />
            </>
          )
        })}
      </aside>
    </div>
  )
}
