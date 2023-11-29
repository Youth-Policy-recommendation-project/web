import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NaveBar from "./NaveBar";

export default function MyForm() {

  const history = useNavigate();

  // 새로고침 방지
  function onSubmit(e) {
    e.preventDefault();
    const selectedCity = cityRef.current.value === '선택' ? "n": cityRef.current.value;
    const selectedPolicy = policyMainRef.current.value === '선택' ? "n": policyMainRef.current.value;
    const selectedSubCategory = policySegmentationRef.current.value === '선택' ? "n": policySegmentationRef.current.value;
    const selectedAge = ageStart === '' ? "-1" : ageStart;

 

  
  //     // Check if ageStartRef is null and assign 0 if it is
  // if (!ageStartRef.current.value) {
  //   ageStartRef.current = 0;
  // }
    history(`/result?policy=${selectedPolicy}&policySub=${selectedSubCategory}&city=${selectedCity}&ageStart=${selectedAge}`);
  }

  const policyMainRef = useRef(null);
  const cityRef = useRef(null);
  const ageStartRef = useRef(null);
  const policySegmentationRef = useRef([]);


  const [ageStart, setAgeStart] = useState(-1);
  const handleAgeChange = (e) => {
    // Update the ageStart state when the input changes
    const value = e.target.value;
    setAgeStart(value);
  };


  const [subCategories, setSubCategories] = useState([]);

  const [selectedCity, setSelectedCity] = useState([]);

  const handleCityChange = () => {
    const selectedCity = cityRef.current.value === '선택' ? 'n' : cityRef.current.value;
    setSelectedCity(selectedCity);
  };

  const handlePolicyChange = () => {
    const selectedPolicy = policyMainRef.current.value === 'n' ? null : policyMainRef.current.value;
    const selectedSubCategories = getSubcategories(selectedPolicy);
    setSubCategories(selectedSubCategories);
  };
  

  const getSubcategories = (policy) => {
    switch (policy) {
      case '일자리':
        return ['A', 'B', 'C'];
      case '주거':
        return ['D', 'E', 'F'];
      case '교육':
        return ['G', 'H', 'I'];
      case '복지문화':
        return ['J', 'K', 'L'];
      case '참여권리':
        return ['M', 'N', 'O'];
      default:
        return [];
    }
  };

  const accessToken = localStorage.getItem('accessToken');
  console.log(typeof ageStart)
  return (
    <div className="component">
      <NaveBar />
      { !accessToken ? (
        <>      
        <form className="formField">

        {/* 지역 */}
        <div className="form-group row formField">
          <label className="col-sm-4 text-sm-right titleFont">지역</label>
          <div className="col-sm-8">
            <select className="form-select formFont" aria-label="Default select example" defaultValue="선택" ref={cityRef} onChange={handleCityChange}>
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
        </div>

        {/* 복지 */}
        <div className="form-group row formField">
          <label className="col-sm-4 text-sm-right titleFont">정책</label>
          <div className="col-sm-8">
            <select className="form-select formFont" aria-label="Default select example" defaultValue="선택" ref={policyMainRef} onChange={handlePolicyChange}>
              <option disabled>선택</option>
              <option>일자리</option>
              <option>주거</option>
              <option>교육</option>
              <option>복지문화</option>
              <option>참여권리</option>
            </select>
          </div>
        </div>

        {/* 세분화된 카테고리 선택 */}
        <div className="form-group row formField">
          <label className="col-sm-4 text-sm-right titleFont">세부 카테고리</label>
          <div className="col-sm-8">
            <select className="form-select formFont" aria-label="Default select example" defaultValue="선택" ref={policySegmentationRef}>
              <option disabled>선택</option>
              {subCategories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 나이 */}
        <div className="form-group row formField">
          <label htmlFor="a6" className="col-sm-4 text-sm-right titleFont">나이</label>
          <div className="col-sm-8">
            <input type="text" id="a6" className="form-control form-control-sm formFont ageinput" placeholder="숫자만 입력해주세요." ref={ageStartRef} />
          </div>
        </div>

      </form> 

      <div className="alignButton">
        <button onClick={onSubmit} className="mainButton" type="button">결과보기</button>
        </div> 
        </>

        ) : (

          <>      
          <form className="formField">
  
          {/* 지역 */}
          <div className="form-group row formField">
            <label className="col-sm-4 text-sm-right titleFont">지역</label>
            <div className="col-sm-8">
              <select className="form-select formFont" aria-label="Default select example" defaultValue="선택" ref={cityRef} onChange={handleCityChange}>
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
          </div>
  
          {/* 복지 */}
          <div className="form-group row formField">
            <label className="col-sm-4 text-sm-right titleFont">정책</label>
            <div className="col-sm-8">
              <select className="form-select formFont" aria-label="Default select example" defaultValue="선택" ref={policyMainRef} onChange={handlePolicyChange}>
                <option disabled>선택</option>
                <option>일자리</option>
                <option>주거</option>
                <option>교육</option>
                <option>복지문화</option>
                <option>참여권리</option>
              </select>
            </div>
          </div>
  
          {/* 세분화된 카테고리 선택 */}
          <div className="form-group row formField">
            <label className="col-sm-4 text-sm-right titleFont">세부 카테고리</label>
            <div className="col-sm-8">
              <select className="form-select formFont" aria-label="Default select example" defaultValue="선택" ref={policySegmentationRef}>
                <option disabled>선택</option>
                {subCategories.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </select>
            </div>
          </div>
  
            {/* 나이 */}
            <div className="form-group row formField">
              <label htmlFor="a6" className="col-sm-4 text-sm-right titleFont">나이</label>
              <div className="col-sm-8">
              <input
                type="text"
                id="a6"
                className="form-control form-control-sm formFont ageinput"
                placeholder="숫자만 입력해주세요."

                onChange={handleAgeChange} // Add onChange handler
              />
              </div>
            </div>
        </form> 
  
          <div className="alignButton">
          <button onClick={onSubmit} className="mainButton" type="button">결과보기</button>
          </div> 
       
          {/* <button onClick={() => history('/member')} className="goBackButton" type="button">◀</button> */}
          <svg onClick={() => history('/member')} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill goBackButton" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
          </>
        )}
    </div>

);
}
