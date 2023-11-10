import {useState, useEffect} from "react";
import MyForm from "./MyForm"; // MyForm 컴포넌트가 정의된 파일의 경로로 수정해야 합니다.

export default function Items({endpoint = ""}) { // = "" 기본값
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/items/${endpoint}`)
        .then((res) => {
            return res.json();
        })
        .then((json_response) => {
           setData(json_response);
        });
    }, [endpoint]);

    // var item = {status:"todo", task:"커피마시기", due:"2022033"}

    return (
        <div>

        <MyForm/>       
        </div>
        
    );
}