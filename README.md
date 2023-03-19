# ANU SW Slackbot

## 📢 소개
[안동대학교 SW융합교육원](https://sw.anu.ac.kr) 게시판에 새로운 지원사업이나 공지사항이 게시될 경우 알려주는 슬랙 봇입니다.

## 🛠 사용 도구
* Node.js
* Typescript
* Slack API - Webhook으로 채널에 메시지 전송
* MongoDB - 게시판 크롤링 결과, Webhook URL 저장
* Microsoft Azure
* ~~Google Cloud Platform - Azure로 이전~~

## 💻 설치
<a href="https://slack.com/oauth/v2/authorize?client_id=3621986322981.3610320568215&scope=incoming-webhook&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

## 📚 문의
* GitHub 내 [Issue]("https://github.com/plming/anu-sw-slackbot/issues")를 통해 문의해주세요

## 📝 TODO
- [x] GitHub Actions를 통한 자동 배포 구현
- [x] 비동기 처리 로직 개선
  - web scraping 과정에서 네트워크 I/O에 시간이 많이 소요됨
  - 개발환경 기준 7s에서 <1s로 단축시킴
