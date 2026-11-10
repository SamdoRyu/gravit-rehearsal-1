// FR-POST-01 게시글 목록 — 최신 글이 위로, 10개씩
export const PAGE_SIZE = 10

// 페이지 수 — 글이 없으면 0
export function pageCount(posts) {
  return Math.ceil(posts.length / PAGE_SIZE)
}

// 보여 줄 페이지 번호(0부터) — 숫자 문자열은 숫자로 읽고,
// 정수가 아니거나 음수면 첫 페이지, 마지막을 넘으면 마지막 페이지
export function pageIndex(page, posts) {
  const n = typeof page === 'string' && page.trim() !== '' ? Number(page) : page
  if (!Number.isInteger(n) || n < 0) return 0
  return Math.min(n, Math.max(pageCount(posts) - 1, 0))
}

export function pageOf(posts, page) {
  const sorted = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const index = pageIndex(page, posts)
  return sorted.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE)
}
