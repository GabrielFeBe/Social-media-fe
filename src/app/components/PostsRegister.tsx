import React, { useState } from 'react'
import { SingleImageDropzone } from './MeadiaPicker'
import { UserIDJwtPayload } from 'jsonwebtoken'

interface Props {
  token: UserIDJwtPayload
}

export default function PostsRegister({ token }: Props) {
  const [file, setFile] = useState<File>()
  return (
    <>
      <input type="text" placeholder="Post Title" className="rounded-md" />
      <textarea
        name=""
        className="w-full h-48 rounded-md  pl-2 bg-inherit border-0 text-black placeholder:text-black resize-none"
        placeholder="Put your text here"
      ></textarea>
      <input type="checkbox" />
      <SingleImageDropzone
        width={400}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file)
        }}
        className="text-blacks"
      ></SingleImageDropzone>
      <button></button>
    </>
  )
}
