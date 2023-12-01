import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MemberResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = localStorage.getItem("id");
  const Policy = decodeURIComponent(searchParams.get("policy"));
  const PolicySub = decodeURIComponent(searchParams.get("policySub"));
  const City = decodeURIComponent(searchParams.get("city"));
  const Start = decodeURIComponent(searchParams.get("ageStart"));

  const history = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  function renderApplyPeriod(start, end) {
    if (start === "2000-01-01" && (end === "2100-01-01" || end==="2100-12-31")) {
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
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setSortedData(result); // sortedData를 업데이트
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        console.error("서버 오류 메시지:", error.message);
      }
    };
    fetchData(`/api/policy/search/member/${id}/latest`);
  };

  const onClickDeadline = () => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setSortedData(result); // sortedData를 업데이트
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        console.error("서버 오류 메시지:", error.message);
      }
    };
    fetchData(`/api/policy/search/member/${id}/deadline`);
  };

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setSortedData(result); // sortedData를 업데이트
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        console.error("서버 오류 메시지:", error.message);
      }
    };
    fetchData(`/api/policy/search/member/${id}`);
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

  const MAX_PAGE_BUTTONS = 10; // 최대 페이지 버튼 수
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
      {renderSortingButtons()} {/* 정렬 버튼 렌더링 */}
      {/* <div className="clearfix normalFont"> */}
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
                <div id="rightContainer">

                </div>
              </div>
              <div id="date">
                <p>　　　　　　　　신청기간 : {renderApplyPeriod(dataItem.businessApplyStart, dataItem.businessApplyEnd)}</p>
              </div>
            </li>
          ))}
      </ul>
      {/* </div> */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {renderPageButtons()} {/* renderPageButtons 함수 호출로 페이지 버튼 렌더링 */}
        <button
          className="pagination-button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
      <svg onClick={() => history('/member')} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill goBackButton" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
            <div id="footer">

            </div>
    </div>
  );
}
