// FR-AUTH-01 회원가입 폼 — 이메일 · 비밀번호 · 비밀번호 확인
export function signupError({ email, password, confirm }) {
  if (!/^[^@\s]+@[^@\s]+$/.test(email)) return '이메일 형식이 아니에요'
  if (password.length < 8) return '비밀번호는 8자 이상이에요'
  if (password !== confirm) return '비밀번호가 서로 달라요'
  return null
}
