// FR-AUTH-01 회원가입 폼 검사 (#20)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { signupError } from '../src/signup.js'

const valid = { email: 'study@example.com', password: 'password1', confirm: 'password1' }

test('올바른 입력이면 오류 없음', () => {
  assert.equal(signupError(valid), null)
})

test('@가 없는 이메일은 이메일 오류', () => {
  assert.equal(signupError({ ...valid, email: 'study.example.com' }), '이메일 형식이 아니에요')
})

test('@ 앞이나 뒤가 비면 이메일 오류', () => {
  assert.equal(signupError({ ...valid, email: '@example.com' }), '이메일 형식이 아니에요')
  assert.equal(signupError({ ...valid, email: 'study@' }), '이메일 형식이 아니에요')
})

test('이메일 중간에 공백이 있으면 이메일 오류', () => {
  assert.equal(signupError({ ...valid, email: 'stu dy@example.com' }), '이메일 형식이 아니에요')
})

test('비밀번호는 8자부터 통과', () => {
  assert.equal(signupError({ ...valid, password: '1234567', confirm: '1234567' }), '비밀번호는 8자 이상이에요')
  assert.equal(signupError({ ...valid, password: '12345678', confirm: '12345678' }), null)
})

test('비밀번호와 확인이 다르면 확인 오류', () => {
  assert.equal(signupError({ ...valid, confirm: 'password2' }), '비밀번호가 서로 달라요')
})

test('여러 칸이 틀리면 이메일 → 비밀번호 → 확인 순서로 첫 오류만', () => {
  assert.equal(signupError({ email: 'bad', password: 'short', confirm: 'other' }), '이메일 형식이 아니에요')
  assert.equal(signupError({ ...valid, password: 'short', confirm: 'other' }), '비밀번호는 8자 이상이에요')
})
