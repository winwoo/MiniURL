import classNames from 'classnames';
import css from "../main.module.scss";
import { ReactNode } from 'react';

/**
 * @param name 버튼 이름
 * @param onClick 클릭시 버튼의 기능
 */
interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function CommonButton({onClick, children} : ButtonProps) {
  return (
    <button
      id="btn"
      className={classNames(css.shortBtn, "sm:text-[1.1rem] lg:text-[1.2rem] text-[1rem] ml-5")}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}