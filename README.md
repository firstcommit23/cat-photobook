## 프로그래머스 [고양이 사진첩] 테스트 과제 해설보면서 작성중입니다

['2021 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 기출 문제 해설](https://prgms.tistory.com/53)


## 디렉토리 구조

```bash
├── asset
├── src
│    ├── components
│    │    ├── Breadcrumb.js
│    │    ├── ImageView.js
│    │    ├── Loading.js
│    │    └── Nodes.js
│    ├── styles
│    │    ├── style.css
│    ├── api.js
│    ├── App.js
│    └── index.js
└── index.html
```


#### 심화 학습
- **모듈**과 기본 디렉토리 구조 및 작동 방식 익숙해 지기 (react의 바닐라 자바스크립트 버전)
- **화살표 함수**(this) : 화살표 함수와 일반 함수의 차이점 조금 더 상세히 파악하기
- **선언적 프로그래밍** : 명령형 프로그래밍 방식으로 코드 작성할 경우 어느 지점에서 어느 시점에 DOM을 업데이트 했느냐를 추적하기가 점점 힘들어진다고 설명하고 있는데 차이점에 대해 좀 더 명확하게 공부해 볼 것
- **$element.dataset** : DOM 객체 접근 시 dataset을 활용하면 html 요소에 추가 정보를 저장할 수 있음. 
- **async ~ await** : 비동기 함수를 동기식 문법으로 작성하기 위한 문법으로 실제 활용하면서 개념으로 익힌 내용 실습. Promise 객체에 대해 추가 공부 필요