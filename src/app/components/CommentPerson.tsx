import React from 'react'
import Link from 'next/link'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)

interface Props {
  image: string
  name: string
  comment: string
  timePost: Date
  id: number
}
export default function CommentPerson({
  image,
  name,
  comment,
  timePost,
  id,
}: Props) {
  return (
    <div className="flex gap-2 m-3">
      <Link href={`/profile/${id}`} className="rounded-full border-none">
        <img
          src={image}
          alt=""
          className="w-[32px] h-[32px] rounded-full border-none"
        />
      </Link>
      <div className="flex flex-col ">
        <div className="flex flex-col rounded-3xl bg-neutral-700 p-3">
          <Link
            href={`/profile/${id}`}
            className="font-bold text-xs h-[19px] text-gray-800"
          >
            {name}
          </Link>
          <span className="font-light text-xs leading-5 text-gray-50">
            {comment}
          </span>
        </div>
        <ul>
          <li className="text-xs font-light pl-3 pt-1">
            {`${dayjs().from(dayjs(timePost), true)} ago`}
          </li>
        </ul>
      </div>
    </div>
  )
}
