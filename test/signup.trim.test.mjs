// FR-AUTH-01 회원가입 이메일 앞뒤 공백 처리 (#22)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeSignup, signupError } from '../src/signup.js'

const valid = { email: 'study@example.com', password: 'password1', confirm: 'password1' }

test('이메일 앞뒤 공백 · 줄바꿈은 오류가 아니다', () => {
  assert.equal(signupError({ ...valid, email: '  study@example.com  ' }), null)
  assert.equal(signupError({ ...valid, email: '\tstudy@example.com\n' }), null)
})

test('normalizeSignup은 이메일 앞뒤 공백을 지운다', () => {
  assert.equal(normalizeSignup({ ...valid, email: ' study@example.com ' }).email, 'study@example.com')
})

test('비밀번호 앞뒤 공백은 지우지 않는다', () => {
  const input = { ...valid, password: ' password1 ', confirm: ' password1 ' }
  assert.equal(normalizeSignup(input).password, ' password1 ')
  assert.equal(normalizeSignup(input).confirm, ' password1 ')
  assert.equal(signupError({ ...valid, password: ' password1 ' }), '비밀번호가 서로 달라요')
})

test('이메일 중간 공백은 여전히 오류', () => {
  assert.equal(signupError({ ...valid, email: ' stu dy@example.com ' }), '이메일 형식이 아니에요')
})

test('공백뿐인 이메일 · 빠진 칸은 이메일 오류', () => {
  assert.equal(signupError({ ...valid, email: '   ' }), '이메일 형식이 아니에요')
  assert.equal(signupError({ password: 'password1', confirm: 'password1' }), '이메일 형식이 아니에요')
})
