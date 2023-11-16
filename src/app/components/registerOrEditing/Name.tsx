import { ChangeEvent, FocusEvent } from 'react'
import Error from '../Error'

interface Props {
  setName: (event: ChangeEvent<HTMLInputElement>) => void
  name: string
  touched?: boolean
  error?: string
  Blur: (e: FocusEvent<HTMLInputElement>) => void
}
export default function Name({ name, setName, touched, error, Blur }: Props) {
  return (
    <label htmlFor="name" className="flex flex-col items-center gap-1 relative">
      <span>Name</span>
      <input
        id="name"
        type="text"
        value={name}
        onChange={setName}
        placeholder="Name"
        name="name"
        className="p-1 rounded-md w-full"
        onBlur={Blur}
      />
      <Error touched={touched} error={error} />
    </label>
  )
}
