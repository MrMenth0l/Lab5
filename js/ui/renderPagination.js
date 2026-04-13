import { clearElement, createElement } from "../utils/dom.js";

function buildPageWindow(currentPage, totalPages) {
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}

export function renderPagination(container, meta, onPageChange) {
  clearElement(container);

  if (meta.totalPages <= 1) {
    return;
  }

  const nav = createElement("nav", {
    className: "pagination",
    attrs: { "aria-label": "Paginación de publicaciones" }
  });

  const prevButton = createElement("button", {
    className: "btn btn-secondary btn-sm",
    text: "Anterior",
    attrs: { type: "button", disabled: meta.page <= 1 }
  });
  prevButton.addEventListener("click", () => onPageChange(meta.page - 1));
  nav.appendChild(prevButton);

  const pageButtons = buildPageWindow(meta.page, meta.totalPages);
  pageButtons.forEach((page) => {
    const pageButton = createElement("button", {
      className: `page-btn ${page === meta.page ? "active" : ""}`,
      text: String(page),
      attrs: { type: "button" }
    });
    pageButton.addEventListener("click", () => onPageChange(page));
    nav.appendChild(pageButton);
  });

  const nextButton = createElement("button", {
    className: "btn btn-secondary btn-sm",
    text: "Siguiente",
    attrs: { type: "button", disabled: meta.page >= meta.totalPages }
  });
  nextButton.addEventListener("click", () => onPageChange(meta.page + 1));
  nav.appendChild(nextButton);

  container.appendChild(nav);
}
