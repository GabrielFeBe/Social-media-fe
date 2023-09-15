import React from 'react'

interface Props {
  image: string
  name: string
  comment: string
  timePost: Date
}
export default function PersonBlock({ image, name, comment }: Props) {
  return (
    <div className="flex mb-5 gap-2 m-3">
      <a className="rounded-full border-none">
        <img
          src={image}
          alt=""
          className="w-[32px] h-[32px] rounded-full border-none"
        />
      </a>
      <div className="flex flex-col flex-1 rounded-full bg-neutral-700">
        <span className="font-bold text-xs h-[19px] text-gray-800">{name}</span>
        <span className="font-light text-xs leading-5 text-gray-600">
          {comment}
        </span>
      </div>
    </div>
  )
}
