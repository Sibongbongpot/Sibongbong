# 🚀 트립메이트 - 로컬 설치 가이드

## ✅ 3단계로 끝내기

### 1️⃣ 다운로드 & 압축 해제
```bash
# Figma Make에서 Download 클릭 후 원하는 폴더에 압축 해제
# 예: D:\tripmate
```

### 2️⃣ 설치
```bash
cd D:\tripmate
npm install
```

⏳ 1-2분 소요 (인터넷 속도에 따라 다름)

### 3️⃣ 실행
```bash
npm run dev
```

🎉 자동으로 브라우저가 열립니다!

브라우저가 자동으로 `http://localhost:3000` 열림!

---

## ✨ 성공 확인

로그인 페이지가 이렇게 보이면 **성공**:
- ✅ 초록-파랑 그라데이션 배경
- ✅ TripMate 로고 
- ✅ 깔끔한 입력 폼
- ✅ 로그인, 회원가입, 게스트 버튼

---

## 🔧 문제 해결

### ❌ 스타일이 안 보여요 (텍스트만 보임)

**해결책 (반드시 순서대로!):**

#### Windows:
```bash
# 1. 서버 중지 (Ctrl+C)
# 2. 완전 초기화
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
# 3. 재설치
npm install
npm run dev
```

#### Mac/Linux:
```bash
# 1. 서버 중지 (Ctrl+C)
# 2. 완전 초기화
rm -rf node_modules
rm package-lock.json
npm cache clean --force
# 3. 재설치
npm install
npm run dev
```

**그래도 안 되면:**
1. Node.js 완전 삭제
2. Node.js 18 LTS 다시 설치: https://nodejs.org
3. 컴퓨터 재부팅
4. 위 과정 다시 실행

### ❌ 포트 3000이 이미 사용 중입니다

**해결책 1:** 다른 프로그램(Skype 등) 종료

**해결책 2:** `vite.config.ts` 파일에서 포트 변경
```typescript
server: {
  port: 3001,  // 3000 → 3001로 변경
},
```

### ❌ npm 명령어가 안 됩니다

**Node.js 설치 확인:**
```bash
node -v
# v18.0.0 이상 필요
```

Node.js 없으면 설치: https://nodejs.org

---

## 📁 프로젝트 구조

```
tripmate/
├── App.tsx              # 메인 앱
├── components/          # React 컴포넌트
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx  
│   ├── HomePage.tsx
│   ├── MapPage.tsx
│   └── SettingsPage.tsx
├── utils/
│   └── api.ts           # 백엔드 API 함수
├── styles/
│   └── globals.css      # Tailwind CSS 설정
├── package.json         # 의존성 목록
├── vite.config.ts       # Vite 설정
├── .env.example         # 환경 변수 템플릿
└── .gitignore           # Git 제외 파일
```

---

## 🌐 백엔드 연동 (선택사항)

### 환경 변수 설정

1. `.env.example` 파일을 복사해서 `.env` 파일 생성
2. 백엔드 서버 주소 입력:

```env
VITE_API_URL=http://localhost:8000/api
```

### API 함수 사용법

`/utils/api.ts`에 백엔드 통신 함수 준비됨:

- `login(username, password)` - 로그인
- `signup(username, email, password)` - 회원가입  
- `getPlaces(filters)` - 장소 목록
- `addToTripbook(placeId)` - 트립북 추가
- `calculateRoute(placeIds)` - 최적 경로

---

## 🎯 다음 단계

### GitHub에 업로드
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/사용자명/tripmate.git
git push -u origin main
```

### Vercel/Netlify 배포
1. GitHub 저장소 연결
2. 빌드 명령어: `npm run build`
3. 출력 디렉토리: `dist`
4. 환경 변수 설정: `VITE_API_URL`

---

**문제가 있으면 README.md 참고하거나 GitHub Issues에 문의하세요!** 💚💙
