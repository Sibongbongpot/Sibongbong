# ✅ GitHub 업로드 체크리스트

## 📋 업로드 전 반드시 확인!

### 1️⃣ 파일 확인
- [x] `.gitignore` 파일 존재 ✅
- [ ] `README.md` 작성 완료
- [ ] `package.json` 확인

### 2️⃣ node_modules 제외 확인
- [ ] Git 상태 확인: `git status` 실행
- [ ] **node_modules가 목록에 없는지 확인!**
- [ ] GitHub Desktop 사용 시: 좌측 파일 목록에 node_modules 없음

### 3️⃣ 민감한 정보 제외
- [ ] `.env` 파일이 `.gitignore`에 포함됨 ✅
- [ ] API 키, 비밀번호 등 민감 정보 제거
- [ ] `.env.example`은 업로드 (실제 값 없이)

### 4️⃣ 로컬 테스트
- [ ] `npm run dev` 정상 작동 확인
- [ ] 에러 없이 실행됨

---

## 🚀 GitHub Desktop으로 업로드 (추천)

### 단계:
1. [ ] GitHub Desktop 설치
2. [ ] File → New Repository
3. [ ] 저장소 생성 (D:\tripmate)
4. [ ] 파일 목록에서 **node_modules 없는지 확인!**
5. [ ] Summary 입력: "초기 프로젝트 구성"
6. [ ] "Commit to main" 클릭
7. [ ] "Publish repository" 클릭

---

## 💻 터미널로 업로드 (고급)

### 명령어:
```bash
# 1. Git 초기화
cd D:\tripmate
git init

# 2. 파일 추가 전 확인!
git status
# ⚠️ node_modules가 보이면 안 됨!

# 3. 파일 추가
git add .

# 4. 커밋
git commit -m "초기 프로젝트 구성"

# 5. 원격 저장소 연결
git remote add origin https://github.com/사용자명/tripmate.git

# 6. 푸시
git branch -M main
git push -u origin main
```

---

## ❌ 절대 올리면 안 되는 것

```
❌ node_modules/           (200~500MB!)
❌ dist/                   (빌드 결과물)
❌ .env                    (비밀 정보)
❌ .DS_Store               (Mac 시스템 파일)
❌ Thumbs.db               (Windows 시스템 파일)
```

이미 `.gitignore`에 모두 설정되어 있습니다! ✅

---

## ✅ 반드시 올라가야 하는 것

```
✅ package.json            (의존성 목록)
✅ package-lock.json       (버전 고정)
✅ App.tsx                 (소스 코드)
✅ components/             (컴포넌트)
✅ tailwind.config.js      (설정 파일)
✅ README.md               (설명서)
✅ .gitignore              (제외 목록)
```

---

## 🔍 업로드 후 확인

### GitHub 웹사이트에서:
1. [ ] 저장소 페이지 접속
2. [ ] 파일 목록에 **node_modules 없음** 확인
3. [ ] README.md가 잘 표시됨
4. [ ] 파일 개수: 약 70개 (node_modules 없이)

### 용량 확인:
- [ ] 전체 저장소 크기: **10MB 이하** (node_modules 제외 시)
- [ ] 만약 50MB 이상이면: node_modules가 포함된 것!

---

## 🆘 문제 해결

### "node_modules가 계속 올라가요!"

**원인:** Git 캐시에 이미 추가됨

**해결:**
```bash
git rm -r --cached node_modules
git commit -m "node_modules 제거"
git push --force
```

### "파일이 100MB 넘어서 에러!"

**원인:** 큰 파일이 포함됨

**확인:**
```bash
find . -type f -size +50M
```

**해결:** 해당 파일을 `.gitignore`에 추가

---

## 🎉 성공 확인

다음이 모두 맞으면 성공!

- ✅ GitHub에서 저장소 확인 가능
- ✅ 파일 목록에 node_modules 없음
- ✅ 저장소 크기 10MB 이하
- ✅ README.md가 잘 표시됨
- ✅ 팀원이 clone 후 `npm install` 가능

---

## 👨‍💻 팀원 초대

### GitHub 웹사이트:
1. 저장소 → Settings
2. Collaborators
3. Add people
4. 팀원 GitHub 아이디 입력
5. 초대 전송

### 팀원이 코드 받기:
```bash
git clone https://github.com/사용자명/tripmate.git
cd tripmate
npm install        # ← 자동으로 node_modules 생성됨!
npm run dev
```

---

## 📌 꿀팁

### 자주 사용하는 Git 명령어:
```bash
# 상태 확인
git status

# 변경사항 보기
git diff

# 커밋 히스토리
git log --oneline

# 원격 저장소 확인
git remote -v

# 브랜치 목록
git branch
```

---

**이 체크리스트를 따라하면 100% 성공합니다!** 💚💙

**핵심:** node_modules는 `.gitignore` 덕분에 자동으로 제외됩니다! ✅
