interface Props {
  setEmail?: React.Dispatch<React.SetStateAction<string>>
  email?: string
}
export default function Email({ setEmail, email }: Props) {
  return (
    <label htmlFor="email" className="flex flex-col items-center gap-1">
      <span>Email</span>
      <input
        type="text"
        id="email"
        placeholder="Email"
        onChange={(e) => {
          if (setEmail) setEmail(e.target.value)
        }}
        name="email"
        className="p-1 rounded-md w-full"
        value={email}
      />
    </label>
  )
}
