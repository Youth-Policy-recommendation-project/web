import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져옴
    const accessToken = localStorage.getItem('accessToken');
    const id = localStorage.getItem('memberId');

    // 토큰이 존재하면 로그인 상태로 간주
    if (!accessToken) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate('/');
    }
  }, [navigate]);

  const handleCustomPolicyClick = () => {
    // 맞춤정책보기 클릭 시 특정 경로로 이동
    navigate('/myresult');
  };

  const handleSearchClick = () => {
    // 검색해서보기 클릭 시 특정 경로로 이동
    navigate('/');
  };

  return (
    <div className="centered-container">
      <button variant="primary" onClick={handleCustomPolicyClick} className="custom-button1">
        맞춤정책보기
      </button>{' '}
      <button variant="secondary" onClick={handleSearchClick} className="custom-button2">
        검색해서보기
      </button>

    </div>
  );
}
