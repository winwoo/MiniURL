import classNames from 'classnames';
import css from "../main.module.scss";
import { ReactNode} from 'react';


/**
 * @param children
 * 조건에 따른 텍스트 변경 문구
 */
interface copyTxtProps {
  children : ReactNode;
}
export default function CopyText({children} : copyTxtProps) {
  return (
    <>
      {
        children ?
        <p className={classNames(css.copyText, "text-[1rem] mt-3")}>{children}</p> :
        <p className={classNames(css.empty, "text-[1rem] mt-3")}></p>
      }
    </>
  );
}
