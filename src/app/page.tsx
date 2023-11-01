import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import HomePageAccount from './components/HomePageAccount'
import LoginHome from './components/profile/LoginHome'
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
      <main className="w-full bg-gray-400 min-h-screen">
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
