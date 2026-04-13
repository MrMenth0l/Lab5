import { clearElement, createElement } from "../utils/dom.js";

export function renderFormErrors(fields, errors) {
  Object.entries(fields).forEach(([fieldName, fieldElement]) => {
    if (!fieldElement.error) {
      return;
    }
    fieldElement.error.textContent = errors[fieldName] || "";
  });
}

export function renderCreateForm(container, options = {}) {
  clearElement(container);

  const card = createElement("section", { className: "surface-panel create-form-card" });
  const title = createElement("h2", { className: "view-title", text: "Crear nueva publicación" });
  const subtitle = createElement("p", {
    className: "view-subtitle",
    text: "Completa el formulario y envía el POST hacia la API pública."
  });

  const form = createElement("form", { className: "create-form" });

  const titleField = buildTextField({
    id: "post-title",
    name: "title",
    label: "Título",
    placeholder: "Escribe un título claro",
    minLength: 5
  });

  const bodyField = buildTextAreaField({
    id: "post-body",
    name: "body",
    label: "Contenido",
    placeholder: "Describe tu publicación",
    minLength: 20
  });

  const userField = buildSelectField({
    id: "post-user-id",
    name: "userId",
    label: "Autor",
    options: options.users || []
  });

  const actions = createElement("div", { className: "form-actions" });
  const submitBtn = createElement("button", {
    className: "btn btn-primary",
    text: "Publicar"
  });
  submitBtn.setAttribute("type", "submit");

  const resetBtn = createElement("button", {
    className: "btn btn-secondary",
    text: "Limpiar"
  });
  resetBtn.setAttribute("type", "button");
  actions.append(submitBtn, resetBtn);

  form.append(titleField.wrap, bodyField.wrap, userField.wrap, actions);
  card.append(title, subtitle, form);
  container.appendChild(card);

  const fields = {
    title: {
      input: titleField.input,
      error: titleField.error
    },
    body: {
      input: bodyField.input,
      error: bodyField.error
    },
    userId: {
      input: userField.input,
      error: userField.error
    }
  };

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitBtn.textContent = isSubmitting ? "Publicando..." : "Publicar";
  }

  resetBtn.addEventListener("click", () => {
    form.reset();
    renderFormErrors(fields, {});
    options.onReset?.();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      title: String(formData.get("title") || "").trim(),
      body: String(formData.get("body") || "").trim(),
      userId: Number(formData.get("userId"))
    };

    options.onSubmit?.({
      payload,
      form,
      fields,
      setSubmitting
    });
  });
}

function buildTextField(config) {
  const wrap = createElement("div", { className: "form-control" });
  const label = createElement("label", { text: config.label });
  label.setAttribute("for", config.id);
  const input = createElement("input", {
    attrs: {
      id: config.id,
      name: config.name,
      type: "text",
      minlength: config.minLength,
      placeholder: config.placeholder
    }
  });
  const error = createElement("p", { className: "form-error" });
  wrap.append(label, input, error);
  return { wrap, input, error };
}

function buildTextAreaField(config) {
  const wrap = createElement("div", { className: "form-control" });
  const label = createElement("label", { text: config.label });
  label.setAttribute("for", config.id);
  const input = createElement("textarea", {
    attrs: {
      id: config.id,
      name: config.name,
      rows: 7,
      minlength: config.minLength,
      placeholder: config.placeholder
    }
  });
  const error = createElement("p", { className: "form-error" });
  wrap.append(label, input, error);
  return { wrap, input, error };
}

function buildSelectField(config) {
  const wrap = createElement("div", { className: "form-control" });
  const label = createElement("label", { text: config.label });
  label.setAttribute("for", config.id);

  const input = createElement("select", {
    attrs: {
      id: config.id,
      name: config.name
    }
  });

  input.appendChild(createElement("option", { text: "Selecciona autor", attrs: { value: "" } }));
  config.options.forEach((option) => {
    input.appendChild(
      createElement("option", {
        text: option.label,
        attrs: { value: option.id }
      })
    );
  });

  const error = createElement("p", { className: "form-error" });
  wrap.append(label, input, error);
  return { wrap, input, error };
}
