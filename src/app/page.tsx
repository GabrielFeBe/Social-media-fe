import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import FriendsRequest from './components/FriendsRequest'
import HomePageAccount from './components/HomePageAccount'
import LoginHome from './components/LoginHome'
import { cookies } from 'next/headers'

export default async function Home() {
  let token: null | UserIDJwtPayload = null
  try {
    token = getUser()
  } catch (err) {
    token = null
  }
  const stringToken = cookies().get('token')?.value
  return (
    <>
      <header>
        {/* @ts-expect-error next new feature */}
        {token ? <FriendsRequest token={token} /> : null}
      </header>
      <main className="min-h-screen w-full flex flex-1 bg-gray-400 justify-center items-baseline">
        {token ? (
          // @ts-expect-error next new feature
          <HomePageAccount token={token} tokenString={stringToken} />
        ) : (
          <LoginHome />
        )}
      </main>
    </>
  )
}
