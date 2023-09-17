import React from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)

interface Props {
  image: string
  name: string
  timePost: Date
}
export default function PersonBlock({ image, name, timePost }: Props) {
  return (
    <div className="flex mb-5 gap-2 m-3">
      <a className="rounded-full border-none">
        <img
          src={image}
          alt=""
          className="w-[40px] h-[40px] rounded-full border-none"
        />
      </a>
      <div className="flex flex-col flex-1">
        <h4>
          <span className="font-bold text-xs h-[19px] text-gray-800">
            {name}
          </span>
        </h4>
        <span className="font-light text-xs leading-5 text-gray-600">
          {`${dayjs().from(dayjs(timePost), true)} ago`}
        </span>
      </div>
    </div>
  )
}
