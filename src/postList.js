// FR-POST-01 게시글 목록 — 최신 글이 위로, 10개씩
export const PAGE_SIZE = 10
export function pageOf(posts, page) {
  const sorted = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
}
