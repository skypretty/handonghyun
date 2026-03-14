# YEOGI-VISUAL-SYSTEM 포트폴리오 작업 노트

여기어때 컴퍼니 Visual System 포트폴리오 페이지의 구조, 컴포넌트, 작업 이력, 고도화 계획을 정리한 참고 문서.
로컬 서버: `python3 -m http.server 3000` → http://localhost:3000/projects/yeogi-visual-system/yeogi-visual-system.html

---

## 파일 구조

```
projects/yeogi-visual-system/
├── yeogi-visual-system.html   # 마크업 (섹션 구조)
├── yeogi-visual-system.css    # 전체 스타일 (인라인 아님, 외부 파일)
├── yeogi-visual-system.js     # 인터랙션 로직
└── YEOGI-VISUAL-SYSTEM.md     # 이 파일
```

---

## 섹션 구조

| 순서 | 섹션 ID | 제목 | 상태 |
|------|---------|------|------|
| 0 | (없음) | 무한 드래그 갤러리 (Hero) | 완성 |
| 1 | `section-overview` | Overview / Project Info | 완성 |
| 2 | `section-core-values` | Core Values (Simple / Scalable / Lively) | 완성 |
| 3 | `section-2d` | 2D 그래픽 비주얼 시스템 | 완성 |
| 4 | `section-3d` | 3D 그래픽 비주얼 시스템 | 완성 |
| 5 | `section-illustrations` | 일러스트레이션 시스템 | 플레이스홀더 |
| 6 | `section-onboarding` | 디자인 시스템 온보딩 | 플레이스홀더 |

---

## 주요 컴포넌트 상세

### 1. 무한 드래그 갤러리 (Hero)

**JS 클래스:** `InfiniteGallery`
**구조:** 7×7 타일 반복 → 총 4,900개 아이템 (10×10 grid × 49 tiles)

| 항목 | 값 |
|------|-----|
| 아이템 크기 | 80×80px |
| 간격 | 50px |
| 자동 스크롤 속도 | 0.5px/frame |
| 시작 위치 | 3번째 타일 중앙 |
| 이미지 소스 | Cloudflare R2 (`pub-61ec350ba14f41ed9d298c92375918b9.r2.dev`) |

**이미지 세트:**
- `2d` 모드: R2 `/2d-graphic/` — 총 약 117개
- `3d` 모드: R2 `/3d-graphic/` — 총 약 117개

**주요 동작:**
- 시드 고정 랜덤(`seededRandom`, seed=137) → 새로고침해도 동일 배치
- `shuffleWithoutConsecutiveDuplicates()` → 같은 이미지 연속 방지
- 관성 스크롤: `velocity` + `requestAnimationFrame`
- 드래그 임계값: 5px (미만은 클릭으로 인식)
- 갤러리 호버 중 자동 스크롤 일시정지
- 2D/3D 토글 버튼 (`.control-toggle-button`) → `generateGalleryItems()` 재호출
- 드래그 툴팁: 최초 드래그 이후 영구 숨김 (`hasEverDragged`)
- 갤러리 영역 탈출 시 헤더 블러 제거 (`header.no-blur`)

---

### 2. Overview 섹션

**썸네일 클릭 → 메인 이미지 교체**
- `.overview-thumb` 클릭 → `#overview-main-img` src 변경
- `.active` 클래스 토글
- 이미지: Firebase Storage `/yeogi-visual-system/images/overview01~03.webp`

**Project Meta 카드:**
- 마우스 글로우 효과: `--mouse-x`, `--mouse-y` CSS 커스텀 프로퍼티
- `::before` (빨간 방사형 글로우) + `::after` (테두리 그라디언트)
- 강조색: `#f94239` (여기어때 레드)

---

### 3. Core Values 섹션

**Core Value Pills:** Simple / Scalable / Lively
- 스크롤 진입 시 fill 애니메이션 (IntersectionObserver)
- 각 카드에 `.core-value-graphic` 플레이스홀더 (현재 비어있음 → 고도화 필요)

---

### 4. 2D / 3D 비주얼 섹션

#### 2열 레이아웃 (`.section-2col`)
- Row 1: 정사각형 비주얼 | 텍스트 설명
- Row 2: 텍스트 설명 | 정사각형 비주얼 (`.section-2col-bottom`)
- `.section-visual-square`: 현재 일부 비어있음 → 이미지 추가 필요

#### 오브젝트 룰 카드 (`.object-rule-card`)

| 항목 | 값 |
|------|-----|
| 카드 크기 | 350×500px |
| 배경 | `#f7f7f7` |
| border-radius | 12px |
| 드래그 | 관성 기반 translateX |
| 클릭 | Rule Card 모달 오픈 |

**룰 카드 목록 (2D):** 그리드 시스템 / 컬러 팔레트 / 선 굵기 원칙 / 실루엣 명확성 / 라운드 처리 / 배경 독립성
**룰 카드 목록 (3D):** 광원 방향 / 재질 표현 / 그림자 처리 / 형태 일관성 / 색상 시스템 / 렌더링 기준

#### Rule Card 모달 (`.rule-modal`)

**현재 상태 (작업 후):**
```
[  .rule-modal-visual (좌 3fr)  ] [ .rule-modal-body (우 2fr) ]
                                     ├── .rule-modal-num
                                     ├── .rule-modal-title
                                     └── .rule-modal-desc
```

