import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PolicyInfo() {
  const history = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/policy/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const policyData = await response.json();
        setData(policyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  function goHome() {
    history("/");
  }

  function toArray(data) {
    // Check if data is null or undefined
      try {
        // Use regex to find all matches and then map over them
        const extractedUrls = data.match(/"([^"]*)"/g).map((match) => match.replace(/"/g, '').trim());
        console.log("Extracted URLs:", extractedUrls); // Add this line for logging
        return extractedUrls;
      } catch (error) {
        console.error("Error extracting URLs:", error); // Log any errors
        return data; // Return "없음" in case of an error
      }
  }
  

  return (
    <>
          <div className="policyInfoTitle">
            <p>{data.policyName}</p>
          </div>
            <table className="infoTable">
              <tbody className="infoTable">
                <TableRow title="기관 및 지자체 구분" value={data.institutionsLocalClass} />
                <TableRow title="정책소개" value={data.policyInfo} />
                <TableRow title="지원내용" value={data.policyContent} />
                <TableRow title="지원규모" value={data.policyScale} />
                <TableRow title="사업운영 기간" value={`${data.operationStartDate} ~ ${data.operationEndDate}`} />
                <TableRow title="신청 기간" value={`${data.businessApplyStart} ~ ${data.businessApplyEnd}`} />
                <TableRow title="나이" value={`${data.startAge} ~ ${data.endAge}`} />
                <TableRow title="전공요건" value={data.majorRequirements} />
                <TableRow title="취업상태" value={data.employmentStatusDetails} />
                <TableRow title="특화분야" value={data.specializedFieldContents} />
                <TableRow title="학력요건" value={data.educationRequirements} />
                <TableRow title="거주지 및 소득조건" value={data.residenceIncomeConditions} />
                <TableRow title="추가단서사항" value={data.additionalClues} />
                <TableRow title="참여제한대상" value={data.participationRestrictions} />
                <TableRow title="신청절차" value={data.applicationProcedureDetails} />
                <TableRow title="제출서류" value={data.documentsSubmitted} />
                <TableRow title="심사발표" value={data.juryPresentationContents} />
                <TableRow title="신청 사이트" value={data.applyUrl} />
                <TableRow title="기타 사이트" value={toArray(data.etcUrls)} />
                <TableRow title="주관부처명" value={data.hostingDepartmentName} />
                <TableRow title="주관부처 담당자 이름" value={data.hostingDepartment} />
                <TableRow title="주관부처 담당자 연락처" value={data.hostingDepartmentContact} />
                <TableRow title="운영기관 담당자" value={data.hostingDepartmentContact} />
                <TableRow title="운영기관 담당자 연락처" value={data.operatingOrganization} />
                <TableRow title="기타사항" value={data.etc} />
                <TableRow title="주관지역" value={data.hostArea} />
              </tbody>
            </table>

        <div className="alignButton">
          <button onClick={goHome} className="mainButton" type="button">
            돌아가기
          </button>
        </div>
    </>
  );
}

const TableRow = ({ title, value }) => {
  return (
    <tr>
      <td className="infoColumnTitle">{title}</td>
      <td>
        {Array.isArray(value) ? (
          <ul className="ulStyle">
            {value.map((url, index) => (
              <li key={index}>
                  {url}
                
              </li>
            ))}
          </ul>
        ) : (
          <div>{value}</div>
        )}
      </td>
    </tr>
  );
};
