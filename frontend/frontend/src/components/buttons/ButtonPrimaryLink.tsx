import { Link } from "react-router-dom";
import ButtonPrimary, { Props as ButtonMainProps } from "./ButtonPrimary";


type Props = ButtonMainProps & { href: string }

export default function ButtonPrimaryLink({ children, onClick, href, className = "", disabled = false }: Props) {
  return (
    <Link to={href}>
      <ButtonPrimary
      onClick={onClick}
      className={className}
      disabled={disabled}
      >
        { children }
      </ButtonPrimary>
    </Link>
  )
}
