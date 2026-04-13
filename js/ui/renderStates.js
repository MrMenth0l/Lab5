import { clearElement, createElement } from "../utils/dom.js";

function createStateBlock(type, title, message) {
  const wrapper = createElement("article", { className: `state-card state-${type}` });
  const titleEl = createElement("h3", { className: "state-title", text: title });
  const textEl = createElement("p", { className: "state-message", text: message });
  wrapper.append(titleEl, textEl);
  return wrapper;
}

export function renderFeedbackBanner(container, ui) {
  clearElement(container);

  if (ui.error) {
    container.appendChild(createStateBlock("error", "Error", ui.error));
    return;
  }

  if (ui.success) {
    container.appendChild(createStateBlock("success", "Éxito", ui.success));
  }
}

export function renderLoadingState(container, message = "Cargando información...") {
  clearElement(container);
  container.appendChild(createStateBlock("loading", "Cargando", message));
}

export function renderErrorState(container, message, onRetry) {
  clearElement(container);
  const block = createStateBlock("error", "Error", message);

  if (typeof onRetry === "function") {
    const retryButton = createElement("button", {
      className: "btn btn-secondary",
      text: "Reintentar"
    });
    retryButton.addEventListener("click", onRetry);
    block.appendChild(retryButton);
  }

  container.appendChild(block);
}

export function renderEmptyState(container, message = "No hay resultados.") {
  clearElement(container);
  container.appendChild(createStateBlock("empty", "Sin resultados", message));
}

export function showToast(type, message, duration = 3000) {
  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    return;
  }

  const toast = createElement("div", {
    className: `toast toast-${type === "error" ? "error" : "success"}`,
    text: message
  });

  toastRoot.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, duration);
}
