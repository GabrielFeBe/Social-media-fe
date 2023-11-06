interface Props {
  setLocal?: React.Dispatch<React.SetStateAction<string>>
  local?: string
}

export default function Local({ setLocal, local }: Props) {
  return (
    <label htmlFor="local" className="flex flex-col items-center gap-1">
      <span>Local</span>
      <input
        type="text"
        id="local"
        value={local}
        onChange={(e) => {
          if (setLocal) setLocal(e.target.value)
        }}
        placeholder="Place that you live"
        name="local"
        className="p-1 rounded-md w-full"
      />
    </label>
  )
}
