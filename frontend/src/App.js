import React from "react";
import Items from "./components/Items";
import Header from "./components/Header";
import NaveBar from "./components/NaveBar";
import Result from "./components/Result";
import CreateItem from "./components/CreateItem";
// import Item from "./components/Item";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

 return(
  <BrowserRouter>
    <div class="App">
      <Header/>
      <NaveBar/>
      <Routes>
        <Route path="/" element={<Items/>}/>
        <Route path="/todo" element={<Items endpoint="?status=todo"/>}/>
        <Route path="/done" element={<Items endpoint="?status=done"/>}/>
        <Route path="/create_item" element={<CreateItem/>}/>
        <Route path="/result" element={<Result/>}/>

      </Routes>
    </div>
  </BrowserRouter>
 );
}

export default App;


// // import logo from './logo.svg';
// import './App.css';
// import Hello from './Hello';
// import Wrapper from './Wrapper';

// function App() {

//   return (
//     // <Hello name="indo" />
//     <Wrapper>
//       <Hello />
//       <p>I love React!</p>
//       <Hello name="react!"/>
//     </Wrapper> );
// }

// export default App;

// // 부모 컴포넌트에서 자식 컴포넌트 한 방향으로만 사용된다.


