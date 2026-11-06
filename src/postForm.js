// FR-POST-02 게시글 작성 폼 (작업 중)
export function titleError(title) {
  const t = title.trim()
  if (t.length === 0 || t.length > 100) return '제목은 1~100자로 써 주세요'
  return null
}
