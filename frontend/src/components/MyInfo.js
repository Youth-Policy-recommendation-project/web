import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function MyInfo() {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [birthdate, setBirthdate] = useState(null);
const [region, setRegion] = useState([]);
const [interestPolicy, setInterestPolicy] = useState([]);
const [data, setData] = useState([]);

const { id } = useParams();


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/members/myInfo/${id}`);
        const data = await response.json();
        setData(data);
        setEmail(data.email);
        setName(data.name);
        setBirthdate(data.dateOfBirth);
        setRegion(data.region);
        setInterestPolicy(data.interestPolicy);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the fetchData function when the component mounts
  }, [id]); // Run the effect whenever 'id' changes

console.log(data);

  const cityRef = useRef(null);
  const handleCityChange = () => {
    const selectedCity = cityRef.current.value === '선택' ? null : cityRef.current.value;
    setRegion(selectedCity);
  };

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

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


  return (
    <div className="loginPage">
      <div className="alignInput">
        <div className="titleWrap"> 나의 정보 수정</div>

        <div className="contentWrap">
          <div className="inputTitle">이름</div>
          <div className="inputWrap">
            <p className="input"> {name}</p>
          </div>

          <div className="inputTitle">이메일 주소</div>
          <p className="inputWrap">
          <p className="input"> {email}</p>
          </p>

          <div className="inputTitle">생년월일</div>
          <div className="inputWrap">
              <p className="input"> {birthdate} </p>
          </div>

          <div className="inputTitle">지역</div>
          <div className="inputWrap">

          <p className="input"> {region} </p>


          <div className="inputTitle">관심 정책</div>
          <div className="inputWrap">

          <p className="input"> {interestPolicy} </p>
          </div>
          </div>
        </div>
      </div>

      <div className="alignButton">
        <button className="mainButton" onClick={() => history(`/myinfo/${id}/update`)}>
          수정하기
        </button>
      </div>

      <button onClick={() => history(`/`)} className="goBackButton" type="button"></button>
    </div>
  );
}
