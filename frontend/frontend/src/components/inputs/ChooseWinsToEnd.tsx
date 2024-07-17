import { RoomSettings } from "../../types"
import ControlledInput from "./ControlledInput"


type Props = {
  onChange: Function,
  roomSettings: RoomSettings
}

export default function ChooseWinsToEnd({ onChange, roomSettings }: Props) {
  return (
    <>
      <div>wins to end game</div>
      <div>max - 99</div>
      <ControlledInput
      type="number" 
      value={roomSettings.winsToEnd}
      inputError={roomSettings.inputError}
      onChange={
        (e: React.ChangeEvent<HTMLInputElement>) => onChange(e)
      }
      maxLength={2}
      />
    </>
  )
}
