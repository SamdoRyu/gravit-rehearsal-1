// FR-AUTH-01 회원가입 폼 — 이메일 · 비밀번호 · 비밀번호 확인

// 가입 요청에 쓸 값 — 이메일만 앞뒤 공백을 지운다. 비밀번호는 공백도 그대로 둔다.
export function normalizeSignup({ email = '', password = '', confirm = '' }) {
  return { email: email.trim(), password, confirm }
}

export function signupError(input) {
  const { email, password, confirm } = normalizeSignup(input)
  if (!/^[^@\s]+@[^@\s]+$/.test(email)) return '이메일 형식이 아니에요'
  if (password.length < 8) return '비밀번호는 8자 이상이에요'
  if (password !== confirm) return '비밀번호가 서로 달라요'
  return null
}
