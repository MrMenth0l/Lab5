import { clearElement, createElement } from "../utils/dom.js";
import { truncateText } from "../utils/formatters.js";

export function renderPostCard(post, handlers = {}) {
  const card = createElement("article", { className: "post-card" });
  const badge = createElement("span", { className: "post-meta-id", text: `Post #${post.id}` });
  const title = createElement("h3", { className: "post-title", text: post.title });
  const excerpt = createElement("p", { className: "post-excerpt", text: truncateText(post.body, 140) });
  const author = createElement("p", { className: "post-author", text: `Autor: ${post.authorName}` });

  const tagsWrap = createElement("div", { className: "post-tags" });
  post.tags.slice(0, 3).forEach((tag) => {
    const tagEl = createElement("span", { className: "tag-chip", text: `#${tag}` });
    tagsWrap.appendChild(tagEl);
  });

  const actions = createElement("div", { className: "post-actions" });
  const detailBtn = createElement("button", {
    className: "btn btn-primary btn-sm",
    text: "Ver más"
  });
  detailBtn.addEventListener("click", () => {
    handlers.onView?.(post.id);
  });

  const deleteBtn = createElement("button", {
    className: "btn btn-danger btn-sm",
    text: "Eliminar"
  });
  deleteBtn.addEventListener("click", () => {
    handlers.onDelete?.(post.id);
  });

  actions.append(detailBtn, deleteBtn);
  card.append(badge, title, excerpt, author, tagsWrap, actions);
  return card;
}

export function renderPostList(container, posts, handlers = {}) {
  clearElement(container);
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    fragment.appendChild(renderPostCard(post, handlers));
  });

  container.appendChild(fragment);
}
