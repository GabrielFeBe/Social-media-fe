import { ChangeEvent, FocusEvent } from 'react'
import Error from '../Error'

interface Props {
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void
  password: string | undefined
  error?: string
  touched?: boolean
  Blur: (e: FocusEvent<HTMLInputElement>) => void
}

export default function Password({
  setPassword,
  password,
  error,
  touched,
  Blur,
}: Props) {
  return (
    <label
      htmlFor="password"
      className="flex flex-col items-center gap-1 relative"
    >
      <span>Password</span>
      <input
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value={password}
        onChange={setPassword}
        className="p-1 rounded-md w-full"
        onBlur={Blur}
      />
      <Error touched={touched} error={error} />
    </label>
  )
}
