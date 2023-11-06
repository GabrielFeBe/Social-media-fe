interface Props {
  // make a type for a setDescription it's a React Hook
  setDescription?: React.Dispatch<React.SetStateAction<string>>
  description?: string
}
export default function Description({ setDescription, description }: Props) {
  return (
    <textarea
      name="description"
      id=""
      onChange={(e) => {
        if (setDescription) setDescription(e.target.value)
      }}
      value={description}
      className="resize-none h-[88px] rounded-md"
      placeholder="Put here a description about yourself, things you like to do, places you like to be and etc..."
    ></textarea>
  )
}
