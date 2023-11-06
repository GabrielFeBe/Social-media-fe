interface Props {
  setName?: React.Dispatch<React.SetStateAction<string>>
  name?: string
}
export default function Name({ name, setName }: Props) {
  return (
    <label htmlFor="name" className="flex flex-col items-center gap-1">
      <span>Name</span>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => {
          if (setName) setName(e.target.value)
        }}
        placeholder="Name"
        name="nameAndLastname"
        className="p-1 rounded-md w-full"
      />
    </label>
  )
}
