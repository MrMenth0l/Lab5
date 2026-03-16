export function getFormData(form) {
  const formData = new FormData(form);

  return {
    title: formData.get('title').trim(),
    body: formData.get('body').trim(),
    userId: Number(formData.get('userId'))
  };
}

export function resetForm(form) {
  form.reset();
}