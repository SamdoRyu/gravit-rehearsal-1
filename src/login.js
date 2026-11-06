// FR-AUTH-01 로그인 API 연결
export async function login(email, password) {
  const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
  if (res.status === 401) throw new Error('이메일이나 비밀번호가 맞지 않아요')
  if (!res.ok) throw new Error('잠시 뒤 다시 시도해 주세요')
  return res.json()
}
