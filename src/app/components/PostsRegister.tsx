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
    // clean the form
    event.currentTarget.reset()
    // then reset the file state, and update the component
    setFile(undefined)
    setUpdate(!update)
  }
  return (
    <form onSubmit={postCreation} className="mb-10">
      <input
        type="text"
        placeholder="Post Title"
        className="rounded-md  pl-2 bg-inherit border-0 text-black placeholder:text-black"
        name="title"
      />
      <textarea
        name="description"
        className="text-lg w-full flex-1 resize-none rounded border-0 bg-transparent p-0 leading-relaxed text-black placeholder:text-black focus:ring-0"
        placeholder="Put your text here"
      ></textarea>
      <div className="flex gap-2 flex-wrap items-center">
        <label htmlFor="isPublic">
          Is public
          <input type="checkbox" id="isPublic" name="isPublic" />
        </label>
        <SingleImageDropzone
          width={400}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file)
          }}
          className="bg-black"
        ></SingleImageDropzone>
        <button
          className="bg-slate-950 hover:bg-slate-800 transition-all duration-500 text-gray-500 rounded-md p-1 w-20 h-8"
          type="submit"
        >
          Postar
        </button>
      </div>
    </form>
  )
}
