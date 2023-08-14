import { ChangeEvent, useCallback, useState, useRef,useEffect } from 'react';
import classNames from 'classnames';
import css from "./main.module.scss";
import CommonButton from './component/CommonButton';
import axios from 'axios';
import {CopyToClipboard} from "react-copy-to-clipboard";
import CopyText from './component/CopyText';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [updateValue, setUpdateValue] = useState<string>("");
  const autoFocusingRef = useRef<HTMLInputElement>(null);
  const textCopyRef = useRef<HTMLInputElement>(null);
  const [isInputShow, setIsInputShow] = useState<boolean>(false);
  const [copyTextMsg , setCopyTextMsg] = useState<string>("");

  /**
   * input의 입력값
   */
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>)=> {
    setInputValue(event.target.value);
  }, []);

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
    const expUrl = /^http[s]?:\/\//i;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //유효성 체크
    if(inputValue.indexOf(' ') !== -1) { //1. 공백 유무
      setCopyTextMsg('공백이 있어요 다시 입력해주세요.');
      return;
    }
    if(inputValue === '') { //2. input 빈값 유무
      setCopyTextMsg('URL주소를 입력하세요.');
      return;
    }
    if(!expUrl.test(inputValue)) { //3. input 잘못된 주소 체크
      setCopyTextMsg('잘못된 주소 형식 입니다. http 또는 https 로 시작하는 주소를 입력해 주세요.');
      return;
    }
    const { data } = await axios.post("/changeUrl", {
      //응답을 처리하는 부분
      config,
      url: inputValue,
    });
    console.log(data);
    setIsInputShow(true);
    setUpdateValue(data.url);
    setInputValue(inputValue);
  }, [inputValue]);

  /**
   * 복사버튼 클릭시 textCopy
   */
  const handleCopyUrlBtn = useCallback(() => {
    setCopyTextMsg('주소가 복사되었습니다.😘');
  }, []);

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
      <main className={classNames(css.main, "flex justify-center text-center p-24")}>
        <article className={classNames(css.inner, "flex flex-col justify-center")}>
          <h1><a href="/">shorts URL</a></h1>
          <h2 className="sm:text-[2.5rem] mx-0 mb-0 lg:text-[3.75rem] text-[1.5rem] m-12 ">
            단축 URL 링크 주소 줄이기
          </h2>
          <h3 className="sm:text-[1.5rem] mx-0 lg:text-[1.8rem] text-[1rem] m-12">
            길고 복잡한 링크 주소를 짧게 줄이는 단축 URL 서비스
          </h3>
          <div className={classNames(css.formWrap, "flex flex-col justify-center")}>
            <form className={classNames("flex justify-center mb-5")}>
              <fieldset className={css.inputContainer}>
                <label className="a11y">URL을 입력하세요.</label>
                <input
                  id="commonInput"
                  className={css.urlInput}
                  type="url"
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

            {isInputShow &&
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
            }
            {/* input 유효성체크에 따른 텍스트 */}
            <CopyText>{copyTextMsg}</CopyText>
          </div>
        </article>
      </main>
      <div className={css.backgroundEffect}>
        <div className="a11y">배경영역</div>
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