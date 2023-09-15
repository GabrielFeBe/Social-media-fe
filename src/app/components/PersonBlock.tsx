import React from 'react'

interface Props {
  image: string
  name: string
  timePost: Date
}
export default function PersonBlock({ image, name }: Props) {
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
          {' '}
          {'5h'}
        </span>
      </div>
    </div>
  )
}
