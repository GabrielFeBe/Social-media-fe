import PostComments from './Comments'
import { Friends } from './Friend'

interface usersWichLiked {
  userId: number
  user: Friends
}

export interface Posts {
  id?: number
  postTitle: string
  postDescription: string
  postDate?: Date
  isPublic: boolean
  userId: number
  postPicture: string
  user: Friends
  comments: PostComments[]
  usersWichLiked: usersWichLiked[]
}
