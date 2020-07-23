---
title: 아이디어 노트
permalink: /:collection/idea-note
key: plan
category: workportal
level: 00-계획
---

### Cache 전략
- Spring Boot Cache 적용, Redis 등 Cache 적용
- Request Data에 대한 Cache 처리
    - 일정 시간 동안 Request에 대한 Response 저장
    - Expire 전까지 Response Cache 데이터를 통한 처리
    - Expire 판단을 위한 Data Session Id 등 처리 필요
    - Session Id를 Param 또는 Http Header를 통해 처리
