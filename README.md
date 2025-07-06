# ANU SW Bot

## 📢 소개

[안동대학교 SW융합교육원](https://sw.anu.ac.kr) 게시판에 새로운 지원사업이나 공지사항이 게시될 경우 알려주는 슬랙 봇입니다.

> [!Note]
> [안동대학교 SW중심대학 사업 종료](https://www.swuniv.kr/organization/?q=YToyOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjtzOjc6ImtleXdvcmQiO3M6Njoi7JWI64%2BZIjt9&bmode=view&idx=6398912&t=board)로 더 이상 게시판에 지원사업이나 공지사항이 게시되지 않기 때문에, 본 서비스는 더 이상 운영되지 않습니다.

## 🛠 사용 도구

- Node.js
- Typescript
- Slack API - API(Webhook)로 채널에 메시지 전송
- MongoDB - 게시판 크롤링 결과, Webhook URL 저장
- [fly.io](https://fly.io) - Node.js 앱 호스팅
- GitHub Actions - fly.io에 배포 자동화
