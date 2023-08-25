import UserFriend from '@/interfaces/Friend'
import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'
import HomePageAccount from './components/HomePageAccount'
import LoginHome from './components/LoginHome'

export default async function Home() {
  let token: null | UserIDJwtPayload = null
  let data: UserFriend | null = null
  try {
    token = getUser()
    const response = await api.get(`/friends/${token.id}`)
    data = response.data
  } catch (err) {
    token = null
  }

  return (
    <main className="min-h-screen w-full flex flex-1 bg-gray-400 justify-center items-baseline">
      {token ? <HomePageAccount user={data} /> : <LoginHome />}
    </main>
  )
}
