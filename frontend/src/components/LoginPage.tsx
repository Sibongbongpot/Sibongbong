/**
 * 로그인 페이지 컴포넌트
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MapPin, User, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  onGuestMode: () => void;
  onSignupClick: () => void;
}

export function LoginPage({ onLogin, onGuestMode, onSignupClick }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      onLogin(username, password);
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-2 border-green-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            트립메이트
          </h1>
          <p className="text-gray-600">경기권 맞춤형 여행 추천 플랫폼</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">아이디</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="pl-10 border-green-200 focus:border-green-400"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
          >
            로그인
          </Button>

          <Button
            onClick={onSignupClick}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
          >
            회원가입
          </Button>

          <Button
            onClick={onGuestMode}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            게스트로 둘러보기
          </Button>
        </div>
      </Card>
    </div>
  );
}
