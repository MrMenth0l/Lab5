import { clearElement, createElement } from "../utils/dom.js";

export function renderFilters(container, options) {
  clearElement(container);

  const form = createElement("form", { className: "filters-form surface-panel" });

  const queryControl = createElement("div", { className: "filter-control" });
  const queryLabel = createElement("label", { text: "Buscar por texto" });
  queryLabel.setAttribute("for", "filter-query");
  const queryInput = createElement("input", {
    attrs: {
      id: "filter-query",
      name: "query",
      type: "search",
      placeholder: "Título o contenido...",
      value: options.filters.query || ""
    }
  });
  queryControl.append(queryLabel, queryInput);

  const authorControl = createElement("div", { className: "filter-control" });
  const authorLabel = createElement("label", { text: "Autor" });
  authorLabel.setAttribute("for", "filter-author");
  const authorSelect = createElement("select", {
    attrs: { id: "filter-author", name: "userId" }
  });
  authorSelect.appendChild(createElement("option", { text: "Todos", attrs: { value: "" } }));
  options.authors.forEach((author) => {
    const option = createElement("option", {
      text: author.label,
      attrs: { value: author.id }
    });
    if (String(options.filters.userId) === String(author.id)) {
      option.selected = true;
    }
    authorSelect.appendChild(option);
  });
  authorControl.append(authorLabel, authorSelect);

  const tagControl = createElement("div", { className: "filter-control" });
  const tagLabel = createElement("label", { text: "Tag" });
  tagLabel.setAttribute("for", "filter-tag");
  const tagSelect = createElement("select", { attrs: { id: "filter-tag", name: "tag" } });
  tagSelect.appendChild(createElement("option", { text: "Todos", attrs: { value: "" } }));
  options.tags.forEach((tag) => {
    const option = createElement("option", {
      text: `#${tag}`,
      attrs: { value: tag }
    });
    if (options.filters.tag === tag) {
      option.selected = true;
    }
    tagSelect.appendChild(option);
  });
  tagControl.append(tagLabel, tagSelect);

  const sortControl = createElement("div", { className: "filter-control" });
  const sortLabel = createElement("label", { text: "Orden" });
  sortLabel.setAttribute("for", "filter-sort");
  const sortSelect = createElement("select", { attrs: { id: "filter-sort", name: "sort" } });

  const sortOptions = [
    { value: "newest", label: "Más recientes" },
    { value: "oldest", label: "Más antiguos" },
    { value: "title-asc", label: "Título A-Z" },
    { value: "title-desc", label: "Título Z-A" }
  ];

  sortOptions.forEach((sortItem) => {
    const option = createElement("option", {
      text: sortItem.label,
      attrs: { value: sortItem.value }
    });
    if (options.filters.sort === sortItem.value) {
      option.selected = true;
    }
    sortSelect.appendChild(option);
  });
  sortControl.append(sortLabel, sortSelect);

  const actions = createElement("div", { className: "filter-actions" });
  const applyBtn = createElement("button", { className: "btn btn-primary", text: "Aplicar" });
  applyBtn.setAttribute("type", "submit");
  const resetBtn = createElement("button", {
    className: "btn btn-secondary",
    text: "Limpiar"
  });
  resetBtn.setAttribute("type", "button");
  resetBtn.addEventListener("click", () => options.onReset?.());
  actions.append(applyBtn, resetBtn);

  form.append(queryControl, authorControl, tagControl, sortControl, actions);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    options.onApply?.({
      query: String(formData.get("query") || "").trim(),
      userId: String(formData.get("userId") || ""),
      tag: String(formData.get("tag") || ""),
      sort: String(formData.get("sort") || "newest")
    });
  });

  container.appendChild(form);
}
