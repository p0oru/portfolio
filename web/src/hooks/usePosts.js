import postsData from '../data/posts.json'

export function usePosts() {
  return { posts: postsData, loading: false }
}

export function usePost(slug) {
  const post = postsData.find((p) => p.slug === slug) || null
  return { post, loading: false }
}
