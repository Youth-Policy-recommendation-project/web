import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function InfoUpdate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [region, setRegion] = useState([]);
  const [interestPolicy, setInterestPolicy] = useState(null); // New state for selected policy

  const [data, setData] = useState([]);
  const id = localStorage.getItem('memberId'); // Get memberId from local storage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/members/myInfo/${id}`);
        const data = await response.json();
        setData(data);
        setEmail(data.email);
        setName(data.name);

        // Ensure that the dateOfBirth is valid before setting the state
        const parsedDateOfBirth = new Date(data.dateOfBirth);
        setBirthdate(isNaN(parsedDateOfBirth.getTime()) ? null : parsedDateOfBirth);

        setRegion(data.region);
        setInterestPolicy(data.interestPolicy);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);


  const cityRef = useRef(null);
  const interestPolicyRef = useRef(null);


  const handleCityChange = () => {
    const selectedCity = cityRef.current.value === '선택' ? null : cityRef.current.value;
    setRegion(selectedCity);
  };

  const handlePolicyChange = () => {
    const selectedPolicyValue = interestPolicyRef.current.value === '선택' ? null : interestPolicyRef.current.value;
    setInterestPolicy(selectedPolicyValue);
  };


  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(e.target.value));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/members/myInfo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          dateOfBirth: birthdate,
          region : region,
          interestPolicy : interestPolicy
        }),
      });

      if (response.ok) {
        navigate(`/myinfo/${id}`);
      } else {
        console.error('Failed to update member information:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating member information:', error);
    }
  };

  return (
    <div className="loginPage">
      <div className="alignInput">
        <div className="titleWrap"> 나의 정보 수정</div>

        <div className="contentWrap">
          <div className="inputTitle">이름</div>
          <div className="inputWrap">
            <p className="inputdisable"> {name}</p>
          </div>

          <div className="inputTitle">이메일 주소</div>
          <div className="inputWrap">
            <p className="inputdisable"> {email} </p>
          </div>

          <div className="inputTitle">생년월일</div>
          <div className="inputWrap">
            <DatePicker selected={birthdate} className="input" onChange={(date) => setBirthdate(date)} />
          </div>
          
          <div className="inputTitle">지역</div>
      <div className="inputWrap">
        <select
          className="form-select formFont input"
          value={region}
          onChange={(e) => setRegion(e.target.value)} 
        >
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


          <div className="inputTitle">관심 정책</div>
          <div className="inputWrap">

          <select className="form-select formFont input" 
              defaultValue="선택" 
              ref={interestPolicyRef} 
              value={interestPolicy}
              onChange={handlePolicyChange} 
                >
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
        <button className="mainButton" onClick={handleUpdate}>
          확인
        </button>
      </div>

      <svg onClick={() => navigate('/')} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill goBackButton" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
    </div>
  );
}
