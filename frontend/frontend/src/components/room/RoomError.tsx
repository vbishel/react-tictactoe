import PageContainer from "../PageContainer";
import ButtonPrimaryLink from "../buttons/ButtonPrimaryLink";


type Props = {
  text: string,
}


export default function RoomError({ text }: Props) {
  return (
    <PageContainer>
      { text }
      <ButtonPrimaryLink href="/" className="mt-6">
        BACK
      </ButtonPrimaryLink>
    </PageContainer>
  )
}
