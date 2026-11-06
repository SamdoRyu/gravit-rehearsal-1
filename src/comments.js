// FR-CMT-01 댓글 목록 · 작성
export function addComment(comments, author, body) {
  if (!body.trim()) throw new Error('댓글을 써 주세요')
  return [...comments, { author, body: body.trim(), createdAt: new Date().toISOString() }]
}
