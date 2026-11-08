# 모아도와

NFC 동물 저금통과 연결하는 모바일 체험 사이트입니다.

## 수정과 배포

- `public/app.js`: 화면, 동물별 내용, 저금 체험, 모션
- `public/camera.js`: 카메라, 사진 합성, 실천 사진 기록
- `public/style.css`: 디자인과 반응형 레이아웃
- `public/assets/`: 원본 브랜드 SVG와 폰트
- `.github/workflows/pages.yml`: main 브랜치에 반영할 때 Pages 자동 배포

저장소 Settings → Pages → Build and deployment → Source에서 GitHub Actions를 선택합니다.
main 브랜치에 코드를 올리면 자동 배포됩니다. 첫 배포의 Actions 결과에서 실제 사이트 주소를 확인하세요.
`gaeunl3e/moadowa` 저장소를 사용하는 경우 기본 주소는 `https://gaeunl3e.github.io/moadowa/`입니다.

별도 빌드나 패키지 설치 없이 public 폴더를 배포합니다.
로컬 확인: `python3 -m http.server 8765 --directory public`

## 데이터와 기능

실제 계좌 연결·출금·이체는 제공하지 않습니다.
목표와 체험 저금은 localStorage, 실천 사진은 IndexedDB에 저장합니다.
브라우저·기기·사이트 주소가 바뀌면 기록은 자동으로 옮겨지지 않습니다.
기존 사이트에서 보관할 사진은 주소를 옮기기 전에 저장해두세요.
카메라는 HTTPS와 사용자 허용이 필요합니다.
현재 뉴스 기능은 사용하지 않으며 서버 API는 필요하지 않습니다.

## NFC

배포 완료 후 주소가 휴대폰에서 열리는 것을 확인하고 NFC 태그에 기록합니다.
동물별 직접 연결 예시: `https://gaeunl3e.github.io/moadowa/#animal/1`
저장소 이름과 주소를 유지하면 코드를 수정해도 NFC 주소를 다시 쓸 필요가 없습니다.
