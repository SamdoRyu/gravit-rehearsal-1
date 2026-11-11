// FR-POST-01 게시글 목록 — 최신 글이 위로, 10개씩
export const PAGE_SIZE = 10

// 페이지 번호(0부터)로 읽을 수 있는지 — 숫자 문자열은 숫자로 읽는다
export function isPageNumber(page) {
  const n = typeof page === 'string' && page.trim() !== '' ? Number(page) : page
  return Number.isInteger(n) && n >= 0
}

// 비교안(#21): 잘못된 번호 · 범위를 넘는 번호는 보정하지 않고 빈 배열 — 화면이 "없는 페이지"를 알린다
export function pageOf(posts, page) {
  if (!isPageNumber(page)) return []
  const index = Number(page)
  const sorted = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return sorted.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE)
}
