import React from "react";
import Header from "./components/Header";
import MyForm from "./components/MyForm";
import Result from "./components/Result";
import CreateItem from "./components/CreateItem";
// import Item from "./components/Item";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import PolicyInfo from "./components/PolicyInfo";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import MyInfo from "./components/MyInfo"
import { AuthProvider } from "./components/AuthProvider";
import MemberResult from "./components/MemberResult";
import Chatbot from "./components/ChatBot";
import InfoUpdate from "./components/InfoUpdate";
function App() {

 return(
  <AuthProvider>
  <BrowserRouter>
    <div class="App">
      <Header/>
      <Routes>

        <Route path="/" element={<MyForm/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
        <Route path="/myinfo/:id/update" element={<InfoUpdate/>}/>
        <Route path="/member" element={<MainPage/>}/>
        <Route path="/policy/:id" element={<PolicyInfo/>}/>
        <Route path="/myinfo/:id" element={<MyInfo/>}/>
        <Route path="/myresult" element={<MemberResult/>} /> 
        <Route path="/result/:policy/:policySub/:city/:age" element={<Result/>} />
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/create_item" element={<CreateItem/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/result" element={<Result/>}/>

      </Routes>
    </div>
  </BrowserRouter>
  </AuthProvider>
 );
}

export default App;