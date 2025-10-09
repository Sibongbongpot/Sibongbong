# 📦 GitHub 업로드 완벽 가이드

## ✅ 준비 완료!

`.gitignore` 파일이 자동으로 생성되어 **node_modules**는 GitHub에 올라가지 않습니다!

---

## 🚀 GitHub에 올리는 방법

### 방법 1: GitHub Desktop 사용 (초보자 추천 ⭐)

#### 1️⃣ GitHub Desktop 설치
- https://desktop.github.com 에서 다운로드
- 설치 후 GitHub 계정으로 로그인

#### 2️⃣ 저장소 생성
1. File → New Repository 클릭
2. Name: `tripmate` 입력
3. Local Path: `D:\tripmate` 선택
4. "Initialize this repository with a README" **체크 해제**
5. Git Ignore: **None** (이미 .gitignore 있음)
6. Create Repository 클릭

#### 3️⃣ 첫 커밋
1. 좌측에 변경된 파일 목록 표시됨
2. **node_modules가 없는지 확인!** (있으면 안 됨)
3. Summary 입력: `초기 프로젝트 구성`
4. "Commit to main" 클릭

#### 4️⃣ GitHub에 업로드
1. 상단 "Publish repository" 클릭
2. Name: `tripmate`
3. Description: `경기권 맞춤형 여행 추천 플랫폼`
4. **"Keep this code private" 체크** (비공개로 하려면)
5. "Publish Repository" 클릭

✅ **완료!** 이제 GitHub에서 확인 가능합니다!

---

### 방법 2: 터미널 사용 (고급 사용자)

#### 1️⃣ Git 초기화
```bash
cd D:\tripmate
git init
```

#### 2️⃣ GitHub에 새 저장소 생성
1. https://github.com 접속
2. 우측 상단 + → New repository
3. Repository name: `tripmate`
4. Description: `경기권 맞춤형 여행 추천 플랫폼`
5. Public 또는 Private 선택
6. **"Add a README file" 체크 해제** (이미 있음)
7. Create repository

#### 3️⃣ 로컬에서 커밋 및 푸시
```bash
# Git 사용자 정보 설정 (최초 1회)
git config --global user.name "당신의이름"
git config --global user.email "당신의이메일@example.com"

# 파일 추가
git add .

# 커밋
git commit -m "초기 프로젝트 구성"

# 원격 저장소 연결 (GitHub에서 복사한 URL 사용)
git remote add origin https://github.com/사용자명/tripmate.git

# 메인 브랜치로 설정
git branch -M main

# 푸시
git push -u origin main
```

---

## ⚠️ 중요: node_modules 확인!

**업로드 전 반드시 확인:**

### GitHub Desktop 사용 시:
- 좌측 파일 목록에 **node_modules 폴더가 없어야 함**
- 있다면: `.gitignore` 파일이 제대로 작동 안 함

### 터미널 사용 시:
```bash
git status
```
실행 후 **node_modules가 목록에 없어야 함**

### 만약 node_modules가 보인다면:
```bash
# .gitignore 확인
cat .gitignore

# 캐시 삭제 후 다시 추가
git rm -r --cached .
git add .
git commit -m ".gitignore 적용"
```

---

## 📁 GitHub에 올라갈 파일 목록

✅ **올라가는 것:**
```
✅ App.tsx
✅ components/
✅ styles/
✅ utils/
✅ package.json          ← 중요!
✅ package-lock.json     ← 중요!
✅ tailwind.config.js
✅ vite.config.ts
✅ tsconfig.json
✅ README.md
✅ .gitignore
✅ 모든 소스 코드
```

❌ **올라가지 않는 것:**
```
❌ node_modules/        ← 절대 올라가면 안 됨!
❌ dist/                ← 빌드 결과물
❌ .env                 ← 환경 변수 (비밀 정보)
❌ .vscode/             ← 개인 에디터 설정
```

---

## 🔄 코드 수정 후 업데이트하는 방법

### GitHub Desktop:
1. 파일 수정 후 저장
2. GitHub Desktop에서 변경사항 확인
3. Summary 입력: `기능 추가` 등
4. "Commit to main"
5. 우측 상단 "Push origin" 클릭

### 터미널:
```bash
git add .
git commit -m "기능 추가"
git push
```

---

## 👥 팀원이 코드 받는 방법

### GitHub Desktop:
1. File → Clone Repository
2. URL: `https://github.com/사용자명/tripmate`
3. Local Path: 원하는 폴더 선택
4. Clone

### 터미널:
```bash
git clone https://github.com/사용자명/tripmate.git
cd tripmate
npm install        ← 중요! 의존성 설치
npm run dev
```

---

## 🌐 배포 (Vercel/Netlify)

### Vercel 배포 (추천):

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. `tripmate` 저장소 선택
5. Framework Preset: **Vite** 자동 감지
6. Deploy 클릭

**3분 후 자동으로 배포 완료!**

### Netlify 배포:

1. https://netlify.com 접속
2. "Add new site" → "Import an existing project"
3. GitHub 선택 → `tripmate` 저장소 선택
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy site 클릭

---

## 💡 자주 묻는 질문

**Q: package-lock.json도 올려야 하나요?**
A: 네! 올려야 합니다. 정확한 패키지 버전 고정용입니다.

**Q: .env 파일은요?**
A: 절대 안 됩니다! `.gitignore`에 이미 포함되어 있습니다.
   대신 `.env.example`만 올립니다.

**Q: dist 폴더는요?**
A: 올리지 않습니다. 배포 시 자동으로 빌드됩니다.

**Q: GitHub 용량 제한이 있나요?**
A: 파일당 100MB, 저장소당 1GB 권장.
   node_modules만 제외하면 문제없습니다!

**Q: 실수로 node_modules를 올렸어요!**
A: 다음 명령어로 삭제:
   ```bash
   git rm -r --cached node_modules
   git commit -m "node_modules 제거"
   git push
   ```

---

## ✅ 체크리스트

업로드 전 확인:

- [ ] `.gitignore` 파일 존재
- [ ] `git status`에 node_modules 없음
- [ ] README.md 작성 완료
- [ ] package.json에 프로젝트 정보 확인
- [ ] .env 파일이 .gitignore에 포함됨
- [ ] 코드가 로컬에서 정상 작동 (`npm run dev`)

---

## 🎯 GitHub 저장소 구조 예시

```
사용자명/tripmate
│
├── 📄 README.md                (프로젝트 설명)
├── 📄 package.json             (의존성 목록)
├── 📄 .gitignore               (제외 파일)
├── 📁 components/              (소스 코드)
├── 📁 styles/                  (스타일)
└── 📁 utils/                   (유틸리티)

❌ node_modules/                (없음!)
❌ dist/                        (없음!)
❌ .env                         (없음!)
```

---

## 🆘 문제 해결

### "node_modules가 계속 올라가요!"

**해결:**
```bash
# 1. Git 캐시 완전 삭제
git rm -r --cached .

# 2. .gitignore 확인
cat .gitignore

# 3. 다시 추가
git add .
git commit -m ".gitignore 재적용"
git push --force
```

### "파일이 너무 커서 푸시가 안 돼요"

**해결:**
```bash
# 100MB 이상 파일 찾기
find . -type f -size +100M

# 해당 파일을 .gitignore에 추가
echo "큰파일.zip" >> .gitignore
```

---

**이제 GitHub에 안전하게 업로드할 수 있습니다!** 🚀

node_modules는 **절대** 올라가지 않으니 안심하세요! 💚💙
