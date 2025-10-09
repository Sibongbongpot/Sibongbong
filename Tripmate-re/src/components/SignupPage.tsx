/**
 * 회원가입 페이지 컴포넌트
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MapPin, User, Lock, Mail, ArrowLeft } from 'lucide-react';

interface SignupPageProps {
  onSignup: (username: string, email: string, password: string) => void;
  onBackToLogin: () => void;
}

export function SignupPage({ onSignup, onBackToLogin }: SignupPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    onSignup(username, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-2 border-green-100">
        <Button
          onClick={onBackToLogin}
          variant="ghost"
          className="mb-4 -ml-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          로그인으로 돌아가기
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            회원가입
          </h1>
          <p className="text-gray-600">트립메이트와 함께 여행을 시작하세요</p>
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
            <label className="block text-sm text-gray-700 mb-2">이메일</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="pl-10 border-green-200 focus:border-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">비밀번호 확인</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-400"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
        >
          가입하기
        </Button>
      </Card>
    </div>
  );
}
