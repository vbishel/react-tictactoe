import { Link } from "react-router-dom";
import ButtonMain, { Props as ButtonMainProps } from "./ButtonMain";

type Props = ButtonMainProps & { href: string }

export default function ButtonMainLink({ children, onClick, href, className = "", disabled = false }: Props) {
  return (
    <Link to={href}>
      <ButtonMain
      onClick={onClick}
      className={className}
      disabled={disabled}
      >
        { children }
      </ButtonMain>
    </Link>
  )
}
