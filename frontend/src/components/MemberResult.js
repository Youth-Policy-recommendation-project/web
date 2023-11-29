import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MemberResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const Policy = decodeURIComponent(searchParams.get("policy"));
  const PolicySub = decodeURIComponent(searchParams.get("policySub"));
  const City = decodeURIComponent(searchParams.get("city"));
  const Start = decodeURIComponent(searchParams.get("ageStart"));

  const history = useNavigate();
  const [sortedData, setSortedData] = useState([]);


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
      fetchData(`/api/policy/search/latest?hostArea=${City}&mainCategory=${Policy}&segCategory=${PolicySub}&age=${Start}`);
  }


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
    fetchData(`/api/policy/search/deadline?hostArea=${City}&mainCategory=${Policy}&segCategory=${PolicySub}&age=${Start}`);
}


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
      case "복지문화":
        return "policyLabel2";
      case "주거":
        return "policyLabel3";
      case "교육":
        return "policyLabel4";
      case "참여권리":
        return "policyLabel5";
      default:
        return "";
    }
  };

  const renderSortingButtons = () => (


    <div>
    <span className="login normalFont" onClick={onClickLatest}>최신순</span> <span className="normalFont">　|　</span>   
    <span className="login normalFont" onClick={onClickDeadline}>마감순</span>
    </div>
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  if (sortedData.length !== 0) {
    return (
      <div className="container1">
        <p className="resulttext">
          당신을 위한 <span className="highlight">{sortedData.length}</span>가지 정책 추천드립니다!
        </p>
        {renderSortingButtons()} {/* 정렬 버튼 렌더링 */}
        <div className="clearfix normalFont">
          <ul className="ulStyle contentBox__item">
            {Array.isArray(currentItems) &&
              currentItems.map((dataItem) => (
                <li key={dataItem.id}>
                  <div className="resultBoxContainer">
                    <span className={`left ${changeLabel(dataItem.mainCategory)}`}>
                      {dataItem.mainCategory}
                    </span>
                    <span onClick={() => onClick(dataItem)} className="policyClick">
                      {dataItem.policyName}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
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
  } else {
    return (
      <>
        <div className="headerTitle">
          <span>맞는 정책을 찾지 못했어요 ㅠ.ㅠ</span>
        </div>
        <div className="alignButton">
          <button onClick={goHome} className="mainButton" type="button">
            돌아가기
          </button>
        </div>
      </>
    );
  }
}
