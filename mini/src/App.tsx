import { ChangeEvent, useCallback, useState, useRef,useEffect } from 'react';
import classNames from 'classnames';
import css from "./main.module.scss";
import Button from './component/Button';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [updateValue, setUpdateValue] = useState<string>('');
  const autoFocusingRef = useRef<HTMLInputElement>(null);
  const textCopyRef = useRef<HTMLInputElement>(null);

  /**
   * input의 입력값
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  /**
   * 페이지 초기 랜더링시 input focus
   */
  useEffect(() => {
    autoFocusingRef.current?.focus();
  }, []);

  /**
   * 데이터 변환 작업
   */
  const handleChangeURL = useCallback(async() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const {data} = await axios.post('/changeUrl', { //응답을 처리하는 부분
      config,
      url: inputValue
    });
    setUpdateValue(data.url);
    console.log(data)
  }, [inputValue]);

  /**
   * text 복사 함수
   */

  const handleCopyUrlBtn = useCallback(() => {
    const copyText = textCopyRef.current?.value;
    console.log(typeof(copyText))
    if(copyText) {
      navigator.clipboard.writeText(copyText)
      .then(() => {
        console.log('텍스트가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.log('복사에 실패하였습니다.', err);
      });
    }
  }, [textCopyRef]);

  /**
   * url 입력 input창
   */
  const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('value', inputValue)
    }
  }, [inputValue])


  return (
    <div className={css.wrapper}>
      <main className={classNames(css.main,"flex justify-center text-center p-24")}>
        <article className={classNames(css.inner,"flex flex-col justify-center")}>
          <h1>
            <a href="/">shorts URL</a>
          </h1>
          <h2 className="text-6xl m-12">단축 URL 링크 주소 줄이기 </h2>
          <h3 className="text-2xl m-12">
            길고 복잡한 링크 주소를 짧게 줄이는 단축 URL 서비스
          </h3>
          <form className={classNames('flex justify-center mb-5')}>
            <div className={css.inputContainer}>
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
            </div>
            <Button onClick={handleChangeURL}>단축</Button>
          </form>

          <form className={classNames('flex justify-center')}>
            <div className={css.inputContainer}>
              <input
                id="commonInput"
                className={css.urlInput}
                type="text"
                name=""
                value={updateValue}
                ref={textCopyRef}
                readOnly
                />
            </div>
            <Button onClick={handleCopyUrlBtn}>복사</Button>
          </form>
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