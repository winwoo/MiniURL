import { ChangeEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import css from "./main.module.scss";
import Button from './component/Button';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState<string>('');

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
      // url: inputValue,
      config,
    })
    console.log(data)
  }, [inputValue]);

  /**
   * text 복사 함수
   */
  const copyUrl = useCallback(() => {
    console.log('url 복사되었습니다.')
  }, []);

  /**
   * 해야할 것
   * 1. url입력 후 단축 버튼 누르면
   * 2. 하단 input에 잘라낸 url이 나타난다.
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
                value={inputValue}
                onChange={handleInputChange}
                placeholder="입력하세요"
                />
            </div>
            <Button name={'단축'} onClick={handlePost}/>
          </form>

          <form className={classNames('flex justify-center')}>
            <div className={css.inputContainer}>
              <input
                id="commonInput"
                className={css.urlInput}
                type="text"
                name=""
                placeholder=""
                />
            </div>
            <Button name={'복사'} onClick={copyUrl}/>
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