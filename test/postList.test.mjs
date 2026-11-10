// FR-POST-01 게시글 목록 — 최신 글이 위로, 10개씩 (#19)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { PAGE_SIZE, pageOf } from '../src/postList.js'

// 1분 간격으로 글 n개 — id가 클수록 나중에 쓴 글
function postsOf(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    title: `글 ${i + 1}`,
    createdAt: new Date(Date.UTC(2026, 10, 1, 9, i)).toISOString(),
  }))
}

test('한 페이지는 10개', () => {
  assert.equal(PAGE_SIZE, 10)
})

test('첫 페이지는 최신 10개를 최신순으로', () => {
  const ids = pageOf(postsOf(25), 0).map((p) => p.id)
  assert.deepEqual(ids, [25, 24, 23, 22, 21, 20, 19, 18, 17, 16])
})

test('입력 순서와 상관없이 최신순', () => {
  const [p1, p2, p3, p4, p5] = postsOf(5)
  assert.deepEqual(pageOf([p3, p1, p5, p2, p4], 0).map((p) => p.id), [5, 4, 3, 2, 1])
})

test('두 번째 페이지는 그다음 10개', () => {
  const ids = pageOf(postsOf(25), 1).map((p) => p.id)
  assert.deepEqual(ids, [15, 14, 13, 12, 11, 10, 9, 8, 7, 6])
})

test('마지막 페이지는 남은 글만', () => {
  const ids = pageOf(postsOf(25), 2).map((p) => p.id)
  assert.deepEqual(ids, [5, 4, 3, 2, 1])
})

test('글이 10개 이하면 첫 페이지에 전부', () => {
  assert.equal(pageOf(postsOf(7), 0).length, 7)
})

test('넘겨받은 배열의 순서를 바꾸지 않는다', () => {
  const posts = postsOf(12)
  const before = posts.map((p) => p.id)
  pageOf(posts, 0)
  assert.deepEqual(posts.map((p) => p.id), before)
})
