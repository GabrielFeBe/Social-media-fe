import { ChangeEvent, FocusEvent } from 'react'
import Error from '../Error'

interface Props {
  setLocal: (event: ChangeEvent<HTMLInputElement>) => void
  local: string
  error?: string
  touched?: boolean
  Blur: (e: FocusEvent<HTMLInputElement>) => void
}

export default function Local({
  setLocal,
  local,
  touched,
  error,
  Blur,
}: Props) {
  return (
    <label
      htmlFor="local"
      className="flex flex-col items-center gap-1 relative"
    >
      <span>Local</span>
      <input
        type="text"
        id="local"
        value={local}
        onChange={setLocal}
        placeholder="Place that you live"
        name="local"
        className="p-1 rounded-md w-full"
        onBlur={Blur}
      />
      <Error touched={touched} error={error} />
    </label>
  )
}
