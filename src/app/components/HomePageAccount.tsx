'use server'
import { UserIDJwtPayload } from 'jsonwebtoken'
// import Image from 'next/image'
import PostSection from './PostSection'
import PersonMayKnow from './PersonMayKnow'
import ProfileAside from './ProfileAside'

interface Props {
  token: UserIDJwtPayload
  tokenString: string
}

export default async function HomePageAccount({ token, tokenString }: Props) {
  return (
    <div className="grid grid-cols-3 min-h-screen">
      <aside className="relativ items-start justify-between overflow-hidden px-28 py-16">
        {/* Profile */}
        {/* <Image src={ user}
       alt=""
       width={200}
       height={200}
      /> */}

        {/* @ts-expect-error next new feature */}
        <ProfileAside token={token} tokenString={tokenString} />
      </aside>

      {/* posts */}
      <section className="max-h-screen overflow-y-scroll">
        <PostSection token={token} tokenString={tokenString} />
      </section>
      <aside className="overflow-hidden">
        <PersonMayKnow token={token} tokenString={tokenString}></PersonMayKnow>
      </aside>
    </div>
  )
}
