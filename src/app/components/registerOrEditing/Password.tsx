interface Props {
  setPassword?: React.Dispatch<React.SetStateAction<string | undefined>>
  password?: string | undefined
}

export default function Password({ setPassword, password }: Props) {
  return (
    <label htmlFor="password" className="flex flex-col items-center gap-1">
      <span>Password</span>
      <input
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => {
          if (setPassword) setPassword(e.target.value)
        }}
        className="p-1 rounded-md w-full"
      />
    </label>
  )
}
