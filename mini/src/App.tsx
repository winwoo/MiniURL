import { ChangeEvent, useCallback, useState, useRef } from 'react';
import classNames from 'classnames';
import css from "./main.module.scss";
import Button from './component/Button';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const inputE1 = useRef(null);
  const inputE2 = useRef(null);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  /**
   * 비동기 작업
   */
  const handlePost = useCallback(async() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const {data} = await axios.post('/changeUrl', { //응답을 처리하는 부분
      config,
      url: inputValue
    });
    console.log(data)
  }, [inputValue]);

  /**
   * text 복사 함수
   */
  const copyUrl = useCallback(() => {
    console.log('url 복사되었습니다.')
  }, []);

  /**
   * url 입력 input창
   */
  const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('value', inputValue)
    }
  }, [inputValue])

  /**
   * 해야할 것
   * 1. url입력 후 단축 버튼 누르면
   * 2. 하단 input에 잘라낸 url이 나타난다.
   * 3. input 엔터를 했을때에도 콘솔에 url이 나타난다.
   */
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
                ref={inputE1}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="입력하세요"
                onKeyDown={handleOnKeyDown}
                />
            </div>
            <Button onClick={handlePost}>단축</Button>
          </form>

          <form className={classNames('flex justify-center')}>
            <div className={css.inputContainer}>
              <input
                id="commonInput"
                className={css.urlInput}
                type="text"
                name=""
                ref={inputE2}
                />
            </div>
            <Button onClick={copyUrl}>복사</Button>
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