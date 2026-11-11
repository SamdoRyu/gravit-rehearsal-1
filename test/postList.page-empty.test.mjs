// FR-POST-01 잘못된 페이지 번호 처리 — 빈 목록 비교안 (#21)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { PAGE_SIZE, isPageNumber, pageOf } from '../src/postList.js'

function postsOf(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    createdAt: new Date(Date.UTC(2026, 10, 1, 9, i)).toISOString(),
  }))
}

const posts = postsOf(25) // 3페이지: 10 · 10 · 5

test('숫자 문자열은 숫자와 같은 페이지', () => {
  assert.deepEqual(pageOf(posts, '1'), pageOf(posts, 1))
  assert.equal(pageOf(posts, '1').length, PAGE_SIZE)
})

test('정수가 아니거나 음수면 빈 배열', () => {
  for (const page of [-1, 1.5, NaN, Infinity, undefined, null, '', 'abc', '1.5']) {
    assert.equal(isPageNumber(page), false, `page=${String(page)}`)
    assert.deepEqual(pageOf(posts, page), [], `page=${String(page)}`)
  }
})

test('범위를 넘는 번호도 빈 배열 (보정하지 않음)', () => {
  assert.deepEqual(pageOf(posts, 3), [])
  assert.deepEqual(pageOf(posts, 99), [])
})

test('올바른 번호는 지금과 같다', () => {
  assert.deepEqual(pageOf(posts, 2).map((p) => p.id), [5, 4, 3, 2, 1])
})

test('어떤 번호든 한 페이지는 10개를 넘지 않는다', () => {
  for (const page of [0, 1, 2, '1', '11', 1.5, -1]) {
    assert.ok(pageOf(posts, page).length <= PAGE_SIZE, `page=${String(page)}`)
  }
})
