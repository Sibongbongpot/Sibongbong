/**
 * 설정 페이지 컴포넌트
 */

import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ArrowLeft, Settings, LogOut, MapPin, Sun, Moon, LogIn } from 'lucide-react';

interface SettingsPageProps {
  username: string;
  preferences: {
    purposes: {
      '맛집투어': boolean;
      '랜드마크투어': boolean;
      '쇼핑': boolean;
      '자연감상': boolean;
      '문화체험': boolean;
    };
    timePreference: '낮' | '밤';
  };
  onPreferencesChange: (preferences: {
    purposes: {
      '맛집투어': boolean;
      '랜드마크투어': boolean;
      '쇼핑': boolean;
      '자연감상': boolean;
      '문화체험': boolean;
    };
    timePreference: '낮' | '밤';
  }) => void;
  onBack: () => void;
  onLogout: () => void;
}

export function SettingsPage({ username, preferences, onPreferencesChange, onBack, onLogout }: SettingsPageProps) {
  const togglePurpose = (purpose: string) => {
    onPreferencesChange({
      ...preferences,
      purposes: {
        ...preferences.purposes,
        [purpose]: !preferences.purposes[purpose as keyof typeof preferences.purposes]
      }
    });
  };

  const toggleTimePreference = () => {
    onPreferencesChange({
      ...preferences,
      timePreference: preferences.timePreference === '낮' ? '밤' : '낮'
    });
  };

  const handleSaveSettings = () => {
    alert('설정이 저장되었습니다!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* 헤더 */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="icon"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl">설정</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 사용자 정보 */}
        <Card className="p-6 mb-6 border-green-100">
          <h2 className="text-xl mb-4">계정 정보</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="text-gray-500">사용자명:</span> <span>{username}</span>
            </p>
            <p className="text-gray-700">
              <span className="text-gray-500">가입일:</span> <span>2025년 10월 6일</span>
            </p>
          </div>
        </Card>

        {/* 여행 취향 설정 */}
        <Card className="p-6 mb-6 border-blue-100">
          <h2 className="text-xl mb-4">여행 취향 설정</h2>
          
          <div className="mb-6">
            <h3 className="text-base mb-3 text-gray-700">여행 목적 (중복 선택 가능)</h3>
            <div className="space-y-3">
              {Object.entries(preferences.purposes).map(([purpose, checked]) => (
                <div key={purpose} className="flex items-center space-x-2">
                  <Checkbox
                    id={purpose}
                    checked={checked}
                    onCheckedChange={() => togglePurpose(purpose)}
                    className="border-green-400 data-[state=checked]:bg-green-500"
                  />
                  <Label
                    htmlFor={purpose}
                    className="text-sm cursor-pointer"
                  >
                    {purpose}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-base mb-3 text-gray-700">선호 시간대</h3>
            <div className="flex gap-3">
              <Button
                onClick={toggleTimePreference}
                variant={preferences.timePreference === '낮' ? 'default' : 'outline'}
                className={preferences.timePreference === '낮' 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'border-gray-300'}
              >
                <Sun className="w-4 h-4 mr-2" />
                낮 활동
              </Button>
              <Button
                onClick={toggleTimePreference}
                variant={preferences.timePreference === '밤' ? 'default' : 'outline'}
                className={preferences.timePreference === '밤' 
                  ? 'bg-indigo-500 hover:bg-indigo-600' 
                  : 'border-gray-300'}
              >
                <Moon className="w-4 h-4 mr-2" />
                밤 활동
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSaveSettings}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            설정 저장
          </Button>
        </Card>

        {/* 계정 관리 */}
        <Card className="p-6 border-red-100">
          <h2 className="text-xl mb-4 text-red-600">계정 관리</h2>
          <p className="text-gray-600 mb-4">
            로그아웃하거나 다른 계정으로 로그인할 수 있습니다.
          </p>
          <div className="space-y-3">
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4 mr-2" />
              다시 로그인하기
            </Button>
            
            <Button
              onClick={onLogout}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
