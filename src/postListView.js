// FR-POST-01 게시글 목록 화면 상태 — 글이 없으면 안내 문구 (#24)
// DOM을 만지지 않는다. 화면은 이 결과를 보고 목록 또는 안내 문구를 그린다.
import { pageOf } from './postList.js'

export const EMPTY_MESSAGE = '아직 올라온 글이 없어요.'

export function listView(posts, page = 0) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return { empty: true, message: EMPTY_MESSAGE, items: [] }
  }
  return { empty: false, message: null, items: pageOf(posts, page) }
}
