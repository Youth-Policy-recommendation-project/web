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

 
    function renderApplyPeriod(start, end) {
      if (start === "2000-01-01" && end === "2100-01-01") {
        return " 상시";
      } else if (start === "2000-01-01") {
        return ` ~ ${end}`;
      } else if (end === "2100-01-01") {
        return ` ${start} ~`;
      } else {
        return ` ${start} ~ ${end}`;
      }
    }
  
  
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
        return ['농어촌', '취업', '창업', '취업지원', '중소기업'];
      case '주거':
        return ['주택', '자금지원', '금융'];
      case '교육':
        return ['인재양성', '대학생', '장학금', '자기계발'];
      case '복지문화':
        return ['복지', '문화', '건강', '행사', '임신/출산'];
      case '참여권리':
        return ['참여', '권리', '커뮤니티', '지역발전'];
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

        <svg  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="chatFloat" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
        </svg>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">

                <div class="modal-content">
                  
                <div class="iframe-container">
                <iframe src="//youthpolicychatbot.streamlit.app/~/+/" width="100%" frameborder="0" class="modal-body"></iframe>
                </div>
                <button type="button" class="chatCloseButton" data-bs-dismiss="modal">닫기</button>
                
                </div>
            </div>
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
       
          <svg onClick={() => history('/member')} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill goBackButton" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>


        <svg  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="chatFloat" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
        </svg>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">

                <div class="modal-content">
                  
                <div class="iframe-container">
                <iframe src="//youthpolicychatbot.streamlit.app/~/+/" width="100%" frameborder="0" class="modal-body"></iframe>
                </div>
                <button type="button" class="chatCloseButton" data-bs-dismiss="modal">닫기</button>
                
                </div>
            </div>
        </div>


          
          </>
        )}
    </div>

);
}
