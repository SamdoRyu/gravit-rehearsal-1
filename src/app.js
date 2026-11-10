// 스터디 게시판 — 화면 진입점
// 작업 중(#25): 백엔드가 없어 예시 글로 첫 페이지만 그린다.
// 남은 일 — 빈 목록 안내(#24) 연결, 페이지 이동(#29), 로컬 실행 방법(#12)
import { pageOf } from './postList.js'
import { SAMPLE_POSTS } from './samplePosts.js'

const app = document.getElementById('app')

const note = document.createElement('p')
note.textContent = '예시 데이터입니다. 서버에서 불러온 글이 아니에요.'

const list = document.createElement('ol')
for (const post of pageOf(SAMPLE_POSTS, 0)) {
  const item = document.createElement('li')
  const title = document.createElement('strong')
  title.textContent = post.title // 사용자 글은 textContent로만 (#26)
  const meta = document.createElement('span')
  meta.textContent = ` · ${post.author} · ${formatTime(post.createdAt)}`
  item.append(title, meta)
  list.append(item)
}

app.replaceChildren(note, list)

function formatTime(iso) {
  return new Date(iso).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'medium', timeStyle: 'short' })
}
