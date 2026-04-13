import { setUiError, setUiSuccess } from "../app/state.js";

export function notifySuccess(message) {
  setUiSuccess(message);
}

export function notifyError(message) {
  setUiError(message);
}
