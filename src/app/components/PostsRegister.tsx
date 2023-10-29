import { Camera } from 'lucide-react'
import React, { useState } from 'react'
import MediaPicker from './MeadiaPicker'

export default function PostsRegister() {
  const [file, setFile] = useState<File>()
  return (
    <>
      <label
        htmlFor="media"
        className="flex cursor-pointer items-center gap-1.5 text-sm "
      >
        <Camera className="h-4 w-4"></Camera>
        Anexar mídia
      </label>

      <MediaPicker setFile={setFile} />
    </>
  )
}
