# ANU SW Slackbot
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy to App Engine](https://github.com/plming/anu-sw-slackbot/actions/workflows/main.yml/badge.svg)](https://github.com/plming/anu-sw-slackbot/actions/workflows/main.yml)

## 📢 소개
[안동대학교 SW융합교육원](https://sw.anu.ac.kr)내 새로운 지원사업이 게시돼도 놓치는 경우가 생겨 만든, 채널에 메시지를 전송하여 알려주는 슬랙 봇입니다.

## 🛠 사용 도구
* Node.js
* Typescript
* Slack API - Webhook으로 채널에 메시지 전송
* MongoDB - 게시판 크롤링 결과를 저장
* Google Cloud Platform
  * App Engine - 앱 배포
  * Cloud Scheduler - 지원사업 게시판의 변경사항을 주기적으로 확인하는 cron 작업 처리
* Insomnia - REST API 테스트용으로 사용

## 🖥 배포
### 로컬 환경
```bash
# 슬랙봇 서버 실행
npm run start

# OS에서 /run에 GET 요청하도록 cron 작업 설정
```
### Google Cloud Platform
```bash
# Google Cloud SDK 초기화
gcloud init

# App Engine에 배포
gcloud app deploy

# 이후 Cloud Scheduler애서 /run에 GET 요청하도록 cron 작업 설정
```

## 💻 데모
<img width="50%" alt="slackbot demo" src="https://user-images.githubusercontent.com/8957536/174318945-e9ed98c4-4cbf-4737-8153-e8fa4dff93d4.png">

> [Slack 라이브 데모](https://join.slack.com/t/anu-sw-slackbot/shared_invite/zt-1a97t7g3n-o8cWFgwSHBDhqqHBFekYyQ)

## 📝 TODO
- [ ] 슬랙 메시지 UI 개선
- [ ] 기존 지원사업 내용 변경시 추가로 알리는 기능 구현
- [x] Github Actions를 사용하여 지속적 배포(CD) 구현
  - 우선 Cloud Build에서 Github push를 추적하게 하였지만, 단순 repo 복제라서 secret을 전달하는게 불가능
  - 따라서 Github Actions를 사용해 .env 파일 생성 및 주입함
- [x] 비동기 처리 로직 개선
  - web scraping 과정에서 네트워크 I/O에 시간이 많이 소요됨
  - 비동기 처리 학습 후 async, await, promise를 사용해 리팩토링함
  - 개발환경 기준 7s에서 <1s로 단축시킴