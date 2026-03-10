# CLAUDE.md — handonghyun 포트폴리오

Donghyun Han (Product Brand Designer)의 포트폴리오 사이트.
배포: https://skypretty.github.io/handonghyun/
저장소: https://github.com/skypretty/handonghyun

---

## 프로젝트 구조

```
handonghyun/
├── index.html                          # 메인 포트폴리오 (CSS/JS 인라인)
├── assets/
│   └── icons/
│       ├── favicon.png
│       └── yeogi-logo.svg
├── projects/
│   ├── favorite-brand/
│   │   ├── favorite-brand.html
│   │   ├── favorite-brand.css
│   │   └── favorite-brand.js
│   └── yeogi-visual-system/
│       ├── yeogi-visual-system.html
│       ├── yeogi-visual-system.css
│       └── yeogi-visual-system.js
└── README.md
```

### 완성된 프로젝트 vs 미완성 플레이스홀더

index.html에 11개 프로젝트 카드가 있으나 실제 파일은 2개만 존재함:

| 슬롯 | 링크 | 상태 | 연도 |
|------|------|------|------|
| 1 | projects/yeogi-visual-system/yeogi-visual-system.html | 완성 | 2025 |
| 2 | projects/project-2.html | **미완성** (파일 없음) | 2025 |
| 3 | projects/favorite-brand/favorite-brand.html | 완성 | 2025 |
| 4 | projects/project-4.html | **미완성** (파일 없음) | 2023 |
| 5 | projects/project-5.html | **미완성** (파일 없음) | 2023 |
| 6 | projects/project-6.html | **미완성** (파일 없음) | 2022 |
| 7 | projects/project-7.html | **미완성** (파일 없음) | 2022 |
| 8 | projects/project-8.html | **미완성** (파일 없음) | 2022 |
| 9 | projects/project-9.html | **미완성** (파일 없음) | 2022 |
| 10 | projects/project-10.html | **미완성** (파일 없음) | 2022 |
| 11 | projects/project-11.html | **미완성** (파일 없음) | 2021 |

미완성 프로젝트 이름 (index.html의 alt/title 기준):
- project-2: 여기어때 컴퍼니 : Product Brand
- project-4: Lambda256 : Brand, UX UI
- project-5: TBU : Brand
- project-6: Spacefarm : Character Brand
- project-7: Bello : Brand, UX UI
- project-8: Square : Brand, UX UI
- project-9: Zipper : Brand, UX UI
- project-10: Figures : Brand, UX UI
- project-11: Freelancer : Illustration

---

## 각 파일의 역할

### `index.html`
- 메인 랜딩 페이지. 3열 그리드로 프로젝트 카드 나열
- **CSS/JS가 인라인으로 포함됨** (프로젝트 페이지와 달리 외부 파일로 분리 안 됨)
- 다크 테마 (`#0a0a0a` 배경)
- 썸네일 이미지는 Cloudinary에서 로딩

### `projects/favorite-brand/`
- **favorite-brand.html**: 시멘틱 섹션 구조. Hero → Overview → Key Object → Design Process → Key Visuals → Concept to Reality 순서
- **favorite-brand.css**: 히어로 섹션, gif/video 그리드, 스티커 애니메이션, 무한 스크롤 SVG 트랙, 스크롤 페이드인 등 스타일
- **favorite-brand.js**: IntersectionObserver 기반 스크롤 애니메이션, 마우스 글로우 효과 (feature-card, process-step, info-item)

### `projects/yeogi-visual-system/`
- **yeogi-visual-system.html**: 갤러리 섹션 → Project Info (Overview) → Core Values → 2D Visuals → 3D Visuals → Illustrations → System Onboarding
- **yeogi-visual-system.css**: 갤러리, 플로팅 사이드 네비게이션, Core Value 필 애니메이션, 일러스트 팬 덱, 오브젝트 룰 카드, 아이콘 마퀴 등
- **yeogi-visual-system.js**: `InfiniteGallery` 클래스 (무한 드래그 갤러리), 플로팅 네비 스크롤 감지, 모달, 팬 덱 캐러셀, 룰 카드 드래그, overview 썸네일

---

## 기술 스택

- **Pure HTML/CSS/JS** — 프레임워크, 빌드 툴 없음
- **GitHub Pages** 호스팅 (별도 CI/CD 없음, main 브랜치 push로 바로 배포)
- **외부 폰트**:
  - Poppins (Google Fonts) — 모든 페이지
  - Pretendard (jsdelivr CDN) — favorite-brand만 사용
