'use server'
import UserFriend from '@/interfaces/Friend'
import { Posts } from '@/interfaces/Posts'
import { api } from '@/lib/api'
import { UserIDJwtPayload } from 'jsonwebtoken'
// import Image from 'next/image'
import Link from 'next/link'
import { ButtonFriendRequest } from './ButtonFriendRequest'
import Comment from './Comment'

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
  console.log(user)
  const responseP = await api.get('/posts', {
    headers: {
      Authorization: tokenString,
    },
  })
  const posts: Posts[] = responseP.data || []
  const responseF = await api.get('/friends', {
    headers: {
      Authorization: tokenString,
    },
  })
  const friendsToRequest: UserFriend[] = responseF.data || []
  console.log(posts[0].comments)
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
        {posts.map((post) => {
          return (
            <div key={post.id} className="border border-red-600">
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
              {/* Comments */}
              {post.comments.map((comment) => {
                return (
                  <div key={comment.comment}>
                    {/* eslint-disable-next-line */}
                    <img
                      src={comment.user.profilePicture}
                      alt="Pesssoa que comentou"
                    />
                    <h3>{comment.user.name}</h3>
                    <span>{comment.comment}</span>
                  </div>
                )
              })}
              <Comment
                id={post.id as number}
                tokenString={tokenString}
                userId={user.id as number}
              ></Comment>
            </div>
          )
        })}
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
