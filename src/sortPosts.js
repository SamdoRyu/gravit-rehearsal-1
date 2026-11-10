// FR-POST-01 게시글 정렬 — 최신 글이 위로, 작성 시각이 같으면 id가 큰 글이 위로 (#23)
// 작업 중: 아직 pageOf에 연결하지 않았다. #21이 병합된 뒤 postList.js에서 이 함수를 쓴다.

function timeOf(post) {
  const t = Date.parse(post.createdAt)
  return Number.isNaN(t) ? -Infinity : t // 읽을 수 없는 시각은 맨 아래로
}

function compareIds(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'en', { numeric: true })
}

export function newestFirst(a, b) {
  const byTime = timeOf(b) - timeOf(a)
  if (byTime !== 0 && !Number.isNaN(byTime)) return byTime
  return compareIds(b.id, a.id)
}
