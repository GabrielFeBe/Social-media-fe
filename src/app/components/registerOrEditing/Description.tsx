import { ChangeEvent, FocusEvent } from 'react'

interface Props {
  setDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void
  description: string
  error?: string
  touched?: boolean
  Blur: (e: FocusEvent<HTMLTextAreaElement>) => void
}
export default function Description({
  setDescription,
  description,
  touched,
  error,
  Blur,
}: Props) {
  return (
    <div className="relative w-[314px]">
      <textarea
        name="description"
        id=""
        onChange={setDescription}
        value={description}
        className="resize-none h-[88px] rounded-md relative w-full"
        placeholder="Put here a description about yourself, things you like to do, places you like to be and etc..."
        onBlur={Blur}
      ></textarea>
      {error && touched && (
        <span className="text-red-500 absolute bottom-[-14px] left-0">
          {error}
        </span>
      )}
    </div>
  )
}
