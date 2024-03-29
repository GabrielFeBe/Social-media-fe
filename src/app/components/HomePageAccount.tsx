import { UserIDJwtPayload } from 'jsonwebtoken'
// import Image from 'next/image'
import PostSection from './posts/PostSection'
import PersonMayKnow from './friends/PersonMayKnow'
import ProfileAside from './profile/ProfileAside'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default function HomePageAccount({ token, tokenString }: Props) {
  return (
    <div className="grid grid-cols-3  overflow-hidden">
      <aside className="relativ items-start justify-between overflow-hidden px-28 py-16 h-full ">
        <ProfileAside token={token} tokenString={tokenString} />
      </aside>

      {/* posts */}
      <section className="max-h-screen overflow-y-scroll py-16 scrollbar-custom">
        <PostSection token={token} tokenString={tokenString} />
      </section>
      <aside className="overflow-hidden py-16">
        <PersonMayKnow token={token} tokenString={tokenString}></PersonMayKnow>
      </aside>
    </div>
  )
}
