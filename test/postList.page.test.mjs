// FR-POST-01 잘못된 페이지 번호 처리 (#21)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { PAGE_SIZE, pageCount, pageIndex, pageOf } from '../src/postList.js'

// 1분 간격으로 글 n개 — id가 클수록 나중에 쓴 글
function postsOf(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    createdAt: new Date(Date.UTC(2026, 10, 1, 9, i)).toISOString(),
  }))
}

const posts = postsOf(25) // 3페이지: 10 · 10 · 5
const ids = (page) => pageOf(posts, page).map((p) => p.id)

test('페이지 수', () => {
  assert.equal(pageCount([]), 0)
  assert.equal(pageCount(postsOf(10)), 1)
  assert.equal(pageCount(postsOf(11)), 2)
  assert.equal(pageCount(posts), 3)
})

test('숫자 문자열은 숫자와 같은 페이지', () => {
  assert.deepEqual(ids('1'), ids(1))
  assert.deepEqual(ids(' 2 '), ids(2))
})

test('정수가 아니거나 음수면 첫 페이지', () => {
  for (const page of [-1, 1.5, NaN, Infinity, undefined, null, '', 'abc', '1.5']) {
    assert.equal(pageIndex(page, posts), 0, `page=${String(page)}`)
  }
  assert.deepEqual(ids(-1), ids(0))
})

test('마지막을 넘는 번호는 마지막 페이지', () => {
  assert.equal(pageIndex(5, posts), 2)
  assert.deepEqual(ids(99), [5, 4, 3, 2, 1])
})

test('어떤 번호든 한 페이지는 10개를 넘지 않는다', () => {
  for (const page of [0, 1, 2, 3, -1, 1.5, '1', '11', NaN, undefined]) {
    assert.ok(pageOf(posts, page).length <= PAGE_SIZE, `page=${String(page)}`)
  }
})

test('글이 없으면 어떤 번호든 빈 배열', () => {
  assert.deepEqual(pageOf([], 0), [])
  assert.deepEqual(pageOf([], 3), [])
  assert.deepEqual(pageOf([], '1'), [])
})
