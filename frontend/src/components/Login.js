import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const history = useNavigate();

    useEffect(() => {
      if(emailValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
      setEmail(e.target.value);
      const regex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (regex.test(e.target.value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    };
    const handlePw = (e) => {
      setPw(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };

    const onClickConfirmButton = async () => {
      try {
        const response = await fetch('/api/members/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pw,
          }),
        });
  
        if (!response.ok) {
          throw new Error('로그인에 실패했습니다.');
        }
  
        const { accessToken, memberId, nickname } = await response.json();
  
        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('memberId', memberId);
        localStorage.setItem('nickname', nickname);
  
        alert('로그인에 성공했습니다.');
        history('/');
        window.location.reload();
      } catch (error) {
        alert('등록되지 않은 회원이거나 비밀번호가 틀렸습니다.');
        console.error('로그인 실패:', error);
      }
    };
  


  function goHome() {
    history("/");
  }

    return (
      <div className="loginPage">

        <div className='alignInput'>

        <div className="titleWrap">
          이메일과 비밀번호를
 
          입력해주세요
        </div>
        <div className="contentWrap">
          <div className="inputTitle">이메일 주소</div>
          <div
            className="inputWrap"
          >
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
        </div>

        <div className='alignButton'>
          <button onClick={onClickConfirmButton} disabled={notAllow} className="mainButton">
            확인
          </button>
        </div>



        <button
          onClick={goHome}
          className="goBackButton"
          type="button"
        >
          
        </button>



      </div>
    );
}