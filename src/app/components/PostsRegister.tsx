import React, { FormEvent, useState } from 'react'
import { SingleImageDropzone } from './MeadiaPicker'
import { UserIDJwtPayload } from 'jsonwebtoken'
import { useEdgeStore } from '@/lib/edgestore'
import { api } from '@/lib/api'

interface Props {
  token: UserIDJwtPayload
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  update: boolean
  tokenString: string
}

export default function PostsRegister({
  token,
  setUpdate,
  update,
  tokenString,
}: Props) {
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()
  async function postCreation(event: FormEvent<HTMLFormElement>) {
    let imageString = ''
    event.preventDefault()
    const makeForm = new FormData(event.currentTarget)
    if (file) {
      const resImg = await edgestore.publicFiles.upload({
        file,
        options: {},
      })
      imageString = resImg.url
    }
    await api.post(
      '/posts',
      {
        postTitle: makeForm.get('title'),
        postDescription: makeForm.get('description'),
        isPublic: !!makeForm.get('isPublic'),
        userId: token.id,
        postPicture: imageString,
      },
      {
        headers: {
          Authorization: tokenString,
        },
      },
    )

    setUpdate(!update)
    // clean all the states in this component
  }
  return (
    <form onSubmit={postCreation}>
      <input
        type="text"
        placeholder="Post Title"
        className="rounded-md"
        name="title"
      />
      <textarea
        name="description"
        className="w-full h-28 rounded-md  pl-2 bg-inherit border-0 text-black placeholder:text-black resize-none"
        placeholder="Put your text here"
      ></textarea>
      <input type="checkbox" name="isPublic" />
      <SingleImageDropzone
        width={400}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file)
        }}
        className="text-blacks"
      ></SingleImageDropzone>
      <button
        className="bg-slate-950 hover:bg-slate-800 transition-all duration-500 text-gray-500 rounded-md p-1"
        type="submit"
      >
        Postar
      </button>
    </form>
  )
}