| 항목 | 값 |
|------|-----|
| 레이아웃 | grid 2열 (3fr : 2fr) |
| 최대 너비 | `min(840px, calc(100vw - 48px))` |
| 비율 | `aspect-ratio: 4 / 3` |
| 모바일 (<600px) | 세로 스택, visual에 `aspect-ratio: 4/3` 복원 |
| 열기 트리거 | 카드 클릭 (드래그 이동 중은 무시) |
| 닫기 | X 버튼 / 오버레이 클릭 / ESC |
| 진입 애니메이션 | `translateY(20px) scale(0.97)` → `translateY(0) scale(1)` |
| 배경 | `rgba(0,0,0,0.55)` + `backdrop-filter: blur(8px)` |

---

### 5. 3D 카테고리 아이콘 마퀴

- `.icon-marquee-track`: CSS `animation: marquee` 무한 가로 스크롤
- 아이콘 hover 시 `.hover-card` 툴팁 표시 (카테고리 설명)
- 이미지: Firebase Storage `/yeogi-visual-system/3d-category-icon/`
- 총 12개 카테고리: 해외숙소, 모텔, 호텔·리조트, 펜션·풀빌라, 홈앤빌라, 캠핑·글램핑, 게하·한옥, 공간대여, 항공, 항공+숙소, 렌터카, 레저티켓

---

### 6. 플로팅 사이드 네비게이션

- 좌측 고정 (`position: fixed`)
- `1280px` 이하에서 숨김 (`display: none`)
- IntersectionObserver로 현재 섹션 감지 → `.active` 클래스
- 섹션 ID 순서: overview → core-values → 2d → 3d → illustrations → onboarding

---

## 이미지 스토리지 경로

| 용도 | 스토리지 | 경로 패턴 |
|------|----------|----------|
| 갤러리 2D 이미지 | Cloudflare R2 | `pub-61ec350ba14f41ed9d298c92375918b9.r2.dev/2d-graphic/image-[name]-2d.png` |
| 갤러리 3D 이미지 | Cloudflare R2 | `pub-61ec350ba14f41ed9d298c92375918b9.r2.dev/3d-graphic/image-[name]-3d.png` |
| Overview 이미지 | Firebase Storage | `/yeogi-visual-system/images/overview0[1-3].webp` |
| 카테고리 아이콘 | Firebase Storage | `/yeogi-visual-system/3d-category-icon/[name].png` |
| 로고 가이드 | Firebase Storage | `/yeogi-visual-system/images/yeogi-logo-guide.webp` |
| As-is/To-be 비교 | Firebase Storage | `/yeogi-visual-system/images/home_category_icons_[asis|tobe].webp` |
| System Graphic | Firebase Storage | `/yeogi-visual-system/images/system_graphic.webp` |

---

## 코딩 컨벤션 (이 파일 한정)

```css
/* 레이아웃 */
max-width: 1200px;           /* 콘텐츠 섹션 */
padding: 60px 40px;          /* content-section 기본 패딩 */
border-radius: 12px;         /* 카드, 이미지 통일 */

/* 컬러 */
#0a0a0a  /* 기본 텍스트 */
#666666  /* 설명 텍스트 */
#999999  /* 보조 텍스트 */
#f5f5f5  /* 카드 배경 */
#ebebeb  /* 플레이스홀더 배경 */
#f94239  /* 여기어때 브랜드 레드 (강조에만 사용) */

/* 트랜지션 */
transition: 0.3s ease;       /* 기본 */
cubic-bezier(0.4, 0, 0.2, 1) /* 모달 등 특수 애니메이션 */
cubic-bezier(0.34, 1.56, 0.64, 1) /* 스프링 효과 (모달 진입) */
```

---

## 반응형 브레이크포인트

| 브레이크포인트 | 적용 대상 |
|---------------|----------|
| `max-width: 480px` | meta 카드 1열 |
| `max-width: 600px` | Rule Card 모달 세로 스택 |
| `max-width: 767px` | meta 카드 2열, section-2col 세로 |
| `max-width: 1280px` | 플로팅 네비 숨김 |
| `min-width: 1800px` | 폰트/패딩 확대 |

---

## 작업 이력

| 날짜 | 작업 내용 |
|------|----------|
| 2026-03-15 | Rule Card 모달 리디자인 — 560px 세로형 → 840px 가로 2단 4:3 비율, 반응형 모바일 폴백 추가 |

---

## 고도화 항목 (TODO)

### 우선순위 높음
- [ ] **Rule Card 모달 비주얼 영역** — `.rule-modal-visual` 현재 회색 빈 박스. 각 Rule에 맞는 실제 이미지/일러스트 연결 필요
- [ ] **`.section-visual-square` 이미지 채우기** — 2D/3D 섹션 정사각형 플레이스홀더에 실제 아셋 삽입
- [ ] **Core Value Graphic** — 각 pill의 `.core-value-graphic` 영역 시각화

### 우선순위 중간
- [ ] **Illustrations 섹션 고도화** — 현재 텍스트 카드 4개 + 빈 이미지 영역. 실제 일러스트 갤러리/팬덱으로 교체
- [ ] **System Onboarding 섹션 고도화** — 현재 텍스트 카드 4개. 실제 온보딩 플로우 시각화 추가
- [ ] **모달 키보드 트랩** — 모달 열린 상태에서 Tab 포커스가 모달 내부만 순환하도록

### 우선순위 낮음
- [ ] **갤러리 아이템 클릭 확대** — 현재 드래그만 가능, 개별 아이템 클릭 시 오브젝트명/카테고리 표시 고려
- [ ] **섹션 스크롤 진입 애니메이션 보완** — Core Values만 있음, 나머지 섹션 fade-in 추가
- [ ] **모바일 플로팅 네비 대체 UI** — 1280px 이하에서 대안 네비 제공 검토
