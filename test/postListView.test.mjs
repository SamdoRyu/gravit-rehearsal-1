// FR-POST-01 게시글이 없을 때 안내 문구 (#24)
// 실행: 레포 루트에서 `node --test` (Node 22 이상)
import test from 'node:test'
import assert from 'node:assert/strict'
import { EMPTY_MESSAGE, listView } from '../src/postListView.js'

test('글이 없으면 안내 문구', () => {
  assert.deepEqual(listView([]), { empty: true, message: EMPTY_MESSAGE, items: [] })
  assert.equal(EMPTY_MESSAGE, '아직 올라온 글이 없어요.')
})

test('배열이 아닌 값도 빈 목록으로', () => {
  for (const posts of [undefined, null, {}]) {
    assert.equal(listView(posts).empty, true)
  }
})

test('글이 있으면 해당 페이지의 글, 안내 문구 없음', () => {
  const posts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    createdAt: new Date(Date.UTC(2026, 10, 1, 9, i)).toISOString(),
  }))
  const first = listView(posts)
  assert.equal(first.empty, false)
  assert.equal(first.message, null)
  assert.equal(first.items.length, 10)
  assert.equal(first.items[0].id, 12)
  assert.deepEqual(listView(posts, 1).items.map((p) => p.id), [2, 1])
})
