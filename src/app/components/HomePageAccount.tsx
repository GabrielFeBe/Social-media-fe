import UserFriend from '@/interfaces/Friend'
// import Image from 'next/image'
import Link from 'next/link'

interface Props {
  user: UserFriend | null
}
export default function HomePageAccount({ user }: Props) {
  return (
    <div>
      {/* Profile */}
      {/* <Image src={ user} /> */}
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
    </div>
  )
}
