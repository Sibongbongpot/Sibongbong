# 🗺️ 트립메이트 (TripMate)

경기권 관광 및 문화에 특화된 사용자 취향 기반 맞춤형 경로 추천 플랫폼

## ✨ 주요 기능

- 🔐 **로그인/회원가입** - 게스트 모드 지원
- 🗺️ **경기권 관광지 탐색** - 음식점, 숙소, 관광지 검색 및 표시
- 📍 **장소 세부정보** - 상세 정보 열람
- 📚 **트립북(장바구니)** - 관심 장소 저장 기능
- 🛤️ **최적화 경로 추천** - 저장된 장소들의 최적 경로 계산
- ⚙️ **사용자 취향 설정** - 여행 목적, 시간대, 지역 선호도 설정
- 🏨 **숙소 예약 UI** - 숙소 검색 및 예약 인터페이스

## 🎨 디자인

- **컬러 스킴**: 흰색, 초록색, 파란색 계열
- **화면 구성**: 로그인 → 홈 → 지도
- **애니메이션**: 트립북 추가 시 역동적인 효과

## 🛠️ 기술 스택

- ⚛️ **React** - UI 라이브러리
- 📘 **TypeScript** - 타입 안정성
- ⚡ **Vite** - 빌드 도구
- 🎨 **Tailwind CSS v3** - 스타일링
- 🧩 **shadcn/ui** - UI 컴포넌트
- 🎭 **Motion** - 애니메이션

## 🚀 빠른 시작

### 방법 1: ZIP 다운로드 (Figma Make 사용자)

```bash
# 1. Figma Make에서 Download 클릭
# 2. 압축 해제
# 3. 터미널에서 실행:

cd 압축해제한폴더
npm install
npm run dev
```

### 방법 2: GitHub 클론

```bash
git clone https://github.com/사용자명/tripmate.git
cd tripmate
npm install
npm run dev
```

**브라우저가 자동으로 `http://localhost:3000` 열림**

---

## 🔧 문제 해결

### ⚠️ 스타일이 텍스트로만 보인다면?

**1단계: 테스트 모드 활성화**

`App.tsx` 파일 9번째 줄:
```typescript
const TEST_MODE = true;  // false → true로 변경
```

저장 후 새로고침:
- ✅ 초록-파랑 화면 보임 → Tailwind 문제 → 2단계 진행
- ❌ 여전히 텍스트 → React 문제 → 3단계 진행

**2단계: 완전 초기화 (Tailwind 문제)**

**Windows:**
```bash
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run dev
```

**Mac/Linux:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

**3단계: Node.js 재설치 (React 문제)**

```bash
node -v  # v18.0.0 미만이면 재설치 필요
```

1. https://nodejs.org → LTS 다운로드
2. 설치 후 **컴퓨터 재부팅**
3. 2단계 다시 실행

**상세 가이드:**
- `긴급_디버깅_가이드.md` - 문제 진단
- `최종_해결_가이드.md` - 모든 해결 방법
- `LOCAL_SETUP.md` - 설치 가이드

## 📦 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 📁 프로젝트 구조

```
├── App.tsx                 # 메인 앱 컴포넌트
├── components/             # React 컴포넌트
│   ├── LoginPage.tsx      # 로그인 페이지
│   ├── SignupPage.tsx     # 회원가입 페이지
│   ├── HomePage.tsx       # 홈 페이지
│   ├── MapPage.tsx        # 지도 페이지
│   ├── SettingsPage.tsx   # 설정 페이지
│   └── ui/                # shadcn/ui 컴포넌트
├── utils/                  # 유틸리티 함수
│   └── api.ts             # 백엔드 API 통신
├── styles/                 # 스타일 파일
│   └── globals.css        # Tailwind CSS 설정
└── guidelines/            # 개발 가이드라인
    └── Guidelines.md
```

## 📝 개발 상태

- ✅ 로그인/회원가입 UI
- ✅ 게스트 모드
- ✅ 홈 화면 구성
- ✅ 트립북 UI
- ✅ 사용자 취향 설정 UI
- ✅ 백엔드 API 연동 준비 완료
- 🚧 지도 기능 (개발 예정)
- 🚧 실제 장소 데이터 연동
- 🚧 경로 최적화 알고리즘
- 🚧 숙소 예약 기능

## 🔗 백엔드 연동 가이드

### 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일 생성:

```bash
cp .env.example .env
```

`.env` 파일에서 백엔드 API 주소 설정:

```env
VITE_API_URL=http://localhost:8000/api
```

### API 사용 방법

`/utils/api.ts`에 백엔드 API 함수들이 준비되어 있습니다:

- `login()` - 로그인
- `signup()` - 회원가입
- `getPlaces()` - 장소 목록 조회
- `addToTripbook()` - 트립북에 추가
- `calculateRoute()` - 최적 경로 계산

### 백엔드 개발자를 위한 안내

1. **GitHub 저장소 클론**
2. **프론트엔드 코드 확인**: `/utils/api.ts`에서 필요한 API 엔드포인트 확인
3. **API 개발**: 해당 엔드포인트에 맞게 백엔드 구현
4. **CORS 설정**: 프론트엔드에서 백엔드 API 호출 가능하도록 설정
5. **코드 푸시**: 기능 완성 후 GitHub에 푸시

### 배포 시 자동 업데이트

Vercel/Netlify에 배포한 경우:

1. GitHub에 코드 푸시 (`git push`)
2. 자동으로 웹사이트 업데이트 (1-2분 소요)
3. 환경 변수는 배포 플랫폼에서 설정

## 📦 GitHub 업로드

### ⚠️ 중요: node_modules는 GitHub에 올리지 마세요!

`.gitignore` 파일이 자동으로 설정되어 있어 **node_modules**는 GitHub에 올라가지 않습니다.

**업로드 전 확인:**
```bash
git status
# node_modules가 목록에 없으면 성공! ✅
```

**GitHub 업로드 방법:**
1. **GitHub Desktop 사용** (초보자 추천 ⭐) - `GITHUB_업로드_가이드.md` 참고
2. **Git 터미널 사용** (고급 사용자) - `GitHub_체크리스트.md` 참고

**팀원이 코드를 받을 때:**
```bash
git clone https://github.com/사용자명/tripmate.git
cd tripmate
npm install     # ← 이것만 하면 node_modules 자동 생성!
npm run dev
```

**📋 관련 파일:**
- `GITHUB_업로드_가이드.md` - 상세한 업로드 방법
- `GitHub_체크리스트.md` - 단계별 체크리스트
- `.gitignore` - 제외 파일 목록 (이미 설정됨)

## 👥 기여

이슈 및 PR은 언제나 환영합니다!

## 📄 라이선스

MIT License
