import { Dropdown } from 'bootstrap';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 여부 확인
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(accessToken !== null);
  }, []);

  function handleLogout() {
    fetch("/api/members/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem('accessToken'),
      }),
    }).then((res) => {
      if (res.ok) {
        // 로그아웃 성공 시 토큰 및 로그인 상태 업데이트
        localStorage.removeItem('accessToken'); // 토큰 삭제
        setIsLoggedIn(false);
        history("/");
        window.location.reload();
      }
    });
  }  

  const id = localStorage.getItem('memberId')

  function handleGoMyInfo() {
    history(`/myinfo/${id}`)
  }

  function handleGoMyPolicy() {
    history(`/mypolicy`)
  }

  const name = localStorage.getItem('nickname');

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className='header'>
        <div className='left'>
          <Navbar.Brand id="logo" href="/">정책이</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>

        <div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <div className="login-container">
                {isLoggedIn ? (
                  <NavDropdown title={`${name}님 반갑습니다!`} id="collapsible-nav-dropdown" className='normalFont'>
                    <NavDropdown.Item onClick={handleGoMyInfo}>
                      나의 정보
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleGoMyPolicy}>저장된 정책</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <div>
                  <span className="login normalFont" onClick={() => history("/login")}>로그인</span> <span className="normalFont">　|　</span>   
                  <span className="login normalFont" onClick={() => history("/register")}>회원가입</span>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
