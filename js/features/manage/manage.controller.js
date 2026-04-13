import { removePostById } from "../../app/state.js";
import { notifyError, notifySuccess } from "../../services/notifications.service.js";
import { showToast } from "../../ui/renderStates.js";

export function handleDeletePost(postId, options = {}) {
  const confirmed = window.confirm(
    "¿Deseas eliminar esta publicación? La eliminación será simulada en la interfaz."
  );

  if (!confirmed) {
    return false;
  }

  try {
    removePostById(postId);
    notifySuccess("Publicación eliminada correctamente (simulada en frontend).");
    showToast("success", "Publicación eliminada.");
    options.onDone?.();
    return true;
  } catch (error) {
    notifyError(error.message || "No se pudo eliminar la publicación.");
    showToast("error", "Falló la eliminación.");
    return false;
  }
}