- **외부 이미지 스토리지**:
  - Cloudinary (`res.cloudinary.com/dv9pfybin`) — index.html 썸네일
  - Firebase Storage (`firebasestorage.googleapis.com`, 프로젝트 ID: `portfolio-37e15`) — 프로젝트 상세 이미지/영상
  - Cloudflare R2 (`pub-61ec350ba14f41ed9d298c92375918b9.r2.dev`) — yeogi 갤러리 2D/3D 이미지

---

## 코딩 스타일

### HTML
- 시멘틱 태그 사용 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`)
- 섹션 구분은 `id="section-[name]"` 패턴으로 앵커 지정
- 이미지는 `loading="lazy"` (히어로만 `loading="eager" fetchpriority="high"`)
- 비디오는 항상 `autoplay loop muted playsinline`

### CSS
- 리셋: `* { margin: 0; padding: 0; box-sizing: border-box; }`
- 기본 폰트: `'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`
- 카드 border-radius: `12px` 통일
- 표준 트랜지션: `0.3s ease` / 특수 애니메이션: `cubic-bezier(0.4, 0, 0.2, 1)`
- 마우스 글로우 효과: CSS 커스텀 프로퍼티 `--mouse-x`, `--mouse-y` + `::before`/`::after` 의사 요소
- 반응형: `@media (max-width: 768px)`, `@media (max-width: 1280px)`, `@media (min-width: 1800px)`
- 성능: `will-change: transform`, `contain: layout style paint`, `backface-visibility: hidden`
- 반응형 타이포그래피: `clamp()` 함수 활용

### JS
- Vanilla JS, 클래스 기반 (복잡한 컴포넌트는 `class` 사용 — `InfiniteGallery` 참고)
- 스크롤 감지: `IntersectionObserver` (애니메이션 트리거, 네비 active 상태)
- 애니메이션 루프: `requestAnimationFrame`
- 마우스 글로우: `mousemove` 이벤트 → `style.setProperty('--mouse-x', ...)` 패턴
- 결정론적 랜덤: 시드 기반 랜덤 함수 (`seededRandom`) — 새로고침해도 동일한 배치 보장
- IIFE `(function() { ... })()` — 독립적인 기능 단위 캡슐화

---

## 컬러 테마

| 페이지 | 배경 | 텍스트 | 강조 |
|--------|------|--------|------|
| index.html | `#0a0a0a` (다크) | `#ffffff` | — |
| 프로젝트 페이지 | `#ffffff` (라이트) | `#0a0a0a` | `#f94239` (여기어때 레드) |

---

## 네비게이션 구조

```
index.html
  └─ [클릭] → projects/[name]/[name].html
                  └─ [← Back to Portfolio] → ../../index.html
```

### favorite-brand 페이지 하단 프로젝트 간 네비게이션
- Previous / Next 링크가 있으나 현재 `project-2.html`, `project-4.html`로 연결 — **미완성 파일**
- 새 프로젝트 추가 시 이 링크도 함께 업데이트 필요

### yeogi-visual-system 플로팅 사이드 네비게이션
- 좌측 고정, 1280px 이하에서 숨김
- 섹션 ID: `section-overview`, `section-core-values`, `section-2d`, `section-3d`, `section-illustrations`, `section-onboarding`
- IntersectionObserver로 현재 섹션 자동 감지 → `.active` 클래스

---

## 새 프로젝트 페이지 추가 시 체크리스트

1. `projects/[project-name]/` 폴더 생성
2. `[project-name].html`, `[project-name].css`, `[project-name].js` 3파일로 구성
3. HTML에서 경로 참조:
   - favicon: `../../assets/icons/favicon.png`
   - 메인으로 돌아가기: `../../index.html`
   - CSS: `./[project-name].css`
   - JS: `./[project-name].js`
4. `index.html`의 해당 플레이스홀더 링크 업데이트
   - 예: `href="projects/project-4.html"` → `href="projects/lambda256/lambda256.html"`
5. 인접 프로젝트(favorite-brand 등)의 prev/next 링크도 업데이트

---

## 주의사항

- **index.html은 아직 CSS/JS 인라인** — 프로젝트 파일들과 달리 분리되지 않음
- Firebase Storage URL에는 `?alt=media&token=...` 쿼리가 포함됨 — 토큰 만료 시 이미지 깨짐
- `favorite-brand.html`의 prev/next 네비게이션이 존재하지 않는 파일을 가리킴 (`project-2.html`, `project-4.html`)
- GitHub Pages 배포는 `main` 브랜치 push 즉시 반영 (별도 배포 명령 불필요)
- Git 커밋 시 `.DS_Store` 파일 스테이징 주의 (현재 `.gitignore` 없음)
