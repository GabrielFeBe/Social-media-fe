import UserFriend from './Friend'

export default interface PostComments {
  id: number
  postId: number
  comment: string
  userId: number
  commentDate: Date
  user: Omit<UserFriend, 'friends'>
}
