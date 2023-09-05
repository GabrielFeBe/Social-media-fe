import PostComments from './Comments'
import { Friends } from './Friend'

export interface Posts {
  id?: number
  postTitle: string
  postDescription: string
  postDate?: Date
  isPublic: boolean
  userId: number
  user: Friends
  comments: PostComments[]
}
