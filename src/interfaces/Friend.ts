export interface Friends {
  id: number
  name: string
  email: string
  profilePicture: string
  FriendRequest: {
    status: boolean
  }
}

export default interface UserFriend {
  id?: number
  email: string
  name: string
  description: string
  profilePicture: string
  local: string
  token?: string
  friends: Friends[]
}

export interface User {
  id?: number
  email: string
  name: string
  description: string
  profilePicture: string
  local: string
}
