/**
 * 트립메이트 - 경기권 맞춤형 여행 추천 플랫폼
 * 메인 App 컴포넌트
 */

import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { HomePage } from "./components/HomePage";
import { MapPage } from "./components/MapPage";
import { SettingsPage } from "./components/SettingsPage";

type Screen = "login" | "signup" | "home" | "map" | "settings";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [user, setUser] = useState<{
    username: string;
    isGuest: boolean;
  } | null>(null);
  const [preferences, setPreferences] = useState({
    purposes: {
      맛집투어: true,
      랜드마크투어: true,
      쇼핑: false,
      자연감상: false,
      문화체험: false,
    },
    timePreference: "낮" as "낮" | "밤",
  });

  const handleLogin = (username: string, password: string) => {
    console.log("로그인:", username, password);
    setUser({ username, isGuest: false });
    setCurrentScreen("home");
  };

  const handleSignup = (
    username: string,
    email: string,
    password: string,
  ) => {
    console.log("회원가입:", username, email, password);
    alert(`${username}님, 회원가입이 완료되었습니다!`);
    setCurrentScreen("login");
  };

  const handleGuestMode = () => {
    setUser({ username: "게스트", isGuest: true });
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("login");
  };

  return (
    <div className="size-full">
      {currentScreen === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onGuestMode={handleGuestMode}
          onSignupClick={() => setCurrentScreen("signup")}
        />
      )}

      {currentScreen === "signup" && (
        <SignupPage
          onSignup={handleSignup}
          onBackToLogin={() => setCurrentScreen("login")}
        />
      )}

      {currentScreen === "home" && user && (
        <HomePage
          username={user.username}
          preferences={preferences}
          onNavigateToMap={() => setCurrentScreen("map")}
          onNavigateToSettings={() =>
            setCurrentScreen("settings")
          }
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "map" && (
        <MapPage onBack={() => setCurrentScreen("home")} />
      )}

      {currentScreen === "settings" && user && (
        <SettingsPage
          username={user.username}
          preferences={preferences}
          onPreferencesChange={setPreferences}
          onBack={() => setCurrentScreen("home")}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}