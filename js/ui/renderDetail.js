import { clearElement, createElement } from "../utils/dom.js";

export function renderPostDetail(container, post, options = {}) {
  clearElement(container);

  const article = createElement("article", { className: "detail-card surface-panel stack" });
  const top = createElement("div", { className: "detail-top" });
  const title = createElement("h2", { className: "detail-title", text: post.title });
  const meta = createElement("p", {
    className: "detail-meta",
    text: `Autor: ${post.authorName} · Post #${post.id}`
  });
  top.append(title, meta);

  const body = createElement("p", { className: "detail-body", text: post.body });
  const tags = createElement("div", { className: "post-tags" });
  post.tags.forEach((tag) => {
    tags.appendChild(createElement("span", { className: "tag-chip", text: `#${tag}` }));
  });

  const stats = createElement("p", {
    className: "detail-stats",
    text: `Reacciones: ${post.reactions} · Vistas: ${post.views}`
  });

  const actions = createElement("div", { className: "detail-actions" });
  const backBtn = createElement("button", {
    className: "btn btn-secondary",
    text: "Volver al inicio"
  });
  backBtn.addEventListener("click", () => options.onBack?.());

  const deleteBtn = createElement("button", {
    className: "btn btn-danger",
    text: "Eliminar (simulado)"
  });
  deleteBtn.addEventListener("click", () => options.onDelete?.(post.id));

  actions.append(backBtn, deleteBtn);
  article.append(top, body, tags, stats, actions);
  container.appendChild(article);
}
