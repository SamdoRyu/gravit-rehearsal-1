# GRAVIT 리허설 시나리오와 검증 절차

이 레포는 GRAVIT의 GitHub 연동 · 요구사항 추적 · 협업 기록 화면을 확인하기 위한 리허설용이다. 실제 서비스가 아니고 백엔드가 없다. 화면에 보이는 게시글은 `src/samplePosts.js`의 정적 예시 데이터다(#25).

표의 상태는 2026-11-10 기준이다. 리허설 전에 [3. GitHub에서 확인](#3-github에서-확인)의 명령으로 다시 확인한다.

## 1. 요구사항 → Issue → PR

요구사항 코드는 [requirements.md](requirements.md)의 `##` 제목 맨 앞 ID다. Issue 제목 앞의 `[FR-…]`는 사람이 읽기 위한 표기일 뿐이고, GRAVIT의 요구사항–Issue 연결은 GRAVIT 화면에서 따로 만든다.

| 요구사항 | Issue | PR | PR 상태 | 연결 |
|---|---|---|---|---|
| FR-AUTH-01 | #1 회원가입 폼 | #13 | 병합 | Closes |
| FR-AUTH-01 | #2 로그인 API 연결 | #15 | 열림 | Closes |
| FR-AUTH-01 | #20 검증 함수 테스트 | #32 | 열림 | Closes |
| FR-AUTH-01 | #22 이메일 앞뒤 공백 | #34 | 열림 | Closes |
| FR-AUTH-01 | #27 칸별 오류 표시 | — | PR 없음 | — |
| FR-AUTH-02 | #3 로그아웃 버튼 | — | PR 없음 | — |
| FR-POST-01 | #4 목록 화면 | #14 | 병합 | Closes |
| FR-POST-01 | #19 정렬 · 페이지 테스트 | #31 | 열림 | Closes |
| FR-POST-01 | #21 잘못된 페이지 번호 | #33 | 열림 | Closes |
| FR-POST-01 | #23 같은 시각 정렬 | #35 | Draft | Refs |
| FR-POST-01 | #24 빈 목록 안내 | #36 | 열림 | Closes |
| FR-POST-01 | #25 예시 글 · 목록 그리기 | #37 | Draft | Refs |
| FR-POST-01 | #29 페이지 이동 버튼 | — | PR 없음 | — |
| FR-POST-02 | #5 작성 폼 | #16 | Draft | Closes |
| FR-POST-03 | #6 수정 · 삭제 | — | PR 없음 | — |
| FR-CMT-01 | #7 댓글 | #17 | 열림 | Closes |
| FR-SRCH-01 | #8 제목 검색 | — | PR 없음 | — |
| NFR-01 | #9 모바일 레이아웃 | — | PR 없음 | — |
| (코드 없음) | #12 README 실행 방법 | #18 | 병합 없이 닫힘 | Closes |
| (FR-POST-01 · 02 · CMT-01) | #26 HTML로 해석하지 않고 출력 | — | PR 없음 | — |
| (폼 공통) | #28 레이블 · 키보드 접근성 | — | PR 없음 | — |
| (코드 없음) | #30 이 문서 | 이 문서를 추가한 PR | 열림 | Closes |

닫힌 Issue 중 #10(UTC 표시), #11(게시판 이름)은 PR 없이 닫혔다.

`Refs`로 이은 Draft(#35, #37)는 작업이 끝나지 않아 닫는 키워드를 쓰지 않았다. GitHub의 공식 연결(`closingIssuesReferences`)에는 잡히지 않고 Issue 타임라인의 언급으로만 남는다. 작업이 끝나 Ready로 바꿀 때 `Closes`로 바꾼다.

## 2. 상태별 예시

| 보여 주려는 상태 | 예시 |
|---|---|
| 병합된 PR | #13, #14 |
| 병합 없이 닫힌 PR | #18 |
| 열린 PR | #15, #17, #31, #32, #33, #34, #36 |
| Draft PR (닫는 키워드 있음) | #16 |
| Draft PR (`Refs`만) | #35, #37 |
| PR 없는 열린 Issue | #3, #6, #8, #9, #26, #27, #28, #29 |
| 같은 파일을 고치는 열린 PR | #33(`src/postList.js`) — #35가 병합 뒤 같은 줄을 고칠 예정 |
| 순서가 있는 작업 | #29는 #21 · #25 병합 뒤, #27은 #22 병합 뒤 |

## 3. GitHub에서 확인

`gh`가 로그인되어 있어야 한다. 쓰기 권한은 필요 없다.

```sh
R=SamdoRyu/gravit-rehearsal-1

# Issue 상태 · Label · 담당자
gh issue list -R $R --state all --limit 100 --json number,title,state,labels,assignees

# PR 상태 · Draft · head SHA · 작성자 · 공식 연결 Issue
gh pr list -R $R --state all --limit 100 \
  --json number,title,state,isDraft,headRefOid,author,closingIssuesReferences \
  --jq '.[] | [.number, .state, .isDraft, .headRefOid[0:7], .author.login, ([.closingIssuesReferences[].number] | join(","))] | @tsv'

# PR 하나의 커밋 이력
gh pr view 33 -R $R --json commits --jq '.commits[] | [.oid[0:7], .messageHeadline] | @tsv'
```

## 4. 코드 확인

```sh
node --test                # Node 22 이상, 레포 루트. 의존성 없음
```

브랜치마다 테스트 파일이 다르다(`test/*.test.mjs`). 화면은 `src/`를 정적 서버로 열어 본다(`npx serve src` 등). `src/index.html`을 파일로 바로 여는 방법은 #37이 모듈 스크립트를 쓰면서 막히며, 실행 방법은 #12 · #37에서 정한다.

## 5. GRAVIT에서 확인할 항목

GitHub에 데이터가 있는 것과 GRAVIT이 실제로 동기화해 보여 주는 것은 다르다. 리허설 기록에는 둘을 나눠 적는다.

| 확인할 것 | GitHub 데이터 | GRAVIT 화면에서 볼 것 |
|---|---|---|
| 요구사항 목록 | `docs/requirements.md`의 `##` 제목 8개 | 요구사항 ID와 제목이 그대로 읽히는지 |
| 요구사항–Issue 연결 | Issue 제목의 `[FR-…]` 표기 | 화면에서 직접 연결한 뒤 요구사항별 진행이 보이는지 |
| Issue–PR 연결 | `closingIssuesReferences`(1절의 Closes 행) | PR 옆에 연결 Issue가 보이는지, `Refs`(#35, #37)는 연결로 잡히지 않는지 |
| Draft PR | #16, #35, #37 | Draft로 구분되어 보이는지 |
| head SHA | 3절 `headRefOid` | 새 커밋이 생기면 값이 바뀌는지 |
| 병합 · 닫힘 | #13 · #14 병합, #18 닫힘 | 병합과 "병합 없이 닫힘"이 다르게 보이는지 |
| PR 없는 열린 Issue | 2절 목록 | 진행 중 작업과 구분되는지 |

GRAVIT 쪽 확인 결과는 이 문서가 아니라 리허설 기록에 남긴다.
