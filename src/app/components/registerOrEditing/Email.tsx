import { ChangeEvent, FocusEvent } from 'react'
import Error from '../Error'

interface Props {
  setEmail: (event: ChangeEvent<HTMLInputElement>) => void
  email: string
  touched?: boolean
  error?: string
  Blur: (e: FocusEvent<HTMLInputElement>) => void
}
export default function Email({
  setEmail,
  email,
  touched,
  error,
  Blur,
}: Props) {
  return (
    <label
      htmlFor="email"
      className="flex flex-col items-center gap-1 relative"
    >
      <span>Email</span>
      <input
        type="text"
        id="email"
        placeholder="Email"
        onChange={setEmail}
        name="email"
        className="p-1 rounded-md w-full"
        value={email}
        onBlur={Blur}
      />
      <Error touched={touched} error={error} />
    </label>
  )
}
