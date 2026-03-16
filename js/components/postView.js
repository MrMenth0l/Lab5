import { truncateText } from '../utils/helpers.js';

export function renderPosts(container, posts = []) {
  container.innerHTML = '';

  posts.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'post-card';

    const tagsHtml = Array.isArray(post.tags)
      ? post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')
      : '';

    card.innerHTML = `
      <span class="post-id">Post #${post.id ?? 'nuevo'}</span>
      <h3 class="post-title">${escapeHtml(post.title)}</h3>
      <p class="post-body">${escapeHtml(truncateText(post.body, 150))}</p>
      <div class="post-footer">
        <span>User ID: ${post.userId ?? 'N/A'}</span>
        <div class="tags">${tagsHtml}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

export function clearPosts(container) {
  container.innerHTML = '';
}

function escapeHtml(text = '') {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}