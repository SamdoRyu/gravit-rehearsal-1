// 화면 확인용 예시 게시글 (#25)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { PAGE_SIZE } from '../src/postList.js'
import { SAMPLE_POSTS } from '../src/samplePosts.js'

test('두 페이지를 채울 만큼 있다', () => {
  assert.ok(SAMPLE_POSTS.length > PAGE_SIZE)
})

test('id가 겹치지 않는다', () => {
  const ids = SAMPLE_POSTS.map((p) => p.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('제목은 1~100자 (FR-POST-02)', () => {
  for (const { id, title } of SAMPLE_POSTS) {
    assert.ok(title.trim().length >= 1 && title.length <= 100, `id=${id}`)
  }
})

test('작성 시각은 시간대가 붙은 올바른 ISO 시각', () => {
  for (const { id, createdAt } of SAMPLE_POSTS) {
    assert.match(createdAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, `id=${id}`)
    assert.ok(!Number.isNaN(Date.parse(createdAt)), `id=${id}`)
  }
})

test('작성자가 비어 있지 않다', () => {
  for (const { id, author } of SAMPLE_POSTS) assert.ok(author, `id=${id}`)
})
