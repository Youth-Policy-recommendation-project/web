import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function Signup() {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [birthdate, setBirthdate] = useState(null);

  const [region, setRegion] = useState([]);

  const [interestPolicy, setInterestPolicy] = useState(null);


  const history = useNavigate();

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

  const cityRef = useRef(null);

  const handleCityChange = () => {
    const selectedCity = cityRef.current.value === '선택' ? null : cityRef.current.value;
    setRegion(selectedCity);

  };
  const interestPolicyRef = useRef(null);
  
  const handlePolicyChange = () => {
    const selectedPolicyValue = interestPolicyRef.current.value === '선택' ? null : interestPolicyRef.current.value;
    setInterestPolicy(selectedPolicyValue);
  };
  
  const onClickConfirmButton = async () => {
    try {
      const response = await fetch('/api/members/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pw,
          dateOfBirth: birthdate,
          region: region.label,
          interestPolicy: interestPolicy,  // <-- 여기는 그대로
        }),
      });
  
      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }
  
      const { id, regdate, email: responseEmail } = await response.json();
  
      alert('회원가입에 성공했습니다.');
      console.log('회원가입 성공:', { id, regdate, email: responseEmail });
      history('/');
    } catch (error) {
      alert('이미 가입된 이메일 주소입니다.');
      console.error('회원가입 실패:', error);
    }
  };
  

  return (
    <div className="loginPage">
      <div className="alignInput">
        <div className="titleWrap">회원가입</div>

        <div className="contentWrap">
          <div className="inputTitle">이름</div>
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="inputTitle">이메일 주소</div>
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}
          </div>

          <div className="inputTitle">비밀번호</div>
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

          <div className="inputTitle">생년월일</div>
          <div className="inputWrap">
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="생년월일을 선택하세요"
              className="input"
            />
          </div>

          <div className="inputTitle">지역</div>
          <div className="inputWrap">

            <select className="form-select formFont" 
              aria-label="Default select example" 
              defaultValue="선택" ref={cityRef} 
              onChange={handleCityChange}>
              <option disabled>선택</option>
              <option>서울</option>
              <option>부산</option>
              <option>대구</option>
              <option>인천</option>
              <option>광주</option>
              <option>대전</option>
              <option>세종</option>
              <option>울산</option>
              <option>경기</option>
              <option>강원</option>
              <option>경상남도</option>
              <option>경상북도</option>
              <option>전라남도</option>
              <option>전라북도</option>
              <option>충청남도</option>
              <option>충청북도</option>
              <option>제주</option>
              <option>제주도</option>
            </select>

          </div>


          {/* 복지 */}
          <div className="inputTitle">관심 복지</div>
          <div className="inputWrap">

          <select className="form-select formFont" 
              aria-label="Default select example"  
              defaultValue="선택" ref={interestPolicyRef} 
              onChange={handlePolicyChange}>

              <option disabled>선택</option>
              <option>일자리</option>
              <option>주거</option>
              <option>교육</option>
              <option>복지문화</option>
              <option>참여권리</option>
            </select>

        </div>
        </div>


      </div>




      <div className="alignButton">
        <button onClick={onClickConfirmButton} className="mainButton">
          가입하기
        </button>
      </div>

          <svg onClick={() => history('/member')} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill goBackButton" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
    </div>
  );
}
