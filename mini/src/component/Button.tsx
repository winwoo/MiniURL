import classNames from 'classnames';
import css from "../main.module.scss";

/**
 * @param name 버튼 이름
 * @param onClick 클릭시 버튼의 기능
 */
interface ButtonProps {
  name: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({name, onClick} : ButtonProps) {
  return (
    <button
      id="btn"
      className={classNames(css.shortBtn, "ml-5")}
      type="button"
      onClick={onClick}
    >
      {name}
    </button>
  );
}