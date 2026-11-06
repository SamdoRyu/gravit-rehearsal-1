// FR-CMT-01 댓글 목록 · 작성 — 1~500자
export const COMMENT_MAX = 500
export function addComment(comments, author, body) {
  const text = body.trim()
  if (!text) throw new Error('댓글을 써 주세요')
  if (text.length > COMMENT_MAX) throw new Error(`댓글은 ${COMMENT_MAX}자까지 쓸 수 있어요`)
  return [...comments, { author, body: text, createdAt: new Date().toISOString() }]
}
