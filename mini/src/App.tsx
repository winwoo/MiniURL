import { ChangeEvent, useCallback, useState, useRef,useEffect } from 'react';
import classNames from 'classnames';
import css from "./main.module.scss";
import CommonButton from './component/CommonButton';
import axios from 'axios';
import {CopyToClipboard} from "react-copy-to-clipboard";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [updateValue, setUpdateValue] = useState<string>("");
  const autoFocusingRef = useRef<HTMLInputElement>(null);
  const textCopyRef = useRef<HTMLInputElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  /**
   * input의 입력값
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * 페이지 초기 랜더링시 input focus
   */
  useEffect(() => {
    autoFocusingRef.current?.focus();
  }, []);

  /**
   * 데이터 변환 작업
   * @return url 주소값
   */
  const handleChangeURL = useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/changeUrl", {
      //응답을 처리하는 부분
      config,
      url: inputValue,
    });
    setUpdateValue(data.url);
    console.log(data);
  }, [inputValue]);

  /**
   * 복사버튼 클릭시 copy
   */
  const handleCopyUrlBtn = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  /**
   * url 입력 input창
   */
  const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log("value", inputValue);
      }
  },[inputValue]);

  return (
    <div className={css.wrapper}>
      <main
        className={classNames(css.main, "flex justify-center text-center p-24")}
      >
        <article
          className={classNames(css.inner, "flex flex-col justify-center")}
        >
          <h1>
            <a href="/">shorts URL</a>
          </h1>
          <h2 className="sm:text-[2.5rem] mx-0 mb-0 lg:text-[3.75rem] text-[1.5rem] m-12 ">
            단축 URL 링크 주소 줄이기{" "}
          </h2>
          <h3 className="sm:text-[1.5rem] mx-0 lg:text-[1.8rem] text-[1rem] m-12">
            길고 복잡한 링크 주소를 짧게 줄이는 단축 URL 서비스
          </h3>
          <div
            className={classNames(css.formWrap, "flex flex-col justify-center")}
          >
            <form className={classNames("flex justify-center mb-5")}>
              <fieldset className={css.inputContainer}>
                <label className="a11y">URL을 입력하세요.</label>
                <input
                  id="commonInput"
                  className={css.urlInput}
                  type="text"
                  name=""
                  ref={autoFocusingRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="입력하세요"
                  onKeyDown={handleOnKeyDown}
                />
              </fieldset>
              <CommonButton onClick={handleChangeURL}>단축</CommonButton>
            </form>

            <form className={classNames("flex justify-center")}>
              <fieldset className={css.inputContainer}>
                <label className="a11y">단축된 URL</label>
                <input
                  id="commonInput"
                  className={css.urlInput}
                  type="text"
                  name=""
                  value={updateValue}
                  ref={textCopyRef}
                  readOnly
                />
              </fieldset>
              <CopyToClipboard text={updateValue} onCopy={handleCopyUrlBtn}>
                <CommonButton>복사</CommonButton>
              </CopyToClipboard>
            </form>
            {isShow && (
              <p className={classNames(css.copyText, "text-[1rem] mt-3")}>
                링크가 복사되었습니다.😘
              </p>
            )}
          </div>
        </article>
      </main>
      <div className={css.backgroundEffect}>
        <div className={css.square}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default App;