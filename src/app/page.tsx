import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import FriendsRequest from './components/FriendsRequest'
import HomePageAccount from './components/HomePageAccount'
import LoginHome from './components/LoginHome'

export default async function Home() {
  let token: null | UserIDJwtPayload = null
  try {
    token = getUser()
  } catch (err) {
    token = null
  }

  return (
    <>
      <header>
        {/* @ts-expect-error next new feature */}
        {token ? <FriendsRequest token={token} /> : null}
      </header>
      <main className="min-h-screen w-full flex flex-1 bg-gray-400 justify-center items-baseline">
        {/* @ts-expect-error next new feature */}
        {token ? <HomePageAccount token={token} /> : <LoginHome />}
      </main>
    </>
  )
}
