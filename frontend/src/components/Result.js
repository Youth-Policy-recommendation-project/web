import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const Policy = decodeURIComponent(searchParams.get("policy"));
  const PolicySub = decodeURIComponent(searchParams.get("policySub"));
  const City = decodeURIComponent(searchParams.get("city"));
  const Start = decodeURIComponent(searchParams.get("ageStart"));
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 기본값은 로그아웃 상태
  // const memberId = localStorage.getItem("id");

  // if(memberId.length > 0) {
  //   setIsLoggedIn(true);
  // }

  const history = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  function renderApplyPeriod(start, end) {
    if (start === "2000-01-01" && (end === "2100-01-01" || end === "2100-12-31")) {
      return " 상시";
    } else if (start === "2000-01-01") {
      return ` ~ ${end}`;
    } else if (end === "2100-01-01" || end === "2100-12-31") {
      return ` ${start} ~`;
    } else {
      return ` ${start} ~ ${end}`;
    }
  }

  const onClickLatest = () => {
    fetchData(`/api/policy/search/latest?hostArea=${City}&mainCategory=${Policy}&segCategory=${PolicySub}&age=${Start}`);
  };

  const onClickDeadline = () => {
    fetchData(`/api/policy/search/deadline?hostArea=${City}&mainCategory=${Policy}&segCategory=${PolicySub}&age=${Start}`);
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setSortedData(result);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
      console.error("서버 오류 메시지:", error.message);
    }
  };

  useEffect(() => {
    fetchData(`/api/policy/search?hostArea=${City}&mainCategory=${Policy}&segCategory=${PolicySub}&age=${Start}`);
  }, [City, Policy, PolicySub, Start]);

  const onClick = (dataItem) => {
    history(`/policy/${dataItem.id}`);
  };

  const goHome = () => {
    history("/");
  };

  const changeLabel = (mainCategory) => {
    switch (mainCategory) {
      case "일자리":
        return "policyLabel";
      case "복지,문화":
        return "policyLabel2";
      case "주거":
        return "policyLabel3";
      case "교육":
        return "policyLabel4";
      case "참여,권리":
        return "policyLabel5";
      default:
        return "";
    }
  };

  const renderSortingButtons = () => (
    <div>
      <span className="login normalFont" onClick={onClickLatest}>
        최신순
      </span>{" "}
      <span className="normalFont">　|　</span>{" "}
      <span className="login normalFont" onClick={onClickDeadline}>
        마감순
      </span>
    </div>
  );

  const MAX_PAGE_BUTTONS = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, totalPages);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="container1">
      <p className="resulttext">
        당신을 위한 <span className="highlight">{sortedData.length}</span>가지 정책 추천드립니다!
      </p>
      {renderSortingButtons()}
      <ul className="ulStyle normalFont">
        {Array.isArray(currentItems) &&
          currentItems.map((dataItem) => (
            <li key={dataItem.id}>
              <div id="container">
                <div id="leftContainer">
                  <div id={changeLabel(dataItem.mainCategory)}>{dataItem.mainCategory}</div>
                  <div id="policyName" onClick={() => onClick(dataItem)}>
                    {dataItem.policyName}
                  </div>
                </div>
                {/* <div className="hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" id="rightContainer" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted hidden" viewBox="0 0 16 16">
                    <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                  </svg> */}
                {/* </div> */}
              </div>
              <div id="date">
                <p>신청기간: {renderApplyPeriod(dataItem.businessApplyStart, dataItem.businessApplyEnd)}</p>
              </div>
            </li>
          ))}
      </ul>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {renderPageButtons()}
        <button
          className="pagination-button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
      <div className="alignButton">
        <button onClick={goHome} className="mainButton" type="button">
          다시하기
        </button>
      </div>
    </div>
  );
}
