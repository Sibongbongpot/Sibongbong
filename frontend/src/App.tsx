/**
 * 트립메이트 - 경기권 맞춤형 여행 추천 플랫폼
 * 메인 App 컴포넌트 (로그인/회원가입 연동 버전)
 */
import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { HomePage } from './components/HomePage';
import { MapPage } from './components/MapPage';
import { SettingsPage } from './components/SettingsPage';
import { TestPage } from './components/TestPage';

// API 서버의 기본 주소
const API_BASE_URL = 'http://localhost:8080';

// 화면 전환을 위한 타입 정의
type Screen = 'login' | 'signup' | 'home' | 'map' | 'settings' | 'test';

// 🧪 테스트 모드: true로 설정하면 TestPage가 표시됩니다
const TEST_MODE = false;

// 간단한 메시지 모달 컴포넌트
function Modal({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-xl">
        <p className="text-gray-800 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
        >
          확인
        </button>
      </div>
    </div>
  );
}

// 인증이 필요한 API 요청을 위한 헬퍼 함수
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwt-token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 403) {
    localStorage.removeItem('jwt-token');
    window.location.reload();
    throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
  }

  return response;
};


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<{ username: string; isGuest: boolean } | null>(null);
  // 취향 설정은 프론트엔드 상태로만 유지 (백엔드 연동 제외)
  const [preferences, setPreferences] = useState({
    purposes: { 맛집투어: true, 랜드마크투어: true, 쇼핑: false, 자연감상: false, 문화체험: false },
    timePreference: '낮' as '낮' | '밤',
  });
  const [modalMessage, setModalMessage] = useState('');

  // 앱이 처음 로드될 때, 저장된 토큰이 있는지 확인하여 자동 로그인 처리
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('jwt-token');
      if (token) {
        await fetchUserData();
      }
    };
    checkLoginStatus();
  }, []);

  // 백엔드에서 사용자 정보를 가져오는 함수 (취향 정보 제외)
  const fetchUserData = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/api/me`);
      if (!response.ok) {
        throw new Error('사용자 정보를 불러오는데 실패했습니다.');
      }
      const userData = await response.json();
      setUser({ username: userData.username, isGuest: false });
      setCurrentScreen('home');
    } catch (error: any) {
      localStorage.removeItem('jwt-token'); // 실패 시 토큰 제거
    }
  };

  // 로그인 처리 함수 (백엔드 API 호출)
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
      }

      const token = await response.text();
      localStorage.setItem('jwt-token', token);

      await fetchUserData(); // 로그인 성공 후 사용자 정보 불러오기
    } catch (error: any) {
      setModalMessage(error.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 처리 함수 (백엔드 API 호출, 이메일 포함)
  const handleSignup = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '회원가입에 실패했습니다. (아이디 중복 등)' }));
        throw new Error(errorData.message);
      }

      setModalMessage(`${username}님, 회원가입이 완료되었습니다. 로그인 해주세요.`);
      setCurrentScreen('login');
    } catch (error: any) {
      setModalMessage(error.message || '회원가입 중 오류가 발생했습니다.');
    }
  };
  
  const handleGuestMode = () => {
    setUser({ username: '게스트', isGuest: true });
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    setUser(null);
    setCurrentScreen('login');
  };

  if (TEST_MODE) {
    return <TestPage />;
  }

  return (
    <div className="size-full min-h-screen">
      <Modal message={modalMessage} onClose={() => setModalMessage('')} />

      {currentScreen === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onGuestMode={handleGuestMode}
          onSignupClick={() => setCurrentScreen('signup')}
        />
      )}

      {currentScreen === 'signup' && (
        <SignupPage onSignup={handleSignup} onBackToLogin={() => setCurrentScreen('login')} />
      )}

      {currentScreen === 'home' && user && (
        <HomePage
          username={user.username}
          preferences={preferences}
          onNavigateToMap={() => setCurrentScreen('map')}
          onNavigateToSettings={() => setCurrentScreen('settings')}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'map' && <MapPage onBack={() => setCurrentScreen('home')} />}

      {currentScreen === 'settings' && user && (
        <SettingsPage
          username={user.username}
          preferences={preferences}
          onPreferencesChange={setPreferences} // 백엔드 연동 없이 프론트엔드 상태만 변경
          onBack={() => setCurrentScreen('home')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

