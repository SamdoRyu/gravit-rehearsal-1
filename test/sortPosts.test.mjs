// FR-POST-01 같은 작성 시각 글의 정렬 순서 고정 (#23)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { newestFirst } from '../src/sortPosts.js'

const sortIds = (posts) => [...posts].sort(newestFirst).map((p) => p.id)

test('최신 글이 위로', () => {
  const posts = [
    { id: 1, createdAt: '2026-11-01T09:00:00Z' },
    { id: 2, createdAt: '2026-11-01T09:05:00Z' },
    { id: 3, createdAt: '2026-11-01T09:01:00Z' },
  ]
  assert.deepEqual(sortIds(posts), [2, 3, 1])
})

test('같은 시각이면 입력 순서와 상관없이 id가 큰 글이 위로', () => {
  const same = '2026-11-01T09:00:00Z'
  const a = { id: 7, createdAt: same }
  const b = { id: 12, createdAt: same }
  const c = { id: 9, createdAt: same }
  for (const order of [[a, b, c], [c, b, a], [b, a, c]]) {
    assert.deepEqual(sortIds(order), [12, 9, 7])
  }
})

test('Z와 +09:00 표기가 섞여도 실제 시각 순서', () => {
  const posts = [
    { id: 1, createdAt: '2026-11-01T09:30:00+09:00' }, // 00:30Z
    { id: 2, createdAt: '2026-11-01T01:00:00Z' },
  ]
  assert.deepEqual(sortIds(posts), [2, 1])
})

test('표기는 달라도 같은 시각이면 id로', () => {
  const posts = [
    { id: 3, createdAt: '2026-11-01T09:00:00+09:00' },
    { id: 4, createdAt: '2026-11-01T00:00:00.000Z' },
  ]
  assert.deepEqual(sortIds(posts), [4, 3])
})

test('문자열 id는 숫자 크기로 비교', () => {
  const same = '2026-11-01T09:00:00Z'
  assert.deepEqual(sortIds([{ id: '9', createdAt: same }, { id: '10', createdAt: same }]), ['10', '9'])
})

test('읽을 수 없는 시각은 맨 아래로', () => {
  const posts = [
    { id: 1, createdAt: 'not-a-date' },
    { id: 2, createdAt: '2026-11-01T09:00:00Z' },
  ]
  assert.deepEqual(sortIds(posts), [2, 1])
})
