import { useNavigate} from "react-router-dom";
export default function NoContent() {
    const history = useNavigate();


    function goHome() {
        history("/");
      }
    
  return (

    <>
    <div className="headerTitle">
    <span>맞는 정책을 찾지 못했어요 ㅠ.ㅠ</span>
    </div>

    <div className="alignButton">



    <button
          onClick={goHome}
          className="mainButton"
          type="button"
        >
          돌아가기
        </button>
        </div>
        </>


  );
}



